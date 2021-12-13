import React from 'react';
import { Link } from 'react-router-dom';
import './room-card.css'

const RoomCard = (props) => {
    return (
        <div className="room-card bg-blue">
            <p className="room-card-header">{props.room_number}</p>
            <div className="room-description">
                <span><i className="fa fa-gift"></i> <br /> {props.facilities}</span>
                <span><i className="fa fa-user"></i> {props.gender}</span>
                <span><i className="fa fa-home"></i> {props.capacity}</span>
                
                <p>Price:</p>
                <p className="start-price">GHS {props.price}</p>
                <Link to="/booking">Book Now</Link>
            </div>
        </div>
    );
};

export default RoomCard;