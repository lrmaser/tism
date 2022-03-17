import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { getPosts } from '../../../store/post';
import './PostsList.css';

const PostsList = () => {
    const dispatch = useDispatch();

    const postsObj = useSelector(state => state.posts);
    const posts = Object.values(postsObj);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <main>
            <h1>Info Dump</h1>
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
