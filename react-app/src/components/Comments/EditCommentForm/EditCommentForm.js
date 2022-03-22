import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { editComment } from '../../../store/comment';
import './EditCommentForm.css';

const EditCommentForm = ({ onClose, commentId }) => {
    const dispatch = useDispatch();

    const comment = useSelector(state => state.comments[commentId]);

    const [ body, setBody ] = useState(comment?.body);

    const updateBody = (e) => setBody(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...comment,
            body
        };

        const editedComment = await dispatch(editComment(payload));

        if (editedComment) {
            onClose(false);
        }
    };

    return (
        <form className='edit-comment-form' onSubmit={handleSubmit}>
            <textarea
                className='edit-comment-body'
                name='body'
                value={body}
                onChange={updateBody}
                placeholder='Write your comment'
                rows={10}
                required
            />
            <div className='edit-comment-buttons'>
                <button type='submit' className='edit-comment-submit' disabled={!body}>
                    Comment
                </button>
                <button type='button' className='edit-comment-cancel' onClick={onClose}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditCommentForm;
