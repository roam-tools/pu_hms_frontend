import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import hostelImage from "../../assets/images/PUC Campus IMG_9174.JPG";
import { selectHostel } from "../../features/hostel.js";
import { useSelector } from "react-redux";
import hostelService from "../../services/HotelServices";
import roomServices from "../../services/RoomServices.js";
import HostelDetail from '../../components/hostel-detail/HostelDetail';
import './booking.css'
import HostelRoom from "../../components/hostel-room/HostelRoom";
import HostelManager from "../../components/profiles/hostel-mager/HostelManager";

const Booking = () => {
    const [hostelInfo, setHostelInfo] = useState({});
    const [facilities, setFacilities] = useState([]);
    const [rooms, setRooms] = useState([]);
    const hostel = useSelector(selectHostel);
  
    useEffect(() => {
      const getHostel = async () => {
        const oneHostel = await hostelService.getHostel(hostel.id);
        const facilityList =oneHostel.data.data[0].facilities?.split(",");
        setFacilities(facilityList);
        setHostelInfo(oneHostel.data.data[0]);
        const rooms = await roomServices.getRooms(oneHostel.data.data[0].id);
        setRooms(rooms.data.data);
      };
      getHostel();
    }, [hostel.id]);

    return (
        <div className="wrapper">
            <div className="container">
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
                    {rooms?.map(room=>{
                        return(
                        <div className="hostel_room" key={room.roomId}>
                        <HostelRoom
                        roomId={room.roomId}
                        facilities={room.facilities}
                        gender={room.gender}
                        capacity={room.capacity}
                        bedPrice={room.bedPrice}
                        />
                        </div>
                        )
                    })
                    }
                    </div>
                </div>
                <div className="hostel-manager">
                    <h2>HOSTEL MANAGER</h2>
                    <HostelManager />
                </div>
                <div className="featured-hostels">
                    <h2>OTHER HOSTELS</h2>
                    {
                        ["adfdda","adsaf","adfdda","adsaf","adfdda","adsaf"].map(hostel=>{
                            return(
                                <div className="card">
                                    <div className="overlay">
                                        <p>
                                            adfaaaaaaaaa
                                        </p>
                                        <Link to="">Book Now</Link>
                                    </div>
                                    <div className="featured-hostel-card">
                                        <img src={hostelImage} alt="image" className="featured-hostel-card-image"/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Booking;