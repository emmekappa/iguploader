import * as React from "react";
import {FunctionComponent, useContext, useState} from "react";
import {Button, Container, createStyles, LinearProgress, TextField, Theme, Typography} from "@material-ui/core";
import {CredentialsStoreContext, InstagramIpcInvokerContext} from "./main";
import {makeStyles} from "@material-ui/core/styles";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        moreSpace: {
            margin: theme.spacing(2, 0, 4)
        },
    }),
);


export const Login: FunctionComponent = (props) => {
    const classes = useStyles();
    const credentialsStore = useContext(CredentialsStoreContext)
    const instagramIpcInvoker = useContext(InstagramIpcInvokerContext)
    const [username, setUsername] = useState<string>(credentialsStore.get()?.username ?? "")
    const [password, setPassword] = useState<string>(credentialsStore.get()?.password ?? "")
    const [loading, setLoading] = useState<boolean>(false)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const saveLogin = async (): Promise<void> => {
        setLoading(true)
        console.log("saving login informations...")
        credentialsStore.set({username: username, password: password})
        try {
            const loginOk = await instagramIpcInvoker.login()
            if (loginOk)
                enqueueSnackbar("Login was successful, you can now upload your album", {variant: "success"})
            else {
                enqueueSnackbar("Unable to login, please check your password!", {variant: "error"})
            }
        } catch (error) {
            enqueueSnackbar(error.message, {variant: "error"})
        } finally {
            setLoading(false)
        }
    }

    const clearCredentials = (): void => {
        console.log("Clearing credentials...")
        setUsername("")
        setPassword("")
        enqueueSnackbar("Credentials cleared!", {variant: "success"})
        credentialsStore.clear()
    }

    return (
        <Container>
            <Typography variant="h2">
                Instagram account
            </Typography>
            <Typography variant="h6" className={classes.moreSpace}>
                Please enter your instagram account credentials
            </Typography>
            <form noValidate autoComplete="off" onSubmit={saveLogin} aria-describedby="progressBar" aria-busy={loading}
                  aria-disabled={loading}>
                <TextField id="standard-basic" label="username" onChange={event => setUsername(event.target.value)}
                           fullWidth value={username}/>
                <TextField id="standard-basic" label="password" type="password" value={password}
                           onChange={event => setPassword(event.target.value)} fullWidth/>
                <LinearProgress hidden={!loading} id="progressBar"/>
                <div className={classes.root}>
                    <Button variant="contained" color="primary" onClick={saveLogin} disabled={loading}>Login</Button>
                    <Button variant="contained" color="default" onClick={clearCredentials} disabled={loading}>Clear
                        credentials</Button>
                </div>
            </form>
        </Container>
    )
}
