import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { createPost } from '../../../store/post';
import './PostForm.css';

const PostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [ errors, setErrors ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');

    const updateTitle = (e) => setTitle(e.target.value);
    const updateBody = (e) => setBody(e.target.value);

    useEffect(() => {
        const validationErrors = [];

        if (title.length > 80) {
            validationErrors.push('Title must not be more than 80 characters long');
        }

        setErrors(validationErrors);
    }, [title]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: user.id,
            title,
            body
        };

        const newPost = await dispatch(createPost(payload));
        console.log('--------', newPost)

        if (newPost.ok) history.push('/posts');
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/posts');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>New Info Dump</h1>
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
            <button type='button' onClick={handleCancel}>
                Cancel
            </button>
        </form>
    );
};

export default PostForm;
