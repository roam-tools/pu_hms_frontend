import { Button, Modal, Row, Col, Space, Radio } from 'antd'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import http from '../../api';
import { useSetError } from '../../context/ErrorContext';
import { selectStudent } from '../../features/auth';
import './room.css'

let formatCurrency = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'GHS'
});

const onChecked = () => { }

export const Room = ({ data }) => {
    const navigate = useNavigate()
    const auth = useSelector(selectStudent)

    const setError = useSetError()

    const [booking, setBooking] = useState(false)
    const [room, setRoom] = useState({})
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [ bookingDetails, setBookingDetails ] = useState({})

    const [ value, setValue ] = useState(0)

    const getRoomDetails = async (id) => {
        if (!auth) {
            navigate('/student/auth/login')
        }
        try {
            setLoading(true)
            const response = await http.get(`rooms/${id}`, { retry: 5, retryDelay: 3000 })
            console.log(response.data)
            setLoading(false)
            setRoom(response.data)
            setBooking(true)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error.message)
        }
    }

    const bookRoom = async (values) => {
        try {
            setLoading1(true)
            const response = await http.post('booking/book', values)
            console.log(response.data)
            setLoading1(false)

        } catch (error) {
            console.log(error)
            setLoading1(false)
            setBooking(false)
            setError(error.message)
        }
    }

    return (
        <Fragment>
            <div className='room'>
                <h3 className='title'>{data.room_id}</h3>
                <div className='room-detail'>
                    <div className='room-detail-item-group'>
                        <div className='room-detail-item'>
                            <i className="bi bi-person"></i>
                            <p>{data.gender}</p>
                        </div>
                        <div className='room-detail-item'>
                            <i className="fa fa-bed"></i>
                            <p>{data.remaining} / {data.capacity}</p>
                        </div>
                        <div className='room-detail-item'>
                            <div className='room-detail-item-pricing'>
                                <p>Price per bed/semester</p>
                                <h3>{formatCurrency.format(data.bed_price)}</h3>
                            </div>
                        </div>
                        <Button loading={loading} onClick={() => getRoomDetails(data.id)} type='danger' className='view-btn' disabled={data.remaining === 0}> BOOK YOUR PLACE</Button>
                    </div>
                </div>
            </div>
            {/* Booking modal */}
            <Modal
                title=""
                visible={booking}
                closable={false}
                width={400}
                centered
                bodyStyle={{
                    padding: 0
                }}
                footer={[
                    <div style={{ textAlign: "center" }}>
                        <Space size="large">
                            <Button onClick={() => bookRoom(bookingDetails)} loading={loading1} style={{ height: 50, width: 150, borderRadius: 10, background: "#0A223D", color: "white" }} size='large'>BOOK NOW</Button>
                            <Button onClick={() => setBooking(false)} style={{ height: 50, width: 150, borderRadius: 10 }} size='large'>CANCEL</Button>
                        </Space>
                    </div>
                ]}
            >
                <Row>
                    <Col span={24} style={{ background: "#0A223D", borderRadius: 10, padding: "20px 20px 30px 20px" }}>
                        <Row>
                            <Col span={12} style={{ color: "white" }}>
                                <h3 style={{ color: "white" }}>{room.room?.room_id}</h3>
                                <p>Hostel Name</p>
                                <Button icon={<i className='fa fa-phone'></i>}>0500144870</Button>
                            </Col>
                            <Col span={12} style={{ color: "#fff", display: "flex", flexDirection: "column" }}>
                                <Space size="large" style={{ marginTop: 40 }}>
                                    <i className='fa fa-user'></i>
                                    <span>{room.room?.capacity} in a room</span>
                                </Space>
                                <Space size="large">
                                    <i className='fa fa-house'></i>
                                    <span>{room.room?.remaining} available</span>
                                </Space>
                                <Space size="large">
                                    <i className='fa fa-star'></i>
                                    <span>{formatCurrency.format(room.room?.bed_price)}</span>
                                </Space>
                            </Col>
                        </Row>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: 20, color: "white" }}>
                            <p>Select your prefered bed to book</p>
                            {
                                room.beds?.map((bed, index) => (
                                    <div key={index} style={{width:"90%", display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom: 10 }}>
                                        <div style={{alignSelf:"center"}}>
                                            <i className='fa fa-bed'></i>
                                        </div>
                                        <div style={{alignSelf:"center"}}>
                                            <span>{bed.bed_id}</span>
                                        </div>
                                        <div style={{alignSelf:"center"}}>
                                            <span>{bed.bed_type}</span>
                                        </div>
                                        <div style={{alignSelf:"center"}}>
                                            <Radio.Group onChange={(e)=>{
                                                setValue(e.target.value)
                                                setBookingDetails({hostel:room.room?.hostel,room:room.room?.id, bed:bed.id})
                                            }} value={value}>
                                            {
                                                !bed.is_available ?
                                                <Radio value={bed.id} checked={!bed.is_available} disabled={!bed.is_available}/>:
                                                <Radio value={bed.id} />
                                            }
                                            </Radio.Group>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                    <Col span={24} style={{ minHeight: 70 }}>
                        {/* facilities */}
                    </Col>
                </Row>
            </Modal>

            {/* <Button onClick={callProfile}>calllllll</Button> */}
        </Fragment>
    )
}
