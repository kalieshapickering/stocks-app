import React from "react";

const CommentPost = (props) => {
    return (
        <div>
            <h3> {props.name}</h3>
            <p>{props.message}</p>

        </div>
    )
}

export default CommentPost;