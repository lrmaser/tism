import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";

import { getPosts } from '../../../store/post';
import './PostsList.css';

const PostsList = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const postsObj = useSelector(state => state.posts);
    const posts = Object.values(postsObj);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();

        return history.push('/posts/new');
    };

    return (
        <main className='posts-page'>
            <div className='posts-page-banner'>
                <div className='posts-page-banner-left'>
                    <h1>Info dump and learn with the tism community</h1>
                    <p>Whether it's a fun fact or information about a special interest, we want to know about it. This is your space to share <i>whatever</i> is on your mind. As always, please remember to be kind. Inappropriate or disrespectful content will not be tolerated.</p>
                    <button type='button' onClick={handleClick}>New Post</button>
                </div>
                <div className='posts-page-banner-right'>
                    Image here
                </div>
            </div>
            {posts?.map(post => (
                <div key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        <h2>{post.title}</h2>
                    </Link>
                </div>
            ))}
        </main>
    );
};

export default PostsList;
