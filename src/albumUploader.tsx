import * as React from "react";
import {FunctionComponent, useContext, useState} from "react";
import {Container, createStyles, FormControl, LinearProgress, TextField, Theme, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {InstagramIpcInvokerContext} from "./main";
import {makeStyles} from "@material-ui/core/styles";
import {Disable} from 'react-disable';
import {IgDropzone} from "./igDropZone";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        moreSpace: {
            margin: theme.spacing(2, 0, 2)
        },
    })
);

export const AlbumUploader: FunctionComponent = () => {
    const instagramIpcInvoker = useContext(InstagramIpcInvokerContext)
    const [caption, setCaption] = useState<string>("")
    const [files, setFiles] = useState<File[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [key, setKey] = useState(0);
    const classes = useStyles();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const uploadFiles = async (files: File[]): Promise<void> => {
        setLoading(true)
        console.log("Start uploading")
        console.log(files)
        try {
            await instagramIpcInvoker.albumUpload(caption, files.map(x => x.path))
            setKey(key + 1)
            setCaption("")
            enqueueSnackbar("Upload was successful", {variant: "success"})
        } catch (error) {
            enqueueSnackbar(error.message, {variant: "error"})
        }
        finally {
            setLoading(false)
        }
    }

    const onChange = async (files: File[]) => {
        console.log(files)
        setFiles(files);
    }
    return <Container>
        <Typography variant="h2" className={classes.moreSpace}>
            Upload your album
        </Typography>

        <div>
            <form noValidate autoComplete="off">
                <Disable disabled={loading}>
                    <TextField id="standard-basic" label="Caption" onChange={event => setCaption(event.target.value)}
                               fullWidth value={caption} multiline={true} rows={4}/>
                    <FormControl className={classes.moreSpace} fullWidth disabled={loading}>
                        <IgDropzone
                            key={key}
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            showPreviewsInDropzone={true}
                            showPreviews={false}
                            onChange={onChange}
                            showAlerts={true}
                            filesLimit={10}
                            maxFileSize={4000000}
                            clearOnUnmount={true}
                            onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                        />
                    </FormControl>
                </Disable>
                <LinearProgress hidden={!loading}/>
                <Button variant="contained" color="primary" onClick={() => uploadFiles(files)}
                        disabled={loading} fullWidth>Upload</Button>
            </form>
        </div>
    </Container>
}
