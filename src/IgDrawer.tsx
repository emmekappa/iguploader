import {ClassNameMap} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import {ChevronLeft, ChevronRight, Drafts, Inbox} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import React from "react";
import {Link, LinkProps} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {albumUploaderPath, searchByLocationPath} from "./routes";
import clsx from "clsx";
import {useStyles} from "./Main";

export interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

export function ListItemLink(props: ListItemLinkProps) {
    const {icon, primary, to} = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
                <Link to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary}/>
            </ListItem>
        </li>
    );
}


