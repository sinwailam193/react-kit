import React, { Component } from "react";

class NotFoundPage extends Component {
    render() {
        const staticContext = this.props.staticContext || {}; // eslint-disable-line
        return <h1>Ooops, route not found.</h1>;
    }
}

export default {
    component: NotFoundPage
};
