import {useStyles} from "./Main";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Menu} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import React from "react";

export function AppBarNew(props: { open: boolean, onClick: () => void, title: string }) {
    const classes = useStyles();

    return <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
            [classes.appBarShift]: props.open,
        })}
    >
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.onClick}
                edge="start"
                className={clsx(classes.menuButton, {
                    [classes.hide]: props.open,
                })}
            >
                <Menu/>
            </IconButton>
            <Typography variant="h6" noWrap>
                {props.title}
            </Typography>
        </Toolbar>
    </AppBar>;
}
