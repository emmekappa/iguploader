import * as React from "react";
import {FunctionComponent, useContext, useState} from "react";
import {
    Box,
    Container,
    createStyles,
    FormControl,
    LinearProgress,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {DropzoneArea, DropzoneAreaBase, DropzoneDialog, FileObject} from "material-ui-dropzone";
import {InstagramIpcInvokerContext} from "./main";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        moreSpace: {
            margin: theme.spacing(2,0,2)
        },
    })
);

export const AlbumUploader: FunctionComponent = () => {
    const instagramIpcInvoker = useContext(InstagramIpcInvokerContext)
    const [caption, setCaption] = useState<string>("")
    const [files, setFiles] = useState<File[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const classes = useStyles();

    const onSave = async (files: File[]): Promise<void> => {
        setLoading(true)
        console.log(files)
        await instagramIpcInvoker.albumUpload(caption, files.map(x => x.path))
        setLoading(false)
    }

    return <Container>
        <Typography variant="h2" className={classes.moreSpace}>
            Upload your album
        </Typography>

        <div>
            <form noValidate autoComplete="off">
                <TextField id="standard-basic" label="Caption" onChange={event => setCaption(event.target.value)}
                           fullWidth value={caption} multiline={true} rows={4}/>
                <FormControl className={classes.moreSpace} fullWidth disabled={loading}>
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop an image here or click"}
                        showPreviewsInDropzone={true}
                        showPreviews={false}
                        onChange={(files) => setFiles(files)}
                        showAlerts={true}
                        filesLimit={10}
                        maxFileSize={4000000}
                        onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                    />
                </FormControl>
                <LinearProgress hidden={!loading} />
                <Button variant="contained" color="primary" onClick={() => onSave(files)}
                        disabled={loading} fullWidth>Upload</Button>
            </form>
        </div>
    </Container>
}
