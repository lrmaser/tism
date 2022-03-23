import React, { useState } from "react";

import { Modal } from "../../../context/Modal";
import EditSpecialInterestForm from "./EditSpecialInterestForm";
import './EditSpecialInterestForm.css';

const EditSpecialInterestModal = ({ specialInterestId }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className='special-interest-edit' onClick={() => setShowModal(true)}>
                <i className="fas fa-edit"></i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSpecialInterestForm specialInterestId={specialInterestId} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
};

export default EditSpecialInterestModal;
