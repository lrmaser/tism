import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

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

    return (
        <div>
            {comments?.map(comment => {
                if (comment.post_id === +id) {
                    return (
                        <div>
                            <div key={comment.id}>{comment.body}</div>
                            {user?.id === comment.user_id && (
                                <div>
                                    <EditCommentModal commentId={comment.id} />
                                    <button onClick={(e) => handleDelete(e, comment.id)}>Delete Comment</button>
                                </div>
                            )}
                        </div>
                    )
                } else return null;
        })}
        </div>
    );
};

export default CommentsList;
