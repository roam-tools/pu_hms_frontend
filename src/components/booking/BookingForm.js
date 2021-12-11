import React from 'react';

const BookingForm = () => {
    return (
        <form className="booking-form">
            <div>
                <div className="form__floating">
                    <select name="hostel-locations" className="input__control">
                        <option></option>
                        <option>Location one</option>
                        <option>Location one</option>
                        <option>Location one</option>
                        <option>Location one</option>
                    </select>
                    <label htmlFor="hostel-locations" className="input__label">Select Location</label>
                </div>

                <div className="form__floating">
                    <select name="hostelList" className="input__control">
                        <option></option>
                        <option>Location one</option>
                        <option>Location one</option>
                        <option>Location one</option>
                        <option>Location one</option>
                    </select>
                    <label htmlFor="hostelList" className="input__label">Select Hostel</label>
                </div>

                <div className="form__floating">
                    <select name="roomList" className="input__control">
                        <option></option>
                        <option>Location one</option>
                        <option>Location one</option>
                        <option>Location one</option>
                        <option>Location one</option>
                    </select>
                    <label htmlFor="roomList" className="input__label">Select Room Type</label>
                </div>

                {/* <h1>Payment</h1> */}

                <div className="form__floating">
                    <select name="method" className="input__control">
                        <option></option>
                        <option>Location one</option>
                        <option>Location one</option>
                        <option>Location one</option>
                        <option>Location one</option>
                    </select>
                    <label htmlFor="method" className="input__label">Payment Method</label>
                </div>


                

            </div>
        </form>
    );
};

export default BookingForm;