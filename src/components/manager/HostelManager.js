import React, { Fragment } from 'react'
import { Avatar, Card } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './manager.css'

export const HostelManager = ({ manager }) => {
    return (
        <div className='hostel-manager-profile'>
            {
                Object.keys(manager).length <= 0 && (
                    <Card
                        style={{
                            height: 200,
                            width: 400
                        }}
                        bodyStyle={{}}
                        loading={true}
                    />
                )
            }
            {
                Object.keys(manager).length > 0 && (
                    <Fragment>
                        <h3 style={{ margin: "0 0 24px 0" }}>HOSTEL MANAGER</h3>
                        <Avatar src={manager?.image} size={80} icon={<UserOutlined />} />
                        <h4 style={{ margin: 0, textTransform: "uppercase" }}>{manager?.first_name} {manager?.last_name}</h4>
                        <p>{manager?.email_address}</p>
                    </Fragment>
                )
            }
        </div>
    )
}
