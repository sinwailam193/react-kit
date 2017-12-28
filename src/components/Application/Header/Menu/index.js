import React, { Component } from "react";
import Link from "react-router-dom/Link";

export default class Menu extends Component {
    render() {
        return (
            <ul>
                <li>
                    <Link to="/" href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/users" href="/users">
                        Users
                    </Link>
                </li>
            </ul>
        );
    }
}
