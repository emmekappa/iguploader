import React, {FunctionComponent, useEffect, useState} from "react";
import {DropzoneAreaBase, DropzoneAreaBaseProps, FileObject} from "material-ui-dropzone";

interface IgDropzoneProps extends DropzoneAreaBaseProps {
    something?: string;
}

export const IgDropzone: FunctionComponent<IgDropzoneProps> = () => {
    const [files, setFiles] = useState<FileObject[]>()


    const notifyFileChange = () => {
        const {onChange} = this.props;
        const {fileObjects} = this.state;

        if (onChange) {
            onChange(fileObjects.map((fileObject) => fileObject.file));
        }
    }

    useEffect(() => {
        return () => {
            if (this.props.clearOnUnmount) {
                setFiles([])
                this.setState({
                    fileObjects: [],
                }, notifyFileChange);
            }
        }
    })


    const onAdd = (fileObjs) => {
        console.log('Added Files:', fileObjs);
    }
    const onDelete = (fileObj) => {
        console.log('Removed File:', fileObj);
    }


    return (
        <DropzoneAreaBase
            onAdd={onAdd}
            onDelete={onDelete}
            onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
            fileObjects={files}

        />
    )
}
