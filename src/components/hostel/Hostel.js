import React, { Fragment } from 'react'
import './hostel.css'
import placeholder from '../../assets/images/placeholder.gif'
import ProgressiveImage from 'react-progressive-graceful-image';
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom';

export const Hostel = ({ id, loading, name, location, hostelImage }) => {
    const navigate = useNavigate()

    return (
        <Fragment>
            <Card
                onClick={() => navigate(`/hostel/${name}`, { state: { id } })}
                hoverable
                style={{
                    height: 200,
                    borderRadius: 10,
                    overflow: "hidden"
                }}
                bodyStyle={{
                    padding: 0
                }}
                loading={loading}
                className="hostel"
            >
                <ProgressiveImage
                    src={hostelImage}
                    placeholder={placeholder}
                >
                    {(src, loading) => <img src={src} alt="hero" className='hostel-image' height="200px" width="100%" style={{ opacity: loading ? 0.5 : 1, borderRadius: 5 }} />}
                </ProgressiveImage>
                <div className='overlay'></div>
                <div className='hostel-info'>
                    <p className='hostel-name'>{name}</p>
                    <p className='hostel-location'>{location}</p>
                </div>
            </Card>
        </Fragment>
    )
}
