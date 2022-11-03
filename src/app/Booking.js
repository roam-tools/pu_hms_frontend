import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../api";
import { Footer } from "../components/footer/Footer";
import { HostelDetail } from "../components/hostel/HostelDetail";
import { Manager } from "../components/hostel/Manager";
import { HostelVerticalScrol } from "../components/hostels/HostelVerticalScrol";
import { Navbar } from "../components/navbar/Navbar";
import { AvailableRoom } from "../components/room/AvailableRoom";
import Spinner from "../components/spinner/Spinner";

export const Booking = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [hostel, setHostel] = useState({});
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const getHostel = async () => {
      setLoading(true);
      try {
        const response = await http.get(`hostels/${id}`, {
          retry: 100,
          retryDelay: 3000,
        });
        const response2 = await http.get(`hostels`, {
          retry: 100,
          retryDelay: 3000,
        });

        const { hostel, manager, facilities, rooms } = response.data;
        setHostel({ hostel, manager, facilities, rooms });
        setHostels(response2.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getHostel();
  }, [id]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div
            className="puc-bg-white m-mb p-0"
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <Navbar className="container puc-navbar px-0" />
          </div>
          <div className="container p-0">
            <HostelDetail
              data={hostel?.hostel}
              facilities={hostel?.facilities}
            />
            <AvailableRoom data={hostel?.rooms} />
            <Manager data={hostel?.manager} hostel={hostel?.hostel} />
          </div>
          <HostelVerticalScrol hostels={hostels} title="Other Hostels" />
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};
