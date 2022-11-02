import { Avatar, Input, PageHeader, Space, Table } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import http from "../../api";

const { Search } = Input;

const columns = [
  {
    title: "Photo",
    dataIndex: "image",
    key: "image",
    render: (_, record) => <div>{<Avatar src={record.student.image} />}</div>,
    align: "center",
  },
  {
    title: "Student Id",
    dataIndex: "student_id",
    render: (_, record) => <div>{record.student.student_id}</div>,
    key: "student_id",
    align: "center",
  },
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <div>{record.student.first_name + " " + record.student.last_name}</div>
    ),
    align: "center",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
    render: (_, record) => <div>{record.student.phone_number}</div>,
    align: "center",
  },
  {
    title: "Hostel",
    dataIndex: "name",
    key: "name",
    render: (_, record) => <div>{record.hostel.name}</div>,
    align: "center",
  },
  {
    title: "Room",
    dataIndex: "room",
    key: "room",
    render: (_, record) => <div>{record.room.room_id}</div>,
    align: "center",
  },
  {
    title: "Amount",
    dataIndex: "amount_to_pay",
    key: "amount_to_pay",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "payment_status",
    key: "payment_status",
    align: "center",
  },
];

export const Bookings = () => {
  const [filtering, setFiltering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await http.get("admin/hostel/booking", {
          retry: 100,
          retryDelay: 3000,
        });
        setLoading(false);
        setBooking(response.data.bookings);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getStudents();
  }, []);

  const handleSearch = (value) => {
    setFiltering(true);
    setFiltered(
      booking.filter((room) => {
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
        title="Bookings"
        subTitle="Booking status list"
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
        dataSource={!filtering ? booking : filtered}
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
