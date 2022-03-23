import React, { useState } from "react";

import { Modal } from "../../../context/Modal";
import EditCommentForm from "./EditCommentForm";
import './EditCommentForm.css';

const EditCommentModal = ({ commentId }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className='comment-edit' onClick={() => setShowModal(true)}>
                <i className="fas fa-edit"></i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm commentId={commentId} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
};

export default EditCommentModal;
