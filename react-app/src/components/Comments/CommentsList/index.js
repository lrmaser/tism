import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";

import { getComments, deleteComment } from '../../../store/comment';
import EditCommentModal from '../EditCommentForm';
import './CommentsList.css';

const CommentsList = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const commentsObj = useSelector(state => state.comments);
    const comments = Object.values(commentsObj);

    useEffect(() => {
        dispatch(getComments());
    }, [dispatch]);

    const handleDelete = async (e, commentId) => {
        e.preventDefault();

        if (window.confirm("Are you sure you'd like to delete your comment?")) {
            await dispatch(deleteComment(commentId));
        }
    };

    const handleImage = (e) => {
        e.target.src = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";
    };

    return (
        <div className='comments-container'>
            {comments?.map(comment => {
                if (comment.post_id === +id) {
                    return (
                        <div key={comment.id} className='comment'>
                            <div className='comment-user'>
                                <Link to={`/profiles/${comment.user_id}`}>
                                    {comment.user.profile_image ?
                                        <img
                                            src={comment.user.profile_image}
                                            alt="User's Profile"
                                            onError={handleImage}
                                        />
                                        : <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Default User Profile"></img>
                                    }
                                </Link>
                            </div>
                            <div key={comment.id} className='comment-contents'>
                                <div className='comment-user-name'>
                                    <Link to={`/profiles/${comment.user_id}`}>
                                        {comment.user.name}
                                    </Link>
                                    {user?.id === comment.user_id && (
                                        <div>
                                            <EditCommentModal commentId={comment.id} />
                                            <button className='comment-delete' onClick={(e) => handleDelete(e, comment.id)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className='comment-body'>{comment.body}</div>
                            </div>
                        </div>
                    )
                } else return null;
        })}
        </div>
    );
};

export default CommentsList;
