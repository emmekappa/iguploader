import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from "react";
import {DropzoneAreaBase, DropzoneAreaProps, FileObject} from "material-ui-dropzone";
import {PhotoValidator} from "./photo/photoValidator";
import {useSnackbar} from "notistack";


const splitDropzoneAreaProps = (props: DropzoneAreaProps) => {
    const {clearOnUnmount, initialFiles, onChange, onDelete, ...dropzoneAreaProps} = props;
    return [{clearOnUnmount, initialFiles, onChange, onDelete}, dropzoneAreaProps];
};

export const IgDropzone: FunctionComponent<DropzoneAreaProps> = (props: PropsWithChildren<DropzoneAreaProps>) => {
    const [, dropzoneAreaProps] = splitDropzoneAreaProps(props);
    const [fileObjects, setFiles] = useState<FileObject[]>(new Array<FileObject>())
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const notifyFileChange = (): void => {
        if (props.onChange) {
            props.onChange(fileObjects.map((fileObject) => fileObject.file));
        }
    }

    useEffect(() => {
        return () => {
            if (props.clearOnUnmount) {
                setFiles([])
                notifyFileChange()
            }
        }
    }, [])

    const onAdd = async (addedFileObjects: FileObject[]): Promise<void> => {
        const photoValidator = new PhotoValidator();

        const validFileObjects = new Array<FileObject>()

        for (const fileObject of addedFileObjects) {
            const validationResult = await photoValidator.isValid(fileObject.file.path)
            if (!validationResult.isValid) {
                enqueueSnackbar(`${fileObject.file.name} invalid: ${validationResult.reason}`, {
                    variant: "error",
                    persist: true
                })
                console.log(`${fileObject.file.name} invalid: ${validationResult.reason}`)
            } else
                validFileObjects.push(fileObject)
        }
        if (validFileObjects.length > 0) {
            setFiles(fileObjects.concat(validFileObjects))
            notifyFileChange()
            enqueueSnackbar(`Added files: ${validFileObjects.map(x => x.file.name).join(", ")}`, {variant: "success"})
            console.log('Added Files:', validFileObjects)
        }
    }
    const onDelete = (fileObject: FileObject, index: number): void => {
        const remainingFileObjs = fileObjects.filter((fileObject, i) => {
            return i !== index;
        })
        setFiles(remainingFileObjs)
        notifyFileChange()
        enqueueSnackbar(`Deleted file: ${fileObject.file.name}`, {variant: "success"})
        console.log('Removed File:', fileObject)
    }


    return (
        <DropzoneAreaBase
            {...dropzoneAreaProps}
            onAdd={onAdd}
            onDelete={onDelete}
            onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
            fileObjects={fileObjects}
            showAlerts={false}
        />
    )
}
