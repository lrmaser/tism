import React, { useState } from "react";

import { Modal } from "../../../context/Modal";
import EditProfileForm from "./EditProfileForm";
import './EditProfileForm.css';

const EditProfileModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit My Profile</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditProfileForm  onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    );
};

export default EditProfileModal;
