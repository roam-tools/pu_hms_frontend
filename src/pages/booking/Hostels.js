import React from 'react';
import Hostel from '../../components/hostel/Hostel';
import './hostels.css'
import hostelImg from "../../assets/images/PUC Campus IMG_9174.JPG";
import { Link } from 'react-router-dom';

const Hostels = () => {
    return (
        <div className="wrapper">
            <div className="container">
                <div className="hostel-list">
                    <Hostel>
                        <img src={hostelImg} alt="hostel" className="hostel-img" />
                        <div className="hostel-info">
                            <h2>Hostel name</h2>
                            <i class="fa fa-map-marker" aria-hidden="true"></i> Sowutuom<br />
                            <i class="fa fa-bed" aria-hidden="true"></i> 35 beds available<br />
                            <i class="fa fa-home" aria-hidden="true"></i> 50 rooms available<br />

                            <div className="hostel-info-action">
                                <div>Price starts at <br /><span>GHS 1,500.00</span></div>
                                <Link to="/hostel">View more</Link>
                            </div>
                        </div>
                    </Hostel>
                </div>
            </div>
        </div>
    );
};

export default Hostels;