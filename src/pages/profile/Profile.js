import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/authentication";
import "./profile.css";
import bookingServices from "../../services/BookingServices";

const Profile = () => {
  const student = useSelector(selectUser);

  const [studentBooking, setStudentBookings] = useState({});

  useEffect(() => {
    const getStudentBooking = async () => {
      try {
        const myBookings = await bookingServices.getStudentBooking(
          student.studentNumber
        );
        console.log(myBookings.data.data[0]);
        setStudentBookings(myBookings.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getStudentBooking();
  });

  // console.log(studentBooking)

  return (
    <div className="wrapper">
      <div className="container">
        <div className="profile-container">
          <div className="user-profile">
            <div className="user-profile-header">
              <h2>Profile</h2>
            </div>
            <div className="user-profile-body">
              <h3>{student.studentNumber}</h3>
              <img
                src={student.avatar}
                alt=""
                width="80"
                height="80"
                className="profileImage"
              />
              <h2>{student.firstName + " " + student.surName}</h2>
              <p>
                <strong>
                  {student.emailAddress} <br />
                  {student.phoneNumber}
                </strong>
              </p>
            </div>
          </div>
          <div className="user-bookings">
            <h3>My Booking</h3>
            <hr></hr>
            <div>
              <div>
                {Object.keys(studentBooking).length > 0 ? (
                  <Fragment>
                    <h3>{studentBooking.hostel.name} </h3>
                    <p>Room Number: {studentBooking.room.roomId}</p>
                    {/* <p>Payment Status: {studentBooking.isBooked}</p> */}
                    <p>Amount: GHS{studentBooking.room.bedPrice}</p>
                  </Fragment>
                ) : null}
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
