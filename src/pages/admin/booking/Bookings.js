import React, {Fragment, useEffect, useState} from 'react';
import './bookings.css'
import DataTablesComp from "../../../components/datatable/DataTableComp";
import Columns from './columns'
import PageHeader from '../../../components/header/PageHeader'
import bookingServices from '../../../services/BookingServices';
import {useSelector} from 'react-redux'
import {selectUser} from '../../../features/authentication'
import ConfirmationAlert from '../../../components/modal/ConfirmationAlert'

const Bookings = (props) => {

    const user = useSelector(selectUser)
    
    const [confirm,setConfirm] = useState(false)
    const [confirmRecordId,setConfirmRecordId] = useState("")
    const [confirmProcess,setConfirmProcess] = useState(false)
    const [loading,setLoading] = useState(false)
    const [processing,setProcessing] = useState(false)
    const [error,setError] = useState("")
    const [message,setMessage] = useState("")
    const [title,setTitle] = useState("")
    const [action,setAction] = useState("")
    const [updateTable,setUpdateTable] = useState(false)



    const [bookings,setBookings] = useState([])

      useEffect(() => {
          const getBookings = async () => {
              const bookingList = await bookingServices.getBookings(user.role,user.id);
              if(bookingList.status === 200){
                  console.log(bookingList.data.data)
                  setBookings(bookingList.data.data)
              }

          }
          getBookings()
      }, [updateTable,user.role,user.id])

    const handleConfirm = async () => {
        try {
            setConfirmProcess(true)
            let confirmResp 

            if(action === "Confirm"){
                confirmResp= await bookingServices.confirmBooking(confirmRecordId)
            }else{
                confirmResp= await bookingServices.cancelBooking(confirmRecordId)
            }
            if(confirmResp.status === 200){
                setConfirmProcess(false)
                setUpdateTable(!updateTable)
                setConfirm(!confirm)
            }

        } catch (error) {
            setConfirmProcess(false)
            setUpdateTable(!updateTable)
            setConfirm(!confirm)
            console.log(error)
        }
    }

    const handleConfirmModal = (data) => {
        setMessage("Are you sure want to confirm this booking?")
        setTitle("Confirm Booking")
        setAction("Confirm")
        setConfirmRecordId(data.id)
        setConfirm(!confirm)
    }

    const handleCancelModal = (data) => {
        setMessage("Are you sure want to cancel this booking?")
        setTitle("Cancel Booking")
        setAction("Cancel")
        setConfirmRecordId(data.id)
        setConfirm(!confirm)
    }

    
    return (
        <Fragment>
            {confirm ?
            <ConfirmationAlert title={title}>
                <p>{message}</p>
                <button className="btn__control btn-w" onClick={handleConfirm} disabled={confirmProcess}>{confirmProcess? <div className="processingloader"></div>:"Yes"}</button>
                <button className="btn__control btn-w" onClick={handleConfirmModal} disabled={confirmProcess}>No</button>
            </ConfirmationAlert>:
            null
            }
            {bookings.length > 0 ?
            <Fragment>
            <PageHeader title="Bookings" />
            <div className="table__wrap">
                <DataTablesComp
                columns={Columns}
                data={bookings}
                targets= {[0, 1, 2, 3, 4,5]}
                dateFields={[5]}
                // filterDate={filterByDate}
                showDateFilter={true}
                showConfirm={true}
                confirmBooking={handleConfirmModal}
                cancelBooking={handleCancelModal}
                />
            </div>
            </Fragment>
            : 
            <div className="loader__wrapper">
                <div className="loader"></div>
            </div>
            }
        </Fragment>
    );

};

export default Bookings;