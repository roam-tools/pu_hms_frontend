import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import hostelImage from "../../assets/images/PUC Campus IMG_9174.JPG";
import { createHostel, selectHostel } from "../../features/hostel.js";
import { useDispatch, useSelector } from "react-redux";
import hostelService from "../../services/HotelServices";
import roomServices from "../../services/RoomServices.js";
import HostelDetail from "../../components/hostel-detail/HostelDetail";
import "./booking.css";
import HostelRoom from "../../components/hostel-room/HostelRoom";
import HostelManager from "../../components/profiles/hostel-mager/HostelManager";
import Alert from "../../components/modal/Alert";
import { selectUser } from "../../features/authentication";

const Booking = () => {
  const [hostelInfo, setHostelInfo] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [featured, setFeatured] = useState([]);
  const hostel = useSelector(selectHostel);
  const [bookNow, setBookNow] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingResponse, setBookingResponse] = useState("");
  const [roomSelected, setRoomSelected] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const student = useSelector(selectUser);

  useEffect(() => {
    const getHostel = async () => {
      setLoading(true)
      const oneHostel = await hostelService.getHostel(hostel.id);
      if(oneHostel.status === 200) {
        setLoading(false)
        const facilityList = oneHostel.data.data[0].facilities?.split(",");
        setFacilities(facilityList);
        setHostelInfo(oneHostel.data.data[0]);
      }
      const rooms = await roomServices.getRooms(oneHostel.data.data[0].id);
      if(rooms.status === 200){
        setLoading(false)
        setRooms(rooms.data.data);
      }
      const featured = await hostelService.getFeaturedHostels();
      if(featured.status === 200){
        setLoading(false)
        setFeatured(featured.data.data);
      }
    };
    getHostel();
  }, [hostel.id]);

  const getHostelId = (hostel) => {
    dispatch(createHostel(hostel));
    window.location.reload();
  };
  const getRoomSelected = (room) => {
    setRoomSelected(room);
    setBookNow(!bookNow);
  };

  const toggleAlert = () => {
    setBookNow(!bookNow);
  };

  const confirmBooking = async () => {
    if(!student){
        navigate("/sign-in",{ replace: true })
        return
    }
    setProcessing(!processing);
    const data = {};
    data.student_id = student.studentNumber;
    data.room_id = roomSelected.id;
    data.comment = "";


    let resp;
    let respMsg;
    try {
      const bookedRoom = await roomServices.bookRoom(data);
      resp = bookedRoom.data.status;
      
      respMsg = bookedRoom.data.message;

      if (resp === 200) {
        setProcessing(false);
        setBooked(true)
        setBookingResponse(respMsg);
      } else {
        setProcessing(false);
        setBookingResponse(respMsg);
      }
    } catch (error) {
      setProcessing(false);
      setBookingResponse(error.response.data.message);
    }
  };

  const navigateToDashboard = () =>{
      navigate("/profile")
  }

  return (
    <Fragment>
      {bookNow && (
        <Alert>
          <p>Are you sure you want to book for this hostel?</p>
          <h2>{hostelInfo.name}</h2>
          <h3>{roomSelected.roomId}</h3>
          <div className="modal-actions">
            {processing ? (
              <div className="loader"></div>
            ) : (
              <div>{bookingResponse}</div>
            )}
            {!booked && 
            <Fragment>
            <button
              className="buttonStyle"
              onClick={confirmBooking}
              disabled={processing}
            >
              Confirm
            </button>
            <button
              className="buttonStyle"
              onClick={toggleAlert}
              disabled={processing}
            >
              Cancel
            </button>
            </Fragment>}
            {booked&&<button className="buttonStyle" onClick={navigateToDashboard}>Go to Dashboard</button>}
          </div>
        </Alert>
      )}
      <div className="wrapper">
        <div className="container">

        {!loading?<Fragment>
          <div className="booking">
            <HostelDetail
              hostelImage={hostelImage}
              hostelName={hostelInfo.name}
              startPrice={hostelInfo.startPrice}
              gender={hostelInfo.gender}
              roomCount={hostelInfo.roomCount}
              telephone={hostelInfo.telephone}
              facilities={facilities}
            />
          </div>
          <div className="hostel-rooms">
            <h2 className="header">ROOMS AVAILABLE</h2>
            <div className="hostel-room-list">
              {rooms?.map((room,index) => {
                return (
                  <div className="hostel_room" key={index}>
                    <HostelRoom
                      roomId={room.roomId}
                      facilities={room.facilities}
                      gender={room.gender}
                      capacity={room.capacity}
                      bedPrice={room.bedPrice}
                      bookNow={() => getRoomSelected(room)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hostel-manager">
            <h2>HOSTEL MANAGER</h2>
            <HostelManager
              avatar={hostel.managedBy?.avatar}
              name={
                hostelInfo.managedBy?.firstName +
                " " +
                hostelInfo.managedBy?.surName
              }
            />
          </div>
          <div className="featured-hostels">
            <h2>OTHER HOSTELS</h2>
            <div className="featured-hostel-list">
              {featured.map((feature, index) => {
                return (
                  <div className="card" key={index}>
                    <div className="overlay">
                      <p>{feature.name}</p>
                      <Link to="/booking" onClick={() => getHostelId(feature)}>
                        View more
                      </Link>
                    </div>
                    <div className="featured-hostel-card">
                      <img
                        src={hostelImage}
                        alt="hostelImage"
                        className="featured-hostel-card-image"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </Fragment>:
          <div className="loader-container">
              <div className="loader"></div>
          </div>
          }
        </div>
      </div>
    </Fragment>
  );
};

export default Booking;
