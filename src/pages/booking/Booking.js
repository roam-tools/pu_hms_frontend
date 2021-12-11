import React from 'react';
import hostel from "../../assets/images/PUC Campus IMG_9174.JPG";
import BookingForm from '../../components/booking/BookingForm';
import './booking.css'

const Booking = () => {
    return (
        <div className="wrapper">
            <div className="container">
                <div className="sub-nav">
                    {/* afd */}
                </div>
                <div className="booking">
                    <img src={hostel} alt="" className="hostel-image" />
                    <div className="booking-info">
                        <h1 className="booking-title">Hostel Reservation</h1>
                        <BookingForm />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;