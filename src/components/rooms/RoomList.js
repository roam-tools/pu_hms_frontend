import { Card, Col, Pagination, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Room } from '../room/Room'

const pageSize = 2;

export const RoomList = ({ data, loading = false }) => {

    const [pagination, setPagination] = useState({
        roomList: [],
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    })

    useEffect(() => {
        setPagination({
            roomList: data,
            totalPage: data.length / pageSize,
            minIndex: 0,
            maxIndex: pageSize
        })
    }, [data])


    const handleChange = (page) => {
        setPagination({...pagination,...{
                    current: page,
                    minIndex: (page - 1) * pageSize,
                    maxIndex: page * pageSize
                }
        })
    }


    return (
        <div className='mt-3'>
            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                {(pagination.roomList.length <= 0) &&
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
                {(pagination.roomList.length > 0)
                    && (data.map((rlist, index) => (
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
                            <Room data={rlist} />
                        </Col>
                    )))

                }
            </Row>
        </div>
    )
}
