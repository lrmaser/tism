import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';

import { editComment } from '../../../store/comment';
import './EditCommentForm.css';

const EditCommentForm = ({ onClose, commentId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const comment = useSelector(state => state.comments[commentId]);

    const [ errors, setErrors ] = useState([]);
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
            history.push(`/posts/${id}`);
            onClose(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, ind) => <li key={ind}>{error}</li>)}
            </ul>
            <input
                type='textarea'
                name='body'
                value={body}
                onChange={updateBody}
                placeholder='Write your comment'
                required
            />
            <button type='submit' disabled={errors.length > 0 || !body}>
                Comment
            </button>
            <button type='button' onClick={onClose}>
                Cancel
            </button>
        </form>
    );
};

export default EditCommentForm;
