import React from 'react';
import './hostel.css'
import hostelImg from '../../assets/images/PUC Campus IMG_9174.JPG'
import { Link } from 'react-router-dom';

const Hostel = (props) => {
    return (
        <div className="column">
            <div className="hostel-card">
                <img src={hostelImg} alt="hostel" className="hostel-img" />
                <div className="hostel-info">
                    <h2>{props.name}</h2>
                    <i className="fa fa-map-marker" aria-hidden="true"></i> {props.location}<br />
                    <i className="fa fa-bed" aria-hidden="true"></i> {props.beds}<br />
                    <i className="fa fa-home" aria-hidden="true"></i> {props.rooms}<br />

                    <div className="hostel-info-action">
                        <div>Price starts at <br /><span>GHS {props.price_start}</span></div>
                        <Link to="/hostel" onClick={props.getHostelId}>View more</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Hostel;