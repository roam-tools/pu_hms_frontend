import React, { Fragment, useEffect, useState } from 'react'
import http from '../api'
import { Footer } from '../components/footer/Footer'
import { Hero } from '../components/hero/Hero'
import { HostelLIst } from '../components/hostels/HostelLIst'
import Spinner from '../components/spinner/Spinner'

export const Home = () => {
  const [loading, setLoading] = useState(false)
  const [hostels, setHostels] = useState([])

  useEffect(() => {
    const getHostels = async () => {
      setLoading(true)
      try {
        const response = await http.get('hostels', { retry: 100, retryDelay: 3000 })
        console.log(response.data)
        setHostels(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getHostels()
  }, [])

  return (
    <Fragment>
      {
        loading ? (
          <Spinner />
        ):(
          <>
            <Hero />
            <HostelLIst hostels={hostels} />
            <Footer />
          </>
        )
      }
    </Fragment>
  )
}
