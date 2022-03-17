import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';

import { editPost } from '../../../store/post';
import './EditPostForm.css';

const EditPostForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const post = useSelector(state => state.posts[id]);

    const [ errors, setErrors ] = useState([]);
    const [ title, setTitle ] = useState(post?.title);
    const [ body, setBody ] = useState(post?.body);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateBody = (e) => setBody(e.target.value);

    useEffect(() => {
        const validationErrors = [];

        if (title?.length > 80) {
            validationErrors.push('Title must not be more than 80 characters long');
        }

        setErrors(validationErrors);
    }, [title]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...post,
            title,
            body
        };

        const editedPost = await dispatch(editPost(payload));
        if (editedPost) {
            history.push(`/posts/${post.id}`);
            onClose(false);
        };
    };

    // const handleCancel = (e) => {
    //     e.preventDefault();
    //     history.push(`/posts/${post.id}`);
    // };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, ind) => <li key={ind}>{error}</li>)}
            </ul>
            <input
                type='text'
                name='title'
                value={title}
                onChange={updateTitle}
                placeholder='Title of Post'
                required
            />
            <input
                type='textarea'
                name='body'
                value={body}
                onChange={updateBody}
                placeholder='Write your post'
                required
            />
            <button type='submit' disabled={errors.length > 0}>
                Post
            </button>
            <button type='button' onClick={onClose}>
                Cancel
            </button>
        </form>
    );
};

export default EditPostForm;
