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
        <form className='comment-form' onSubmit={handleSubmit}>
            <div className='comment-form-input'>
                <textarea
                    name='body'
                    value={body}
                    onChange={updateBody}
                    onKeyPress={(e) => {
                        if (e.charCode === 13) handleSubmit(e);
                    }}
                    placeholder='Write your comment'
                    rows={1}
                    required
                />
            </div>
            <div className='comment-form-button'>
                <button type='submit' disabled={!body}>
                    Comment
                </button>
            </div>
        </form>
    );
};

export default CommentForm;
