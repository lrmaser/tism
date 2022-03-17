import React, { useState } from "react";

import { Modal } from "../../../context/Modal";
import EditPostForm from "./EditPostForm";
import './EditPostForm.css';

const EditPostModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Post</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPostForm onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    );
};

export default EditPostModal;
