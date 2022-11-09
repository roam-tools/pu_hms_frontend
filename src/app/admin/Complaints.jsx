import { Avatar, Button, Input, PageHeader, Space, Table } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import http from "../../api2";

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
    key: "student_id",
    render: (_, record) => <div>{record.student.student_id}</div>,
  },
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <div>
        {record.student.first_name} {record.student.last_name}
      </div>
    ),
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
  {
    title: "Remarks",
    dataIndex: "remarks",
    key: "remarks",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Date",
    dataIndex: "created",
    key: "created",
    render: (text) => (
      <div>{text ? moment(text).format("DD-MM-YYYY hh-mm-s a") : "Never"}</div>
    ),
  },
];

export const Complaints = () => {
  const [filtering, setFiltering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await http.get("admin/complaints", {
          retry: 100,
          retryDelay: 3000,
        });
        console.log(response.data);
        setLoading(false);
        setComplaints(response.data.complaints);
      } catch (error) {
        console.log(error);
      }
    };
    getComplaints();
  }, []);

  const handleSearch = (value) => {
    setFiltering(true);
    setFiltered(
      complaints.filter((student) => {
        return Object.values(student)
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
        title="Complaints"
        subTitle="Student complaint list"
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
        dataSource={!filtering ? complaints : filtered}
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
