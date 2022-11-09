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
    render: (_, record) => <div>{<Avatar src={record.image} />}</div>,
    align: "center",
  },
  {
    title: "Student Id",
    dataIndex: "student_id",
    key: "student_id",
    sorter: (a, b) => a.student_id.length - b.student_id.length,
    sortDirections: ["descend"],
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    sorter: (a, b) => a.first_name.length - b.first_name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    sorter: (a, b) => a.last_name.length - b.last_name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
    sorter: (a, b) => a.phone_number.length - b.phone_number.length,
    sortDirections: ["descend"],
  },
  {
    title: "Email Address",
    dataIndex: "email_address",
    key: "email_address",
    sorter: (a, b) => a.email_address.length - b.email_address.length,
    sortDirections: ["descend"],
  },
  {
    title: "Last Login",
    dataIndex: "last_login",
    key: "last_login",
    render: (text) => (
      <div>{text ? moment(text).format("DD-MM-YYYY hh-mm-s a") : "Never"}</div>
    ),
    sorter: (a, b) => a.last_login.length - b.last_login.length,
    sortDirections: ["descend"],
  },
  {
    title: "Actions",
    render: (_, record) => (
      <Space size="large">
        <Button icon={<i className="fa fa-envelope"></i>}></Button>
        <Button icon={<i className="fa fa-sms"></i>}></Button>
      </Space>
    ),
  },
];

export const Students = () => {
  const [filtering, setFiltering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await http.get("admin/hostel/students", {
          retry: 100,
          retryDelay: 3000,
        });
        setLoading(false);
        setStudents(response.data.students);
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, []);

  const handleSearch = (value) => {
    setFiltering(true);
    setFiltered(
      students.filter((student) => {
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
        title="Students"
        subTitle="Student list"
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
        dataSource={!filtering ? students : filtered}
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
