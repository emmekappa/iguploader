import * as React from "react";
import { useContext, useState } from "react";
import {
  Button,
  Container,
  createStyles,
  LinearProgress,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { Disable } from "react-disable";
import { useHistory } from "react-router-dom";
import { albumUploaderPath } from "./routes";
import { CredentialsStoreContext } from "./CredentialsStoreContext";
import InstagramIpcInvokerContext from "./InstagramIpcInvokerContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    moreSpace: {
      margin: theme.spacing(2, 0, 4),
    },
  })
);

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const credentialsStore = useContext(CredentialsStoreContext);
  const instagramIpcInvoker = useContext(InstagramIpcInvokerContext);
  const [username, setUsername] = useState<string>(
    credentialsStore.get()?.username ?? ""
  );
  const [password, setPassword] = useState<string>(
    credentialsStore.get()?.password ?? ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const saveLogin = async (): Promise<void> => {
    setLoading(true);
    console.log("saving login informations...");
    credentialsStore.set({ username, password });
    try {
      const loginOk = await instagramIpcInvoker.login();
      if (loginOk) {
        enqueueSnackbar("Login was successful, you can now upload your album", {
          variant: "success",
        });
        history.push(albumUploaderPath);
      } else {
        enqueueSnackbar("Unable to login, please check your password!", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const clearCredentials = (): void => {
    console.log("Clearing credentials...");
    setUsername("");
    setPassword("");
    enqueueSnackbar("Credentials cleared!", { variant: "success" });
    credentialsStore.clear();
  };

  return (
    <Container>
      <Typography variant="h2">Instagram account</Typography>
      <Typography variant="h6" className={classes.moreSpace}>
        Please enter your instagram account credentials
      </Typography>
      <Disable disabled={loading}>
        <form noValidate autoComplete="off" onSubmit={saveLogin}>
          <TextField
            id="standard-basic"
            label="Username"
            onChange={(event) => setUsername(event.target.value)}
            fullWidth
            value={username}
          />
          <TextField
            id="standard-basic"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          <LinearProgress hidden={!loading} id="progressBar" />
          <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={saveLogin}>
              Login
            </Button>
            <Button
              variant="contained"
              color="default"
              onClick={clearCredentials}
            >
              Clear credentials
            </Button>
          </div>
        </form>
      </Disable>
    </Container>
  );
};

export default Login;
