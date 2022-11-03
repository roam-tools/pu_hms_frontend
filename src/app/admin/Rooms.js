import { Input, PageHeader, Space, Table } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import http from "../../api2";

const { Search } = Input;

const columns = [
  {
    title: "Room Name",
    dataIndex: "room_id",
    key: "room_id",
    align: "center",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
    align: "center",
  },
  {
    title: "Available",
    dataIndex: "remaining",
    key: "remaining",
    align: "center",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "event",
    key: "event",
    align: "center",
  },
];

export const AdminRooms = () => {
  const [filtering, setFiltering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await http.get("admin/hostel/rooms", {
          retry: 100,
          retryDelay: 3000,
        });
        setLoading(false);
        setRooms(response.data.rooms);
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, []);

  const handleSearch = (value) => {
    setFiltering(true);
    setFiltered(
      rooms.filter((room) => {
        return Object.values(room)
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      })
    );

    if (!value) {
      setFiltering(false);
    }
  };

  return (
    <Fragment>
      <PageHeader
        title="Rooms"
        subTitle="Room status list"
        extra={[
          <Space key="1">
            <Search
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Space>,
        ]}
        style={{
          background: "white",
          marginBottom: 15,
          border: "1px solid #ccc",
        }}
      />
      <Table
        columns={columns}
        dataSource={!filtering ? rooms : filtered}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{
          pageSize: 50,
          hideOnSinglePage: true,
          position: ["bottomCenter"],
        }}
      />
    </Fragment>
  );
};
