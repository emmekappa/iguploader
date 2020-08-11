import * as React from "react";
import {FunctionComponent, useState} from "react";
import {Typography, Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {DropzoneDialog} from "material-ui-dropzone";
import {ipcRenderer} from "electron";

async function albumUpload(query: string, filesPath: string[]): Promise<void> {
    const result = await ipcRenderer.invoke('upload-album', {query: query, filesPath: filesPath});
    console.log(result)
    return result
}

export const AlbumUploader: FunctionComponent = () => {
    const [files, setFiles] = useState<File[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onClick = (): void => setIsOpen(true);
    const onClose = (): void => setIsOpen(false);
    const onSave = async (files: File[]): Promise<void> => {
        setFiles(files)
        console.log(files)
        await albumUpload("sample caption", files.map(x => x.path))
        setIsOpen(false)
    }
    return <Container>
        <Typography variant="h2">
            Upload your album
        </Typography>

        <div>
            <Button onClick={onClick}>
                Add Image
            </Button>
            <DropzoneDialog
                open={isOpen}
                onSave={onSave}
                acceptedFiles={['image/jpeg', 'image/png']}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={onClose}
            />
        </div>
    </Container>
}
