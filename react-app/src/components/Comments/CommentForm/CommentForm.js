import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { createComment } from "../../../store/comment";
import './CommentForm.css';

const CommentForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts[id]);

    const [ errors, setErrors ] = useState([]);
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
            history.push(`/posts/${post.id}`);
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

export default CommentForm;
