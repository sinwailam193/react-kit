import React, { Component } from "react";
import Routes from "../routes";
import Logo from "./Logo";
import Menu from "./Menu";

class Header extends Component {
    render() {
        const { pathname } = this.props.location;
        const undefPath = Routes.some(e => e.path === pathname);
        if (!undefPath) {
            return null;
        }

        return (
            <div>
                <Logo />
                <h1>React, Universally</h1>
                <strong>A starter kit for universal react applications.</strong>
                <Menu />
            </div>
        );
    }
}

export default Header;
