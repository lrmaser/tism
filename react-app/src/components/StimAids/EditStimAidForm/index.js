import React, { useState } from "react";

import { Modal } from "../../../context/Modal";
import EditStimAidForm from "./EditStimAidForm";
import './EditStimAidForm.css';

const EditStimAidModal = ({ stimAidId }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className='stim-edit' onClick={() => setShowModal(true)}>
                <i className="fas fa-edit"></i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditStimAidForm stimAidId={stimAidId} onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    );
};

export default EditStimAidModal;
