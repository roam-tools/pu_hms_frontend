import { Input, PageHeader, Space, Table } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import http from "../../api2";

const { Search } = Input;

const columns = [
  {
    title: "Hostel",
    dataIndex: "hostel",
    key: "hostel",
    align: "center",
  },
  {
    title: "Room",
    dataIndex: "room",
    key: "room",
    align: "center",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    align: "center",
  },
  {
    title: "Manager",
    dataIndex: "manager",
    key: "manager",
    align: "center",
  },
  {
    title: "Student",
    dataIndex: "student",
    key: "student",
    align: "center",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (text) => <div>{moment(text).format("DD-MM-YYYY hh:mm:s a")}</div>,
  },
];

export const KeyLogs = () => {
  const [filtering, setFiltering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [keyLogs, setKeyLogs] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await http.get("key/logs", {
          retry: 100,
          retryDelay: 3000,
        });
        setLoading(false);
        console.log(response.data.keylogs);
        setKeyLogs(response.data.keylogs);
      } catch (error) {
        console.log(error);
      }
    };
    getStudents();
  }, []);

  const handleSearch = (value) => {
    setFiltering(true);
    setFiltered(
      keyLogs.filter((room) => {
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
        title="Key Logs"
        subTitle="Key log list"
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
        dataSource={!filtering ? keyLogs : filtered}
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
