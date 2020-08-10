import * as React from "react";
import {FunctionComponent, useState} from "react";
import {Typography, Container} from "@material-ui/core";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {DropzoneDialog} from "material-ui-dropzone";
import {IgLocation} from "./IgLocation";
import {ipcRenderer} from "electron";

async function albumUpload(query: string, filesPath: string[]) : Promise<IgLocation[]> {
    const result = await ipcRenderer.invoke('upload-album', {query: query, filesPath: filesPath});
    console.log(result)
    return result
}

export const AlbumUploader: FunctionComponent = (props) => {
    const [files, setFiles] = useState<File[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    let onClick = () => setIsOpen(true);
    let onClose = () => setIsOpen(false);
    let onSave = async (files: File[]) => {
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
