import { Alert, Button, Card, Pagination, Select, Space } from "antd";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../../api";
import Spinner from "../spinner/Spinner";
import "./room.css";

const { Option } = Select;

const pageSize = 8;

export const AvailableRoom = ({ data }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(pageSize);
  const { student } = useSelector((state) => state.login);
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {}, [updateList]);

  useEffect(() => {
    const getRooms = async () => {
      setLoading(true);
      try {
        const roomIds = data.map((room) => {
          return room.id;
        });
        const roomEndpoint = [];
        roomIds.map((roomid) => roomEndpoint.push(getRoomsAvailable(roomid)));
        const roomList = await axios.all(roomEndpoint);
        setRoomsData(
          roomList.map((room) => {
            return {
              facilities: room.facilities,
              room: {
                ...room.room,
                beds: room.beds,
              },
            };
          })
        );
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoomsAvailable = async (roomId) => {
    try {
      const response = await http.get(`rooms/${roomId}`, {
        retry: 10,
        retryDelay: 3000,
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (roomId, id) => {
    const updateThis = roomsData?.map((room) => {
      if (room.room.id === roomId) {
        room.room.selected = student.isLogin ? true : false;
        room.room.value = id;
        return {
          ...room,
        };
      } else {
        room.room.selected = false;
        room.room.value = "";
        return {
          ...room,
        };
      }
    });

    setRoomsData(updateThis);
    setUpdateList(!updateList);
  };

  const handleBooking = async (values) => {
    try {
      setBookingStatus(true);
      await http.post("booking/book", values);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setBookingStatus(false);
      setError(error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  return (
    <Fragment>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div className="available-rooms">
          <h4 className="intro-y av-title">AVAILABLE ROOMS</h4>
          {!student.isLogin && (
            <Alert
              type="info"
              message="NOTICE"
              description="You must login to be able to book a room. Multiple bookings not allowed."
              style={{
                marginBottom: 15,
                fontSize: "40px",
                textAlign: "center",
                padding: "20px 0",
              }}
            />
          )}
          <div className="room-list intro-y">
            {roomsData?.map(
              (room, index) =>
                index >= minIndex &&
                index < maxIndex && (
                  <Card key={index} className="room-detail intro-y">
                    <h3>{room.room.room_id}</h3>
                    <br />
                    <Space>
                      <i className="fa fa-user"></i>
                      <span>{room.room.gender}</span>
                    </Space>
                    <br />
                    <Space>
                      <i className="fa fa-bed"></i>
                      <span>{room.room.capacity}</span>
                    </Space>
                    <br />
                    <br />

                    <p>Price per bed/per semester</p>
                    <h3>{room?.room?.bed_price || 0.0}</h3>
                    <br />
                    <div id="pbed" style={{ position: "relative" }}>
                      <Select
                        size="large"
                        getPopupContainer={() =>
                          document.getElementById("pbed")
                        }
                        style={{ width: "100%", marginBottom: 15 }}
                        onChange={(value) => handleChange(room.room.id, value)}
                        value={room.room.value}
                        placeholder="Select bed"
                      >
                        {room?.room?.beds?.map((item, index) => (
                          <Option
                            key={index}
                            value={item.id}
                            disabled={!item.is_available}
                          >
                            {item.bed_id} {item.bed_type}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <Button
                      loading={bookingStatus}
                      onClick={() =>
                        handleBooking({
                          room: room.room.id,
                          hostel: room.room.hostel,
                          bed: room.room.value,
                        })
                      }
                      block
                      disabled={!room?.room?.selected}
                    >
                      BOOK
                    </Button>
                  </Card>
                )
            )}
          </div>
          <div style={{ display: "block", marginTop: 40 }}>
            <Pagination
              pageSize={pageSize}
              current={currentPage}
              total={roomsData?.length}
              onChange={handlePageChange}
              style={{
                display: "block",
                textAlign: "center",
                marginBottom: 40,
              }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};
