import React, {FunctionComponent, useContext} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {MemoryRouter, Route, Switch} from "react-router-dom";
import {SearchByLocation} from "./searchByLocation";
import {AlbumUploader} from "./albumUploader";
import {Login} from "./login";
import {albumUploaderPath, loginPath, rootPath, searchByLocationPath} from "./routes";
import {IgDrawer} from "./igDrawer";
import {IgAppBar} from "./igAppBar";
import {CredentialsStore} from "./instagram";
import {InstagramIpcInvoker} from "./instagramIpcInvoker";

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

export const CredentialsStoreContext = React.createContext<CredentialsStore>(new CredentialsStore())
export const InstagramIpcInvokerContext = React.createContext<InstagramIpcInvoker>(new InstagramIpcInvoker())

const Main: FunctionComponent = () => {
    const credentialsStore = useContext<CredentialsStore>(CredentialsStoreContext)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = (): void => {
        setOpen(true);
    };

    const handleDrawerClose = (): void => {
        setOpen(false);
    };

    const initialPage = (): string => {
        if (credentialsStore.get() == undefined || credentialsStore.get()?.username == "" || credentialsStore.get()?.password == "")
            return loginPath
        else
            return albumUploaderPath
    }

    return (
        <div className={classes.root}>
            <MemoryRouter initialEntries={[initialPage()]} initialIndex={0}>
                <IgAppBar open={open} onClick={handleDrawerOpen} title="Instagram uploader"/>
                <IgDrawer open={open} onClick={handleDrawerClose}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <Route path={rootPath} exact component={SearchByLocation}/>
                        <Route path={albumUploaderPath} component={AlbumUploader}/>
                        <Route path={searchByLocationPath} component={SearchByLocation}/>
                        <Route path={loginPath} component={Login}/>
                    </Switch>
                </main>
            </MemoryRouter>
        </div>
    );
};

export default Main
