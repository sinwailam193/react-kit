import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "material-ui/Icon";
import AppBar from "material-ui/AppBar";
import Typography from "material-ui/Typography";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import Routes from "../routes";

export default class Header extends Component {
    state = {
        anchorEl: null
    };

    handleMenu = e => {
        this.setState({ anchorEl: e.currentTarget });
    };

    handleClose = name => () => {
        const { history } = this.props;
        if (name) {
            history.push(`/${name}`);
        }
        this.setState({ anchorEl: null });
    };

    render() {
        const {
            state: { anchorEl }, props: { location: { pathname } }, handleMenu, handleClose
        } = this;
        const open = Boolean(anchorEl);
        const undefPath = Routes.some(e => e.path === pathname);
        if (!undefPath) {
            return null;
        }

        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography type="title" color="inherit" id="logo-container">
                        <Link to="/" href="/" className="link">
                            onNez
                        </Link>
                    </Typography>
                    <IconButton aria-owns={anchorEl ? "menu-appbar" : null} aria-haspopup="true" onClick={handleMenu} color="contrast">
                        <Icon>account_circle</Icon>
                    </IconButton>

                    {/* Handle submenu */}
                    <Menu
                        id="menu-appbar"
                        getContentAnchorEl={null}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                        open={open}
                        onClose={handleClose()}
                    >
                        <MenuItem onClick={handleClose("profile")}>Profile</MenuItem>
                        <MenuItem onClick={handleClose("account")}>My Account</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        );
    }
}
