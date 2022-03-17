import React, { useState } from "react";

import { Modal } from "../../../context/Modal";
import EditCommentForm from "./EditCommentForm";
import './EditCommentForm.css';

const EditCommentModal = ({ commentId }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Edit Comment</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <EditCommentForm commentId={commentId} onClose={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    );
};

export default EditCommentModal;
