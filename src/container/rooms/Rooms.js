import { Breadcrumb, Card, Col, PageHeader, Pagination, Row, Select, Space } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../../api'
import { Room } from '../../components/room/Room'
import { useSetError } from '../../context/ErrorContext'

const { Option } = Select

const pageSize = 20;

export const Rooms = () => {
    const setError = useSetError()
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])
    const [, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [minIndex, setMinIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(0)

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await http.get('rooms', { retry: 100, retryDelay: 3000 })
                console.log(response.data)
                setLoading(false)
                setRooms(response.data)
                setTotalPages(response.data.length / pageSize)
                setMinIndex(0)
                setMaxIndex(pageSize)
            } catch (error) {
                setLoading(false)
                console.log(error)
                setError(error.message)
            }
        }
        getRooms()
    }, [])


    const handleChange = (page) => {
        setCurrentPage(page)
        setMinIndex((page - 1) * pageSize)
        setMaxIndex(page * pageSize)
    };


    const handleFilter = () => { }

    return (
        <Fragment>
            <PageHeader
                title="Rooms"
                subTitle={
                    <Breadcrumb className='d-none d-sm-none d-lg-block'>
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Rooms</Breadcrumb.Item>
                    </Breadcrumb>
                }
                extra={[
                    <div className='d-none d-sm-none d-lg-block'>
                        <Space key="1">
                            <label>Filter by hostel:</label>
                            <Select defaultValue="All" style={{ width: 200 }} onChange={(value) => handleFilter(value)}>
                                <Option value="All">All</Option>
                                <Option value="Campus">Campus</Option>
                                <Option value="External">External</Option>
                            </Select>
                        </Space>
                    </div>
                ]}
                style={{
                    borderRadius: 10,
                    background: "#fff",
                    marginBottom: 15,
                    border: "1px solid #ccc"
                }}
            />
            <Card className='d-lg-none d-sm-block'>
                <label>Filter by hostel</label>
                <Select defaultValue="All" style={{ width: '100%' }} onChange={(value) => handleFilter(value)} className="m-view2">
                    <Option value="All">All</Option>
                    <Option value="Campus">Campus</Option>
                    <Option value="External">External</Option>
                </Select>
            </Card>
            {loading &&
                <Row
                    gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                    }}
                >
                    <>
                        <Col
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
                            <Card
                                style={{
                                    height: 200,
                                }}
                                bodyStyle={{}}
                                loading={loading}
                            />
                        </Col>
                        <Col
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
                            <Card
                                style={{
                                    height: 200,
                                }}
                                bodyStyle={{}}
                                loading={loading}
                            />
                        </Col>
                        <Col
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
                            <Card
                                style={{
                                    height: 200,
                                }}
                                bodyStyle={{}}
                                loading={loading}
                            />
                        </Col>
                        <Col
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
                            <Card
                                style={{
                                    height: 200,
                                }}
                                bodyStyle={{}}
                                loading={loading}
                            />
                        </Col>
                    </>
                </Row>
            }
            {
                !loading &&
                <Fragment>
                    <Row
                        gutter={{
                            xs: 8,
                            sm: 16,
                            md: 24,
                            lg: 32,
                        }}
                    >
                        {
                            rooms?.map((room, index) => (
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
                                        <Room data={room} />
                                    </Col>)
                            ))
                        }

                    </Row>
                    <Pagination
                        pageSize={pageSize}
                        current={currentPage}
                        total={rooms.length}
                        onChange={handleChange}
                        style={{
                            textAlign: "center",
                            marginTop: 40
                        }}
                    />
                </Fragment>
            }
        </Fragment>
    )
}
