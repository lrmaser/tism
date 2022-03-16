import React, { useState } from "react";

import { Modal } from "../../../context/Modal";
import PostDetail from "./PostDetail";
import './PostDetailModal.css';

const PostDetailModal = ({ post }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <h2>{post.title}</h2>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostDetail postId={post.id} onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    );
};

export default PostDetailModal;
