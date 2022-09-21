import { Breadcrumb, Card, Col, PageHeader, Row, Select, Space } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../../api'
import { Hostel } from '../../components/hostel/Hostel'
import { useSetError } from '../../context/ErrorContext'
import './hostellist.css'

const { Option } = Select

export const HostelList = ({ pHeader=false }) => {
    const setError = useSetError()

    const [hostels, setHostels] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getHostels = async () => {
            try {
                setLoading(true)
                const response = await http.get('hostels', { retry: 50, retryDelay: 3000 })
                // console.log(response.data)
                setLoading(false)
                setHostels(response.data)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(error.message)
            }
        }

        getHostels()

    }, [setError])

    const handleFilter = (value) => { }

    return (
        <Fragment>
           {!pHeader &&
            <>
                <PageHeader
                    title="Hostels"
                    subTitle={
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Hostels</Breadcrumb.Item>
                        </Breadcrumb>
                    }
                    extra={[
                        <div key="1" className='d-none d-sm-none d-lg-block'>
                            <Space>
                                <label>Filter by location:</label>
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
                    <label>Filter by location</label>
                    <Select defaultValue="All" style={{ width: '100%' }} onChange={(value) => handleFilter(value)} className="m-view2">
                        <Option value="All">All</Option>
                        <Option value="Campus">Campus</Option>
                        <Option value="External">External</Option>
                    </Select>
                </Card>
            </>}

            {pHeader &&
            <Card style={{textAlign:"center", fontSize:34, background:"transparent"}}>
                FEATURED
            </Card>}

            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                {hostels.length <= 0 &&
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
                }
                {hostels.length > 0
                    && hostels.map((hlist, index) => (
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
                            <Hostel id={hlist.id} loading={loading} name={hlist.name} location={hlist.location} hostelImage={hlist.image} />
                        </Col>
                    ))

                }
            </Row>
        </Fragment>
    )
}
