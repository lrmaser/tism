import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import moment from 'moment';

import { getPosts } from '../../../store/post';
import './PostsList.css';

const PostsList = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const postsObj = useSelector(state => state.posts);
    const posts = Object.values(postsObj);
    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();

        return history.push('/posts/new');
    };

    const handleImage = (e) => {
        e.target.src = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";
    };

    return (
        <main className='posts-page'>
            <div className='posts-page-banner'>
                <div className='posts-page-banner-left'>
                    <h1>Info dump and learn with the tism community</h1>
                    <p>Whether it's a fun fact or information about a special interest, we want to know about it. This is your space to share <i>whatever</i> is on your mind. As always, please remember to be kind. Inappropriate or disrespectful content will not be tolerated.</p>
                    {user ? <button type='button' onClick={handleClick}>New Post</button> : null}
                </div>
                <div className='posts-page-banner-right'>
                    <img src="https://www.pikpng.com/pngl/b/333-3336426_hobby-icon-color-friend-png-clipart.png" alt="Hobbies"></img>
                </div>
            </div>
            <div className='posts-page-bottom'>
                <h2>Latest Posts</h2>
                {posts?.map(post => (
                    <div key={post.id} className='post-links'>
                        <div className='posts-user'>
                            <Link to={`/profiles/${post.user_id}`}>
                                {post.user.profile_image ?
                                    <img
                                        src={post.user.profile_image}
                                        alt="User's Profile"
                                        onError={handleImage}
                                    />
                                    : <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Default User Profile"></img>
                                }
                            </Link>
                        </div>
                        <div className='posts-post-container'>
                            <div className='posts-post-title'>
                                <Link to={`/posts/${post.id}`}>
                                    <h3>{post.title}</h3>
                                </Link>
                            </div>
                            <div className='posts-post-info'>
                                <div className='posts-post-author'>
                                    <Link to={`/profiles/${post.user_id}`}>{post.user.name}</Link>
                                </div>
                                <div className='posts-post-replies'>
                                    <Link to={`/posts/${post.id}`}>{post.comments.length} replies</Link>
                                </div>
                                <div className='posts-post-time'>{moment(post.created_at).fromNow()}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default PostsList;
