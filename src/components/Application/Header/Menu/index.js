import React, { Component } from "react";
import Link from "react-router-dom/Link";

export default class Menu extends Component {
    render() {
        return (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/posts">Posts</Link>
                </li>
            </ul>
        );
    }
}
