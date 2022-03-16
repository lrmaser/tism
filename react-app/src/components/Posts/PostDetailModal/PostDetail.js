import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPost } from "../../../store/post";
import EditPostForm from "../EditPostForm";
import './PostDetailModal.css';

const PostDetail = ({ onClose, post }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [ showEditForm, setShowEditForm ] = useState(false);

    useEffect(() => {
        dispatch(getPost(post.id));
    }, [dispatch, post.id]);

    let postMenu;
    if (post.user_id === user.id) {
        postMenu = (
            <button type='button' onClick={() => setShowEditForm(true)}>Edit Post</button>
        );
    }

    return (
        <main>
            <div>
                {showEditForm ?
                    <EditPostForm post={post} />
                    :
                    <>
                        <h1>{post?.title}</h1>
                        <p>{post?.body}</p>
                        {postMenu}
                    </>
                }
            </div>
            <div>Comments</div>
        </main>
    );
};

export default PostDetail;
