import React from 'react';
import './confirmation-alert.css'

const Modal = (props) => {
    return (
        <div className="confirmation-modal-overlay">
            <div className="confirmation-modal-content">
                <div className="confirmation-modal-header">
                    <span className="title">{props.title}</span>
                    {/* <span onClick={props.closeModal} className="close">&times;</span> */}
                </div>
                <div className="confirmation-modal-body">
                    {props.children}
                </div>
                <div className="confirmation-modal-footer"></div>
            </div>
        </div>
    );
};

export default Modal;