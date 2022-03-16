import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPost } from "../../../store/post";
import './PostDetailModal.css';

const PostDetail = ({ onClose, postId }) => {
    const dispatch = useDispatch();

    const post = useSelector(state => state.posts[postId]);

    useEffect(() => {
        dispatch(getPost(postId));
    }, [dispatch, postId]);

    return (
        <main>
            <div>
                <h1>{post?.title}</h1>
                <p>{post?.body}</p>
            </div>
        </main>
    );
};

export default PostDetail;
