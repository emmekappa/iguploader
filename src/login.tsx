import * as React from "react";
import {FunctionComponent, useContext, useState} from "react";
import {Box, Button, Container, createStyles, LinearProgress, TextField, Theme, Typography} from "@material-ui/core";
import {CredentialsStoreContext, InstagramIpcInvokerContext} from "./main";
import {Alert} from '@material-ui/lab';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {albumUploaderPath} from "./routes";

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
    const [loginError, setLoginError] = useState<boolean>(false)
    const [loginSuccessful, setLoginSuccessful] = useState<boolean>(false)

    const saveLogin = async (): Promise<void> => {
        setLoginError(false)
        setLoginSuccessful(false)
        setLoading(true)
        console.log("saving login informations...")
        credentialsStore.set({username: username, password: password})
        const loginOk = await instagramIpcInvoker.login()
        setLoginError(!loginOk)
        setLoginSuccessful(loginOk)
        setLoading(false)
    }

    const clearCredentials = (): void => {
        setLoginSuccessful(false)
        setLoginError(false)
        console.log("Clearing credentials...")
        setUsername("")
        setPassword("")
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
                <Box hidden={!loginError}>
                    <Alert severity="error">
                        Unable to login, please check your password!
                    </Alert>
                </Box>
                <Box hidden={!loginSuccessful}>
                    <Alert severity="success">
                        Login was successful, you can now <Link to={albumUploaderPath}>upload your album</Link>
                    </Alert>
                </Box>
                <div className={classes.root}>
                    <Button variant="contained" color="primary" onClick={saveLogin} disabled={loading}>Login</Button>
                    <Button variant="contained" color="default" onClick={clearCredentials} disabled={loading}>Clear
                        credentials</Button>
                </div>
            </form>
        </Container>
    )
}
