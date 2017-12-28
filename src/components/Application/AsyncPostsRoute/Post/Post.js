import React, { Component } from "react";
import PropTypes, { string } from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withJob } from "react-jobs";
import Helmet from "react-helmet";
import * as PostActions from "../../../../actions/posts";
import * as FromState from "../../../../reducers";

export class Post extends Component {
    render() {
        const { post } = this.props;
        if (!post) {
            return null;
        }

        const { title, body } = post;

        return (
            <div>
                <Helmet title={`Posts - ${title}`} />

                <h1>
                    {title}
                </h1>
                <div>
                    {body}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, { match }) {
    return {
        post: FromState.getPostById(state, match.params.id),
    };
}

const mapActionsToProps = {
    fetchPost: PostActions.fetch,
};

export default compose(
    connect(mapStateToProps, mapActionsToProps),
    withJob({
        work: ({ match, post, fetchPost }) => {
            if (post) {
                // We already have a post, just return true.
                return true;
            }

            // Execute the redux-thunk powered action that returns a Promise and
            // fetches the post.
            return fetchPost(match.params.id);
        },
        // Any time the post id changes we need to trigger the work.
        shouldWorkAgain: (prevProps, nextProps) => prevProps.match.params.id !== nextProps.match.params.id,
    }),
)(Post);

Post.propTypes = {
    post: PropTypes.shape({
        title: string,
        body: string,
    }),
};

Post.defaultProps = {
    post: {},
};
