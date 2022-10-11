import React, { Fragment, useEffect, useState } from 'react'
// import './home.css'
import { Hero } from '../../components/Hero/Hero';
import { Widget } from '../../components/widget/Widget'
import { HostelList } from '../hostel/HostelList';


export const Home = () => {

  return (
    <Fragment>
      <Hero />
      <div className='container'>
        <HostelList pHeader={true} />
        <Widget />
      </div>
    </Fragment>
  )
}
