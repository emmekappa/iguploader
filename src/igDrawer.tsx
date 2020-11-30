import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import {
  AccountBox,
  ChevronLeft,
  ChevronRight,
  PhotoLibrary,
} from "@material-ui/icons";
import theme from "./theme";
import { albumUploaderPath, loginPath, searchByLocationPath } from "./routes";
import { ListItemLink } from "./listItemLink";
import useStyles from "./styles";

type Props = {
  open: boolean;
  onClick: () => void;
};

export const IgDrawer = ({ onClick, open }: Props) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onClick}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItemLink
          to={albumUploaderPath}
          primary="Upload photo"
          icon={<PhotoLibrary />}
        />
        {/* <ListItemLink to={searchByLocationPath} primary="Search by location" icon={<Search/>}/> */}
        <Divider />
        <ListItemLink to={loginPath} primary="Login" icon={<AccountBox />} />
      </List>
    </Drawer>
  );
};

export default IgDrawer;
