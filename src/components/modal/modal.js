import React from 'react';
import './modal.css'

const Modal = (props) => {
    return (
        <div className="modal-overlay">
            <div className="input-modal-content">
                <div className="input-modal-header">
                    <span className="title">{props.title}</span>
                    <span onClick={props.closeModal} className="close">&times;</span>
                </div>
                <div className="input-modal-body">
                    {props.children}
                </div>
                <div className="input-modal-footer"></div>
            </div>
        </div>
    );
};

export default Modal;