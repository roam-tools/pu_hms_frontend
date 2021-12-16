import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/authentication';
import './profile.css'

const Profile = () => {
    const student = useSelector(selectUser)
    return (
        <div className="wrapper">
            <div className="container">
                <div className="profile-container">
                    <div className="user-profile">
                        <div className="user-profile-header">
                            Profile
                        </div>
                        <div className="user-profile-body">
                            <h4>{student.studentNumber}</h4>
                            <img src={student.avatar} alt = "" width="80" height="80" className="profileImage" />
                            <h2>{student.firstName +" "+ student.surName}</h2>
                            <p>
                                <strong>{student.emailAddress} <br />{student.phoneNumber}</strong>
                            </p>
                        </div>
                    </div>
                    <div className="user-bookings">
                        <h3>MY BOOKING</h3>
                        <div>
                            <div>
                                <h3>Room 3</h3>
                                <p>Grand Hilton Hostel</p>
                                <p>Not Paid</p>
                            </div>
                            <div>
                                <button className="buttonStyle">Cancel</button>
                                <button className="buttonStyle">Pay Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;