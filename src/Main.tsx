import React, {Fragment} from 'react';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import {Link, MemoryRouter, Route, Switch} from "react-router-dom";
import {SearchByLocation} from "./SearchByLocation";
import {AlbumUploader} from "./AlbumUploader";
import {SecondPage} from "./SecondPage";
import {albumUploaderPath, rootPath, searchByLocationPath} from "./routes";
import {DrawerNew} from "./DrawerNew";
import {AppBarNew} from "./AppBarNew";

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


export default function Main() {
    let classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <MemoryRouter initialEntries={[rootPath]} initialIndex={0}>
                <AppBarNew open={open} onClick={handleDrawerOpen} title="Instagram uploader"/>
                <DrawerNew open={open} onClick={handleDrawerClose} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path={rootPath} exact component={SearchByLocation}/>
                        <Route path={albumUploaderPath} component={AlbumUploader}/>
                        <Route path={"/secondPage"} component={SecondPage}/>
                        <Route path={searchByLocationPath} component={SearchByLocation}/>
                    </Switch>
                </main>

            </MemoryRouter>
        </div>
    );
}
