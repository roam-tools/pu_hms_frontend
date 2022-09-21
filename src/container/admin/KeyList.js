import { Avatar, Button, Calendar, Card, Col, Input, Modal, PageHeader, Radio, Row, Space, Pagination } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons'
import http from '../../api';
import moment from 'moment';
import { useSetError } from '../../context/ErrorContext';

const { Search } = Input

const pageSize = 20


// const columns = [
//     {
//         title: 'Room',
//         dataIndex: 'room_id',
//         key: 'room_id',
//         align: "center"
//     },
//     {
//         title: 'Students',
//         key: 'students',
//         dataIndex: 'students',
//         render: (_, record) => (
//             <>
//                 {record.students.map((student, index) => {
//                     return (
//                         <Tag key={index}>
//                             {student.first_name + " " + student.last_name}
//                         </Tag>
//                     );
//                 })}
//             </>
//         ),
//     },
//     {
//         title: 'Last Event',
//         dataIndex: 'student_of_event',
//         key: 'student_of_event',
//         align: "center"
//     },
//     {
//         title: 'Status',
//         dataIndex: 'event',
//         key: 'event',
//         align: "center"
//     },
// ];

export const KeyList = () => {

    const setError = useSetError()

    const [fetch, setFetch] = useState(false)
    const [visible, setVisible] = useState(false)
    const [filtering, setFiltering] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(false)
    const [roomKeys, setRoomKeys] = useState([])
    const [room, setRoom] = useState({})
    const [filtered, setFiltered] = useState([])
    const [student, setStudent] = useState("")

    const [, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [minIndex, setMinIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(0)

    useEffect(() => {
        const getStudents = async () => {
            try {
                const response = await http.get('key/rooms-state', { retry: 100, retryDelay: 3000 })
                setLoading(false)
                // console.log(response.data)
                setRoomKeys(response.data.rooms)
                setTotalPages(response.data.length / pageSize)
                setMinIndex(0)
                setMaxIndex(pageSize)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        getStudents()
    }, [fetch])

    const handleSearch = (value) => {
        setFiltering(true)
        setFiltered(roomKeys.filter(room => {
            return Object.values(room).toString().toLowerCase().includes(value.toString().toLowerCase())
        }))
        if (!value) {
            setFiltering(false)
        }
    }

    const handleChange = (page) => {
        setCurrentPage(page)
        setMinIndex((page - 1) * pageSize)
        setMaxIndex(page * pageSize)
    };


    const handleStudentCheck = (value) =>{
        setStudent(value)
    }


    const handleRoomStatusChange = async () =>{
        const state = room.event.toString().toLowerCase() === "opened" ? "CLOSED" :"OPENED";
        try {
            setLoading2(true)
            await http.post('key/room-state',{room:room.id,state,student})
            setLoading2(false)
            setFetch(!fetch)
            setVisible(false)
            setStudent("")
            setRoom({})
        } catch (error) {
            console.log(error)
            setLoading2(false)
            setRoom({})
            setStudent("")
            setVisible(false)
            setError(error.message)
        }
    }

    return (
        <Fragment>
            <PageHeader
                title="Keys Management"
                extra={[
                    <Space key="1">
                        <label>Search key:</label>
                        <Search placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
                    </Space>
                ]}
                style={{
                    background: "white",
                    marginBottom: 15,
                    border: "1px solid #ccc"
                }}
            />

            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                }}
            >
                {!filtering && 
                roomKeys.map((room, index) => (
                    index >= minIndex &&
                    index < maxIndex && (
                    <Col
                        key={index}
                        xs={{
                            span: 24,
                        }}
                        sm={{
                            span: 24,
                        }}
                        lg={{
                            span: 6
                        }}
                    >
                        <Card onClick={()=>{
                            console.log(room)
                            setRoom(room)
                            setVisible(true)
                        }} bordered style={{ height: 150, marginBottom: 15, cursor: "pointer", background: room.event.toLowerCase() === 'opened' ? "#3EFF74" : "#FFD0D0" }}>
                            <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                                <h5>{room.room_id}</h5>
                                <h6 style={{ margin: "0 0 10px 0" }}>{room.event}</h6>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", marginTop: 15 }}>
                                <div style={{ display: "flex", flexDirection: "row" }}><UserOutlined style={{ alignSelf: "center", marginRight: 10 }} /> <span style={{ alignSelf: "center" }}>{room.student_of_event}</span></div>
                                <div style={{ display: "flex", flexDirection: "row" }}><CalendarOutlined style={{ alignSelf: "center", marginRight: 10 }} /> <span style={{ alignSelf: "center" }}>{moment(room.time_of_event).format("DD-MM-YYYY hh:mm:s a")}</span></div>
                            </div>
                        </Card>
                    </Col>
                    )
                ))
                }

                {filtering && 
                filtered.map((room, index) => (
                    index >= minIndex &&
                    index < maxIndex && (
                    <Col
                        key={index}
                        xs={{
                            span: 24,
                        }}
                        sm={{
                            span: 24,
                        }}
                        lg={{
                            span: 6
                        }}
                    >
                        <Card onClick={()=>{
                            console.log(room)
                            setRoom(room)
                            setVisible(true)
                        }} bordered style={{ height: 150, marginBottom: 15, cursor: "pointer", background: room.event.toLowerCase() === 'opened' ? "#3EFF74" : "#FFD0D0" }}>
                            <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                                <h5>{room.room_id}</h5>
                                <h6 style={{ margin: "0 0 10px 0" }}>{room.event}</h6>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", marginTop: 15 }}>
                                <div style={{ display: "flex", flexDirection: "row" }}><UserOutlined style={{ alignSelf: "center", marginRight: 10 }} /> <span style={{ alignSelf: "center" }}>{room.student_of_event}</span></div>
                                <div style={{ display: "flex", flexDirection: "row" }}><CalendarOutlined style={{ alignSelf: "center", marginRight: 10 }} /> <span style={{ alignSelf: "center" }}>{moment(room.time_of_event).format("DD-MM-YYYY hh:mm:s a")}</span></div>
                            </div>
                        </Card>
                    </Col>
                    )
                ))
                }
            </Row>

            <Pagination
                pageSize={pageSize}
                current={currentPage}
                total={roomKeys.length}
                onChange={handleChange}
                hideOnSinglePage={true}
                style={{
                    textAlign: "center",
                    marginTop: 40
                }}
            />

            <Modal
                title=""
                visible={visible}
                closable={false}
                bodyStyle={{
                    minHeight: 350,
                }}
                width={400}
                footer={
                    <div style={{textAlign:"center"}}>
                        <Space>
                            <Button loading={loading2} onClick={handleRoomStatusChange} size='large' type='primary' ghost style={{width:120, fontWeight:"bold"}} disabled={!student}>SAVE</Button>
                            <Button size='large' type='danger' style={{width:120, fontWeight:"bold"}} onClick={()=>{
                                setRoom({})
                                setStudent("")
                                setVisible(false)
                            }}>CANCEL</Button>
                        </Space>
                    </div>
                }
            >
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <h6>Safo Hall</h6>
                    <h4>{room?.room_id}</h4>
                </div>
                <p> Changing status to</p>
                <div style={{ width: "100%", background: room?.event?.toLowerCase() === 'opened' ? "#FFD0D0" : "#3EFF74", borderRadius: 10, height: 70, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 24, fontWeight:"bolder" }}>
                    <div>
                        {room?.event === "OPENED" ? "CLOSED" : "OPENED"}
                    </div>
                </div>
                <ul style={{listStyle:"none", padding:0, marginTop:10}}>
                    <li style={{padding:"10px 0", fontWeight:"bold"}}>This key request is been made by:</li>
                    <Radio.Group onChange={(e)=>handleStudentCheck(e.target.value)} value={student}>
                    {
                        room?.students?.map((student, index)=>(
                            <li key={index} style={{padding:"7px 0"}}><Radio value={student.id}>{student.first_name +" "+ student.last_name}</Radio></li>
                        ))
                    }
                    </Radio.Group>
                </ul>
            </Modal>
        </Fragment>
    )
}
