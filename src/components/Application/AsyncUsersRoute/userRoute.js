import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withJob } from "react-jobs";
import Helmet from "react-helmet";
import * as userAction from "../../../actions/userAction";

class UserRoute extends Component {
    render() {
        const { users } = this.props;

        return (
            <div>
                <Helmet title="Users" />
                <ul>{users.map(e => <li key={e.id}>{e.name}</li>)}</ul>
            </div>
        );
    }
}

const mapStateToProps = ({ userRoute } /* , { match } comes from router */) => ({
    users: userRoute.users
});

const ComposeUserRoute = compose(
    connect(mapStateToProps, { fetchUsers: userAction.fetchUsers }),
    withJob({
        work({ users, fetchUsers }) {
            if (users.length) {
                return true;
            }
            return fetchUsers();
        }
        // if a dependent props changed, call it again
        // shouldWorkAgain: (prevProps, nextProps) => prevProps.users.params.id !== nextProps.match.params.id
    })
)(UserRoute);

export default ComposeUserRoute;
