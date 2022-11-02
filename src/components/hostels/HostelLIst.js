import React from 'react'
import { Hostel } from '../hostel/Hostel'
import './hostels.css'

export const HostelLIst = ({ hostels, title }) => {
  return (
    <div className='container p-0'>
      <h1 className='intro-y puc-hostels-header'>{title || "Featured"}</h1>
      <div className='puc-hostels'>
        {
          hostels?.map((hostel, index) => (
            <Hostel key={index} hostel={hostel} />
          ))
        }
      </div>
    </div>
  )
}
