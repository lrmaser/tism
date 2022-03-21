import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

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
                <div className='post-detail-body'>
                    <p>{post?.body}</p>
                </div>
            </div>
            {postMenu}
            <CommentsList />
            {user ? <CommentForm /> : null}
        </main>
    );
};

export default PostDetailPage;
