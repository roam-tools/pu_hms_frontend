import { Card } from 'antd'
import React from 'react'
import './facilities.css'

export const HostelFacilities = ({data}) => {
  return (
    <Card
    title="HOSTEL FACILITIES"
    headStyle={{
        background: "#0A223D",
        color: "#fff"
    }}
>
    <div>
        <ul className='facilities'>
            {
                data.map((fc,index)=>(

                    <li className='facility-list' key={index}><i className="bi bi-check2-square"> </i>{fc}</li>
                ))
            }
        </ul>
    </div>
</Card>
  )
}
