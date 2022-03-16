import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../../store/post';
import PostDetailModal from '../PostDetailModal';
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
                    <PostDetailModal post={post} />
                </div>
            ))}
        </main>
    );
};

export default PostsList;
