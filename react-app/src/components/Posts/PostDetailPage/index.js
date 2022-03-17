import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { getPost, deletePost } from "../../../store/post";
import EditPostModal from "../EditPostForm";
import './PostDetailPage.css';

const PostDetailPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const postId = +id;

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts[id]);

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    const handleDelete = async (e) => {
        e.preventDefault();

        if (window.confirm("Are you sure you'd like to delete your post?")) {
            await dispatch(deletePost(id));
            history.push('/posts');
        } else {
            history.push(`/posts/${id}`);
        }
    };

    let postMenu = null;
    if (user && post?.user_id === user.id) {
        postMenu = (
            <div>
                <EditPostModal />
                <button onClick={handleDelete}>Delete Post</button>
            </div>
        );
    }

    if (!post) return null;

    return (
        <main>
            <div>
                <h1>{post?.title}</h1>
                <p>{post?.body}</p>
            </div>
            {postMenu}
            <div>Comments</div>
        </main>
    );
};

export default PostDetailPage;
