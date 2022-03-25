import React, { useState } from "react";

import { Modal } from "../../../context/Modal";
import EditStimAidForm from "./EditStimAidForm";
import './EditStimAidForm.css';

const EditStimAidModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Stim Aid</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditStimAidForm onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    );
};

export default EditStimAidModal;
