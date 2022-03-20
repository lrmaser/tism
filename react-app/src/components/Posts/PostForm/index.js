import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { createPost } from '../../../store/post';
import './PostForm.css';

const PostForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [ error, setError ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');

    const updateTitle = (e) => setTitle(e.target.value);
    const updateBody = (e) => setBody(e.target.value);

    useEffect(() => {
        if (title.length > 80) {
            setError('Title must not be more than 80 characters.');
        } else {
            setError('');
        }
    }, [title]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: user.id,
            title,
            body
        };

        const newPost = await dispatch(createPost(payload));

        if (newPost.ok) history.push('/posts');
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/posts');
    };

    return (
        <main className='new-post-page'>
            <form className='new-post-form' onSubmit={handleSubmit}>
                <h1>New Info Dump</h1>
                <div className='new-post-error'>{error}</div>
                <input
                    type='text'
                    id='new-post-title'
                    name='title'
                    value={title}
                    onChange={updateTitle}
                    placeholder='Title of Post'
                    required
                />
                <textarea
                    id='new-post-body'
                    name='body'
                    value={body}
                    onChange={updateBody}
                    placeholder='Write your post'
                    rows={15}
                    required
                />
                <div className='new-post-buttons'>
                    <button type='submit' className='new-post-submit' disabled={error || !title || !body}>
                        Post
                    </button>
                    <button type='button' className='new-post-cancel' onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
};

export default PostForm;
