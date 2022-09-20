import { Avatar, Input, PageHeader, Space, Table, Tag } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../api';

const { Search } = Input

const columns = [
    {
        title: 'Photo',
        dataIndex: 'image',
        key: 'image',
        render: (_, record) => <div>{<Avatar src={record.image} />}</div>,
        align:"center"
    },
    {
        title: 'Student Id',
        dataIndex: 'student_id',
        key: 'student_id',
    },
    {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => <div>{record.first_name +" "+ record.last_name}</div>,
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone_number',
        key: 'phone_number',
    },
    {
        title: 'Email Address',
        dataIndex: 'email_address',
        key: 'email_address',
    },
    {
        title: 'Last Login',
        dataIndex: 'last_login',
        key: 'last_login',
        render:(text)=><div>{text ? moment(text).format("DD-MM-YYYY hh-mm-s a") : "Never"}</div>
    },
];

export const Students = () => {

    const [ filtering, setFiltering ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ students, setStudents ] = useState([])
    const [ filtered, setFiltered ] = useState([])

    useEffect(()=>{
        const getStudents = async () =>{
            try {
                const response = await http.get('admin/hostel/students', { retry:100, retryDelay: 3000 })
                setLoading(false)
                console.log(response.data.students)
                setStudents(response.data.students)
            } catch (error) {
                console.log(error)                
            }
        }
        getStudents()
    },[])

    const handleSearch = (value) =>{
        setFiltering(true)
        setFiltered(students.filter(student=>{
            return Object.values(student).toString().toLowerCase().includes(value.toString().toLowerCase())
        }))

        if(!value){
            setFiltering(false)
        }
    }

    return (
        <Fragment>
            <PageHeader
                title="Students"
                subTitle="Student list"
                extra={[
                    <Space key="1">
                        <Search placeholder="Search" onChange={(e)=>handleSearch(e.target.value)} />
                    </Space>
                ]}
                style={{
                    background: "white",
                    marginBottom: 15,
                    border: "1px solid #ccc"
                }}
            />
            <Table
                columns={columns}
                dataSource={!filtering ? students : filtered}
                rowKey="id"
                loading={loading}
                bordered
                pagination={{ pageSize: 50, hideOnSinglePage: true, position: ['bottomCenter'] }}
            />
        </Fragment>
    )
}
