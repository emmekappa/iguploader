import React, {FunctionComponent, PropsWithChildren} from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {AccountBox, ChevronLeft, ChevronRight, Drafts} from "@material-ui/icons";
import theme from "./theme";
import {albumUploaderPath, loginPath, searchByLocationPath} from "./routes";
import {ListItemLink} from "./listItemLink";
import {useStyles} from "./main";

interface DrawerNewProps {
    open: boolean;
    onClick: () => void;
}

export const IgDrawer: FunctionComponent<DrawerNewProps> = (props: DrawerNewProps) => {
    const classes = useStyles();
    return <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
        })}
        classes={{
            paper: clsx({
                [classes.drawerOpen]: props.open,
                [classes.drawerClose]: !props.open,
            }),
        }}
    >
        <div className={classes.toolbar}>
            <IconButton onClick={props.onClick}>
                {theme.direction === "rtl" ? <ChevronRight/> : <ChevronLeft/>}
            </IconButton>
        </div>
        <Divider/>
        <List>
            <ListItemLink to={albumUploaderPath} primary="Album uploader" icon={<Drafts/>}/>
            <ListItemLink to={searchByLocationPath} primary="Search by location" icon={<Drafts/>}/>
            <Divider/>
            <ListItemLink to={loginPath} primary="Login" icon={<AccountBox/>}/>
        </List>
    </Drawer>;
};
