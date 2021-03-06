import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import moment from 'moment';

import { getPost, deletePost } from "../../../store/post";
import { getComments } from "../../../store/comment";
import EditPostModal from "../EditPostForm";
import CommentForm from '../../Comments/CommentForm';
import CommentsList from "../../Comments/CommentsList";
import './PostDetailPage.css';

const PostDetailPage = ({ profile }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const formRef = useRef();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts[id]);
    const commentsObj = useSelector(state => state.comments);
    const commentsArr = Object.values(commentsObj);
    const comments = commentsArr.filter(comment => comment.post_id === +id);

    useEffect(() => {
        dispatch(getPost(id));
        dispatch(getComments());
    }, [dispatch, id]);

    const handleDelete = async (e) => {
        e.preventDefault();

        if (window.confirm("Are you sure you'd like to delete your post? Any comments will also be removed.")) {
            await dispatch(deletePost(id));
            history.push('/posts');
        }
    };

    const handleImage = (e) => {
        e.target.src = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";
    };

    let postMenu = null;
    if (user && post?.user_id === user.id) {
        postMenu = (
            <div className='post-menu'>
                <EditPostModal />
                <button onClick={handleDelete}>Delete Post</button>
            </div>
        );
    }

    if (!post) return null;

    return (
        <main className='post-detail-page'>
            <div className='post-detail-left'>
                <div className='post-detail-post'>
                    <div className='post-detail-title'>
                        <h1>{post?.title}</h1>
                    </div>
                    <div className='post-detail-body'>
                        <p>{post?.body}</p>
                    </div>
                </div>
                <div className='post-comments-header'>Replies</div>
                {!comments?.length ?
                    <div className='post-no-comments'>
                        No one has replied to this post yet!
                    </div>
                    : <CommentsList />
                }
                {user
                    ?   <div className='comment-form-container' ref={formRef}>
                            <div className='comment-form-user'>
                                {profile?.profile_image ?
                                    <img
                                        src={profile?.profile_image}
                                        alt="User's Profile"
                                        onError={handleImage}
                                    />
                                    : <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Default User Profile"></img>
                                }
                            </div>
                            <CommentForm />
                        </div>
                    : null
                }
            </div>
            <div className='post-detail-right'>
                <div className='post-user-info'>
                    <div className='post-user-img-and-name'>
                        <Link to={`/profiles/${post?.user_id}`}>
                            {post?.user.profile_image ?
                                <img
                                    src={post?.user.profile_image}
                                    alt="User's Profile"
                                    onError={handleImage}
                                />
                                : <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Default User Profile"></img>
                            }
                            <div className='post-user-name'>{post?.user.name}</div>
                        </Link>
                    </div>
                    <div className='post-user-joined-date'>
                        <i className="fas fa-birthday-cake"></i>
                        <div>Joined {moment(post?.user.created_at).format('LL')}</div>
                    </div>
                    {postMenu}
                </div>
            </div>
        </main>
    );
};

export default PostDetailPage;
