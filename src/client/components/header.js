import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
    render() {
        const { auth } = this.props;

        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" href="/" className="brand-logo">React SSR</Link>
                    <ul className="right">
                        <li>
                            <Link to="/users" href="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/admins" href="/admins">Admins</Link>
                        </li>
                        <li>
                            {auth ?
                                <a href="/api/logout">Logout</a> :
                                <a href="/api/auth/google">Login</a>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
