import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";

class UsersList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers = () => this.props.users.map(user => <li key={user.id}>{user.name}</li>)

    head() {
        return (
            <Helmet>
                <title>{`${this.props.users.length} Users Loaded`}</title>
                <meta property="og:title" content="Users App" />
            </Helmet>
        );
    }

    render() {
        return (
            <div>
                {this.head()}
                {"Here's a big list of users:"}
                <ul>{this.renderUsers()}</ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { users: state.users };
}

// loadData is for grabing the data initially in server side
function loadData({ dispatch }) {
    return dispatch(fetchUsers());
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
