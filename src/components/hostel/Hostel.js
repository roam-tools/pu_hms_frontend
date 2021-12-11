import React from 'react';
import './hostel.css'

const Hostel = (props) => {
    return (
        <div className="hostel-card">
            {props.children}
        </div>
    );
};

export default Hostel;