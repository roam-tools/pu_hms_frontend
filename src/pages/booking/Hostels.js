import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Hostel from "../../components/hostel/Hostel";
import { createHostel } from "../../features/hostel";
import hostelService from "../../services/HotelServices";
import './hostels.css'

const Hostels = () => {
  const [hostels, setHostels] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    const getHostels = async () => {
      try {
        const hostels = await hostelService.getHostels();
        console.log(hostels.data);
        setHostels(hostels.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getHostels();
  }, []);

  const getHostelId = (hostel) => {
    //   console.log("GET HOSTEL LIST TO EXTRACT ID ",hostel);
      dispatch(createHostel(hostel))
  }

  return (
    <div className="wrapper">
        <div className="container">
            <div className="hostel-list">
                {hostels?.map(hostel=>{
                    return  <Fragment key={hostel.id}>
                            <Hostel
                            key={hostel.id}
                            name={hostel.name}
                            location={hostel.location}
                            beds={hostel.bedCount}
                            rooms={hostel.roomCount}
                            price_start={hostel.startPrice}
                            getHostelId={()=>getHostelId(hostel)}
                            />
                            </Fragment>
                })}
            </div>
        </div>
    </div>
  );
};

export default Hostels;
