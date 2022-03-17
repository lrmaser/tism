import React, { useState } from "react";

import { Modal } from "../../../context/Modal";
import CommentForm from "./CommentForm";
import './CommentForm.css';

const CommentFormModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Comment on Post</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CommentForm onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    );
};

export default CommentFormModal;
