import React from 'react';
import { Link } from 'react-router-dom';
import './room-card.css'

const RoomCard = () => {
    return (
        <div className="room-card bg-blue">
            <p className="room-card-header">Room 1</p>
            <div className="room-description">
                <span><i className="fa fa-gift"></i> <br /> Private Bathroom,balcony,Air-condition</span>
                <span><i className="fa fa-user"></i> Male Only</span>
                <span><i className="fa fa-home"></i> 2/2 in room</span>
                
                <p>Price starts at:</p>
                <p className="start-price">GHS 1,500</p>
                <Link to="/booking">Book Now</Link>
            </div>
        </div>
    );
};

export default RoomCard;