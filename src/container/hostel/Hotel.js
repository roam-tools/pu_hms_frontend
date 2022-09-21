import { Card, Col, Row, Button, Breadcrumb, Select, Space, Spin } from 'antd'
import { UserOutlined, PhoneOutlined, LoadingOutlined } from '@ant-design/icons'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import http from '../../api'
import './hostel.css'

import { Widget } from '../../components/widget/Widget';
import { HostelManager } from '../../components/manager/HostelManager'
import { RoomList } from '../../components/rooms/RoomList'
import { HostelFacilities } from '../../components/facilities/HostelFacilities'

import placeholder from '../../assets/images/placeholder.gif'
import ProgressiveImage from 'react-progressive-graceful-image';

const { Option } = Select

let formatCurrency = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'GHS'
});

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

export const Hostel = () => {

    const { state } = useLocation()

    const [loading, setLoading] = useState(false)
    const [hostelList, setHostelList] = useState([])
    const [hostel, setHostel] = useState({})
    const [rooms, setRooms] = useState([])
    const [facilities, setFacilities] = useState([])
    const [manager, setManager] = useState({})

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const response = await http.get(`hostels/${state?.id}`, { retry: 50, retryDelay: 3000 })
                setHostel(response.data.hostel)
                setRooms(response.data.rooms)
                setFacilities(response.data.facilities)
                setManager(response.data.manager)
                setLoading(false)
            } catch (error) {

            }
        }
        getData()
    }, [state?.id])

    return (
        <Fragment>

            <div className='hostel'>
                <div className='breadcrumb-links d-none d-lg-block'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{hostel.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='d-sm-block d-md-none' style={{ height: 20 }}></div>
                <div className='hostel'>
                    <Row
                        gutter={{
                            xs: 8,
                            sm: 16,
                            md: 24,
                            lg: 32,
                        }}
                    >
                        <Col
                            xs={{
                                span: 24,
                            }}
                            lg={{
                                span: 16
                            }}
                            style={{
                                marginBottom: 15
                            }}
                        >
                            <div className='hostel-image-container'>
                                {Object.keys(hostel).length <= 0 ? (
                                    <Card
                                        style={{
                                            height: 340,
                                            width: "100%",
                                            borderRadius: 10,
                                            overflow: 'hidden'
                                        }}
                                        loading={loading}
                                    >

                                    </Card>
                                ) :
                                    <ProgressiveImage
                                        src={hostel.image}
                                        placeholder={placeholder}
                                    >
                                        {(src, loading) => <img src={src} alt="hero" className='image' height="340px" width="100%" style={{ opacity: loading ? 0.5 : 1, borderRadius: 5 }} />}
                                    </ProgressiveImage>
                                }
                            </div>
                        </Col>
                        <Col
                            xs={{
                                span: 24,
                            }}
                            lg={{
                                span: 8
                            }}
                        >
                            <div className='hostel-details'>
                                <h2 className='hostel-title'>{hostel.name}</h2>
                                <div className='pricing'>
                                    <p>Price starts at</p>
                                    {hostel.bed_price >= 0 ? <h3 style={{ margin: 0 }}> {formatCurrency.format(hostel.bed_price)}</h3> : <Spin indicator={antIcon} />}
                                    <p>per bed/semester</p>
                                </div>
                                <div className='description'>
                                    <div className='description-item'>
                                        <UserOutlined className='description-icon' />
                                        {hostel.gender ? <p> {hostel.gender}</p> : <Spin indicator={antIcon} />}
                                    </div>
                                    <div className='description-item'>
                                        <i className="bi bi-door-open description-icon"></i>
                                        {hostel.room_count ? <p> {hostel.room_count} rooms available</p> : <Spin indicator={antIcon} />}
                                    </div>
                                    <div className='description-item enquiry'>
                                        <h4 className='enquiry-text'>Quick Enquiry</h4>
                                    </div>
                                    <Button icon={<PhoneOutlined style={{ fontSize: 24 }} />} className="enquiry-phone"> <a href={"tel:" + manager.phone_number} className='contact-phone'>{manager.phone_number ? manager.phone_number : <Spin indicator={antIcon} />}</a> </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <HostelFacilities data={facilities} />

                    <Card
                        title="HOSTEL ROOMS"
                        headStyle={{
                            background: "#0A223D",
                            color: "#fff",
                        }}
                        bordered={false}
                        bodyStyle={{
                            padding: 0,
                        }}
                        style={{
                            marginTop: 15,
                            background: "transparent"
                        }}
                        extra={[
                            <div key="1" className='d-none d-lg-block'>
                                <Space className=''>
                                    <span style={{ color: "white", fontSize: 18 }}>Filter:</span>
                                    <Select showSearch style={{ width: 150 }}>
                                        <Option value="Room 3">Room 3</Option>
                                        <Option value="Room 3">Room 3</Option>
                                    </Select>
                                    <Button type='primary'>Filter</Button>
                                </Space>
                            </div>
                        ]}
                    >
                        <div className='d-lg-none d-sm-block d-md-block p-3 bg-white'>
                            <h4>Filter</h4>
                            <Select showSearch placeholder="Select room" style={{ width: '100%', display: "block", marginBottom: 15 }}>
                                <Option value="Room 3">Room 3</Option>
                                <Option value="Room 3">Room 3</Option>
                            </Select>
                            <Select showSearch placeholder="Select bed" multiple style={{ width: '100%', display: "block", marginBottom: 15 }}>
                                <Option value="Room 3">Room 3</Option>
                                <Option value="Room 3">Room 3</Option>
                            </Select>
                            <Button type='primary'>Filter</Button>
                        </div>

                        <RoomList data={rooms} loading={loading} />
                    </Card>

                </div>
            </div>

            <HostelManager manager={manager} />

            <Widget data={hostelList} />

        </Fragment>
    )
}
