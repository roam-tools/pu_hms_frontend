import React from 'react';
import './modal.css'

const Alert = (props) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header"></div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="modal-footer"></div>
            </div>
        </div>
    );
};

export default Alert;