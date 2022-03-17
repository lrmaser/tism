import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { getComments } from '../../../store/comment';
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

    return (
        <div>
            {comments?.map(comment => {
                if (comment.post_id === +id) {
                    return (
                        <div>
                            <div key={comment.id}>{comment.body}</div>
                            {user?.id === comment.user_id && (
                                <EditCommentModal commentId={comment.id} />
                            )}
                        </div>
                    )
                } else return null;
        })}
        </div>
    );
};

export default CommentsList;
