import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import { editPost } from '../../../store/post';
import './EditPostForm.css';

const EditPostForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const post = useSelector(state => state.posts[id]);

    const [ error, setError ] = useState([]);
    const [ title, setTitle ] = useState(post?.title);
    const [ body, setBody ] = useState(post?.body);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateBody = (e) => setBody(e.target.value);

    useEffect(() => {
        if (title?.length > 80) {
            setError('Title must not be more than 80 characters.');
        } else {
            setError('');
        }
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
            onClose(false);
        };
    };

    return (
        <form className='edit-post-form' onSubmit={handleSubmit}>
            <div className='post-error'>{error}</div>
            <input
                type='text'
                className='post-title'
                name='title'
                value={title}
                onChange={updateTitle}
                placeholder='Title of Post'
                required
            />
            <textarea
                className='post-body'
                name='body'
                value={body}
                onChange={updateBody}
                placeholder='Write your post'
                rows={15}
                required
            />
            <div className='post-buttons'>
                <button type='submit' className='post-submit' disabled={error || !title || !body}>
                    Post
                </button>
                <button type='button' className='post-cancel' onClick={onClose}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditPostForm;
