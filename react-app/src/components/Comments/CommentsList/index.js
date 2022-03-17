import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { getComments } from '../../../store/comment';
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
                if (comment.post_id === +id) return (
                    <div key={comment.id}>{comment.body}</div>
                )
        })}
        </div>
    );
};

export default CommentsList;
