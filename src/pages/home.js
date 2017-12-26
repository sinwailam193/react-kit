import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Icon from "material-ui/Icon";
import { helloWorld } from "../graphql";
import { appQuery } from "../actions/authAction";

class Home extends Component {
    onClick = () => {
        this.props.appQuery(helloWorld);
    };

    head = () => (
        <Helmet>
            <title>Home Page</title>
            <meta property="og:title" content="Users App" />
        </Helmet>
    );

    render() {
        const { head } = this;

        return (
            <div className="home">
                {head()}
                <h3>Welcome on Heroku!!</h3>
                <a href="api/auth/facebook">click</a>
                <Icon color="accent">settings_bluetooth</Icon>
            </div>
        );
    }
}

const maptStateToProps = ({ auth }) => ({ auth });

export default {
    component: connect(maptStateToProps, { appQuery })(Home)
};
