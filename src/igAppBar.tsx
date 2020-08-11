import {useStyles} from "./main";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Menu} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import React, {FunctionComponent} from "react";

export interface AppBarNewParams {
    open: boolean;
    onClick: () => void;
    title: string;
}

export const IgAppBar: FunctionComponent<AppBarNewParams> = (props: AppBarNewParams) => {
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
};
