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
    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();

        return history.push('/posts/new');
    };

    // Doesn't take time zone into account, looking into date formatting package
    const timeSincePosted = (postDate) => {
        let seconds = Math.floor((new Date() - postDate) / 1000);
        let intervalType;

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            intervalType = 'year';
        } else {
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                intervalType = 'month';
            } else {
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                    intervalType = 'day';
                } else {
                    interval = Math.floor(seconds / 3600);
                    if (interval >= 1) {
                        intervalType = 'hour';
                    } else {
                        interval = Math.floor(seconds / 60);
                        if (interval >= 1) {
                            intervalType = 'minute';
                        } else {
                            interval = seconds;
                            intervalType = 'second';
                        }
                    }
                }
            }
        }

        if (interval > 1 || interval === 0) {
            intervalType += 's';
        }

        return interval + ' ' + intervalType;
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
            <div className='posts-page-bottom'>
                <h2>Latest Posts</h2>
                {posts?.map(post => (
                    <div key={post.id} className='post-links'>
                        <div className='posts-user'>
                            <Link to={`/profiles/${post.user_id}`}>
                                {post.user.profile_image
                                    ? <img src={post.user.profile_image} alt="User's Profile"></img>
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
                                <div className='posts-post-time'>{timeSincePosted(new Date(post.created_at))} ago</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default PostsList;
