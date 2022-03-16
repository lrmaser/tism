import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getPost } from "../../../store/post";
import EditPostForm from "../EditPostForm";
import './PostDetailPage.css';

const PostDetailPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const postId = +id;

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts[id]);

    // const [ showEditForm, setShowEditForm ] = useState(false);

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    // let postMenu;
    // if (post.user_id === user.id) {
    //     postMenu = (
    //         <button type='button' onClick={() => setShowEditForm(true)}>Edit Post</button>
    //     );
    // }

    if (!post) return null;

    return (
        <main>
            <div>
                <h1>{post?.title}</h1>
                <p>{post?.body}</p>
            </div>

            {/* <div>
                {showEditForm ?
                    <EditPostForm post={post} />
                    :
                    <>
                        <h1>{post?.title}</h1>
                        <p>{post?.body}</p>
                        {postMenu}
                    </>
                }
            </div>
            <div>Comments</div> */}
        </main>
    );
};

export default PostDetailPage;
