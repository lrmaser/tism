import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Modal } from "../../../context/Modal";
import PostDetail from "./PostDetail";
import './PostDetailModal.css';

const PostDetailModal = ({ post }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <Link to={`/posts/${post.id}`} onClick={(e) => {
                e.preventDefault()
                setShowModal(true)
            }}>
                <h2>{post.title}</h2>
            </Link>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostDetail postId={post.id} onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    );
};

export default PostDetailModal;
