import React, { FunctionComponent, useContext } from "react";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { ProviderContext, SnackbarKey, SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";
import { SearchByLocation } from "./searchByLocation";
import { PhotoUploader } from "./photoUploader";
import Login from "./login";
import {
  albumUploaderPath,
  loginPath,
  rootPath,
  searchByLocationPath,
} from "./routes";
import { IgDrawer } from "./igDrawer";
import { IgAppBar } from "./igAppBar";
import { CredentialsStore } from "./instagram";
import useStyles from "./styles";
import { CredentialsStoreContext } from "./CredentialsStoreContext";

const Main: FunctionComponent = () => {
  const credentialsStore = useContext<CredentialsStore>(
    CredentialsStoreContext
  );
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const initialPage = (): string => {
    if (
      credentialsStore.get() === undefined ||
      credentialsStore.get()?.username === "" ||
      credentialsStore.get()?.password === ""
    )
      return loginPath;
    return albumUploaderPath;
  };

  const notistackRef = React.createRef<ProviderContext>();
  const onClickDismiss = (key: SnackbarKey) => (): void => {
    if (notistackRef.current != null) notistackRef.current.closeSnackbar(key);
  };

  return (
    <div className={classes.root}>
      <SnackbarProvider
        maxSnack={2}
        autoHideDuration={3500}
        ref={notistackRef}
        action={(key) => <Button onClick={onClickDismiss(key)}>Dismiss</Button>}
      >
        <MemoryRouter initialEntries={[initialPage()]} initialIndex={0}>
          <IgAppBar
            open={open}
            onClick={handleDrawerOpen}
            title="Instagram uploader"
          />
          <IgDrawer open={open} onClick={handleDrawerClose} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path={rootPath} exact component={SearchByLocation} />
              <Route path={albumUploaderPath} component={PhotoUploader} />
              <Route path={searchByLocationPath} component={SearchByLocation} />
              <Route path={loginPath} component={Login} />
            </Switch>
          </main>
        </MemoryRouter>
      </SnackbarProvider>
    </div>
  );
};

export default Main;
