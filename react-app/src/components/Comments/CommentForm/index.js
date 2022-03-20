import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { createComment } from "../../../store/comment";
import './CommentForm.css';

const CommentForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts[id]);

    const [ body, setBody ] = useState('');

    const updateBody = (e) => setBody(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            user_id: user.id,
            post_id: post.id,
            body
        };

        const newComment = await dispatch(createComment(payload));

        if (newComment.ok) {
            setBody('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='textarea'
                name='body'
                value={body}
                onChange={updateBody}
                placeholder='Write your comment'
                required
            />
            <button type='submit' disabled={!body}>
                Comment
            </button>
        </form>
    );
};

export default CommentForm;
