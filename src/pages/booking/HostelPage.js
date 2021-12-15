import React, { Fragment, useEffect, useState } from "react";
import Card from "../../components/card/Card.js";
import heroHostel from "../../assets/images/PUC Campus IMG_9174.JPG";
import "./hostel-page.css";
import { Link } from "react-router-dom";
import RoomCard from "../../components/card/RoomCard.js";
import { selectHostel } from "../../features/hostel.js";
import { useSelector } from "react-redux";
import hostelService from "../../services/HotelServices";
import roomServices from "../../services/RoomServices.js";

const HostelPage = () => {
  const [hostelInfo, setHostelInfo] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const hostel = useSelector(selectHostel);

  useEffect(() => {
    console.log("GET HOSTEL IN HOSTEL PAGE", hostel.id);
    const getHostel = async () => {
      const oneHostel = await hostelService.getHostel(hostel.id);
      const facilityList =
        oneHostel.data.data[0].length > 0 &&
        oneHostel.data.data[0].facilities.split(",");
      setFacilities(facilityList);
      setHostelInfo(oneHostel.data.data[0]);
      console.log(oneHostel.data.data[0]);
      const rooms = await roomServices.getRooms(oneHostel.data.data[0].id);
      console.log(rooms.data.data);
      setRooms(rooms.data.data);
    };
    getHostel();
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="hostel-page">
          <h2>{hostelInfo.name}</h2>
          <div className="hostel-page-header">
            <img src={heroHostel} alt="" className="imgHostel" />
            <div className="hostel-page-info">
              <Card>
                <div className="card-content-wrap">
                  <p>
                    Price starts at:
                    <br />
                    <span>GHS {hostelInfo.startPrice}</span>
                    <br /> <small>per bed/semester</small>
                  </p>
                  <br />
                  <i className="fa fa-user" aria-hidden="true"></i>{" "}
                  {hostelInfo.gender}
                  <br />
                  <i className="fa fa-home" aria-hidden="true"></i>{" "}
                  {hostelInfo.roomCount}
                  <br />
                  <br />
                  <div className="hostel-content-wrapper-action">
                    <span>
                      <strong>Quick enquiry</strong>
                    </span>
                    <Link to="/hostel">
                      <i className="fa fa-phone"></i>
                      {hostelInfo.telephone}
                    </Link>
                  </div>
                </div>
              </Card>
              <br />
              <Card>
                <h3 className="hostel-hightlight">Hostel Highlights</h3>
                <div className="highlights">
                  {facilities.length > 0 &&
                    facilities.map((facility, index) => {
                      return (
                        <span key={index}>
                          <i className="fa fa-check"></i> {facility}
                        </span>
                      );
                    })}
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="hostel-rooms">
          <h1 className="rooms-available">ROOMS AVAILABLE</h1>
          <div className="rooms-wrap">
            {rooms?.map((room) => {
              return (
                <Fragment key={room.roomId}>
                  <RoomCard
                    room_number={room.roomId}
                    facilities={room.facilities}
                    gender={room.gender}
                    capacity={room.capacity}
                    price={room.bedPrice}
                  />
                </Fragment>
              );
            })}
          </div>
        <div>
          <br />
        <h1 className="rooms-available">HOSTEL MANAGER</h1>

        </div>
        </div>

      </div>
    </div>
  );
};

export default HostelPage;
