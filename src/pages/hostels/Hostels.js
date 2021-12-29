import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import hostelService from "../../services/HotelServices";
import Hostel from '../../components/hostel/Hostel';
import './hostels.css'
import { createHostel } from "../../features/hostel";
// import hostelImg from '../../assets/images/PUC Campus IMG_9174.JPG'


const Hostels = () => {

    const [hostels, setHostels] = useState([]);
    const [loader,setLoader] = useState(false)

    const dispatch = useDispatch();
  
    useEffect(() => {
      const getHostels = async () => {
          setLoader(true)
        try {
          const hostels = await hostelService.getHostels();
        if (hostels.status === 200) {
          setHostels(hostels.data.data);
          setLoader(false)
        }

        } catch (error) {
          console.log(error.response.data.message);
        }
      };
      getHostels();
    }, []);
  
    const getHostelId = (hostel) => {
      dispatch(createHostel(hostel));
    };

    return (
        <Fragment>
            <div className="header-image">
                <h1>You can trust us for a secure, serene, and healthy environment</h1>
            </div>
            <div className="wrapper">
                <div className="container">
                    <div className="hostels">
                    {loader &&
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>}
                        {hostels.length > 0 ? hostels?.map((hostel) => {
                            let image = <img src={hostel.image} alt="hostel" className="hostel-img" />
                            return (
                            <Fragment key={hostel.id}>
                                <Hostel
                                image={image}
                                key={hostel.id}
                                name={hostel.name}
                                location={hostel.location}
                                beds={hostel.bedCount}
                                rooms={hostel.roomCount}
                                price_start={hostel.startPrice}
                                getHostelId={() => getHostelId(hostel)}
                                />
                            </Fragment>
                            );
                        }) : 
                        null
                        }
                    
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Hostels;