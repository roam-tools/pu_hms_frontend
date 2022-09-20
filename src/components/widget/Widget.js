import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { Card } from 'antd'
import { Hostel } from '../hostel/Hostel';
import http from '../../api';
import { useSetError } from '../../context/ErrorContext';


const settings2 = {
  className: "slider variable-width",
  centerMode: true,
  lazyLoad: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        arrows: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }
  ]
};

export const Widget = () => {

  const setError = useSetError()

  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([])

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true)
        const response = await http.get('hostels', { retry: 50, retryDelay: 3000 })
        setLoading(false)
        setData(response.data)
      } catch (error) {
        setLoading(false)
        console.log(error)
        setError(error.message)
      }
    }
    getProfile()
  }, [setError])

  return (
    <div
      style={{
        padding: '20px 0',
        background: '#eee'
      }}
    >
      <div className='container'>
        <h3 style={{ padding: '20px 0', margin: 0, textAlign: 'center' }}>OTHER HOSTELS</h3>
        {data.length <= 0 &&
          <Slider {...settings2}>
            <div>
              <Card
                style={{
                  height: 200,
                }}
                bodyStyle={{}}
                loading={loading}
              />
            </div>
            <div>
              <Card
                style={{
                  height: 200,
                }}
                bodyStyle={{}}
                loading={loading}
              />
            </div>
            <div>
              <Card
                style={{
                  height: 200,
                }}
                bodyStyle={{}}
                loading={loading}
              />
            </div>
            <div>
              <Card
                style={{
                  height: 200,
                }}
                bodyStyle={{}}
                loading={loading}
              />
            </div>
          </Slider>
        }
        {data.length > 0 &&
          <Slider {...settings2}>
            {data.map((hlist, index) => (
              <Hostel id={hlist.id} key={index} loading={loading} name={hlist.name} location={hlist.location} hostelImage={hlist.image} />
            ))}
          </Slider>
        }
      </div>
    </div>
  )
}
