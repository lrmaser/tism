import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import moment from 'moment';

import { getPost, deletePost } from "../../../store/post";
import EditPostModal from "../EditPostForm";
import CommentForm from '../../Comments/CommentForm';
import CommentsList from "../../Comments/CommentsList";
import './PostDetailPage.css';

const PostDetailPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts[id]);
    const commentsObj = useSelector(state => state.comments);
    const commentsArr = Object.values(commentsObj);
    const comments = commentsArr.filter(comment => comment.post_id === post.id);

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    const handleDelete = async (e) => {
        e.preventDefault();

        if (window.confirm("Are you sure you'd like to delete your post? Any comments will also be removed.")) {
            await dispatch(deletePost(id));
            history.push('/posts');
        }
    };

    let postMenu = null;
    if (user && post?.user_id === user.id) {
        postMenu = (
            <div>
                <EditPostModal />
                <button onClick={handleDelete}>Delete Post</button>
            </div>
        );
    }

    if (!post) return null;

    return (
        <main className='post-detail-page'>
            <div className='post-detail-left'>
                <div className='post-detail-title'>
                    <h1>{post?.title}</h1>
                </div>
                <div className='post-detail-info'>
                    <div className='post-detail-author'>
                        <Link to={`/profiles/${post?.user_id}`}>{post?.user.name}</Link>
                    </div>
                    <div className='post-detail-replies'>{comments?.length} replies</div>
                    <div className='post-detail-time'>{moment(post?.created_at).fromNow()}</div>
                </div>
                <div className='post-detail-body'>
                    <p>{post?.body}</p>
                </div>
                <div className='comment-form-container'>
                    <div className='comment-form-user'>
                        {post.user.profile_image
                            ? <img src={post?.user.profile_image} alt="User's Profile"></img>
                            : <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Default User Profile"></img>
                        }
                    </div>
                    {user ? <CommentForm /> : null}
                </div>
                <div className='post-comments-header'>Replies</div>
                <CommentsList />
            </div>
            <div className='post-detail-right'>
                {postMenu}
            </div>
        </main>
    );
};

export default PostDetailPage;
