import React, {Fragment, useEffect, useState} from 'react';
import './bookings.css'
import DataTablesComp from "../../../components/datatable/DataTableComp";
import Columns from './columns'
import PageHeader from '../../../components/header/PageHeader'
import bookingServices from '../../../services/BookingServices';
import {useSelector} from 'react-redux'
import {selectUser} from '../../../features/authentication'

const Bookings = (props) => {

    const user = useSelector(selectUser)
    
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
      }, [])


    const deleteRow = () => {

    }

    const gotoEdit = (data) => {
        
    }

    
    return (
        <Fragment>
            {bookings.length > 0 ?
            <Fragment>
            <PageHeader title="Bookings" />
            <div className="table__wrap">
                <DataTablesComp
                columns={Columns}
                data={bookings}
                deleteRow={deleteRow}
                handleModal={gotoEdit}
                targets= {[0, 1, 2, 3, 4,5]}
                // actions={(data, type, row, meta) => {
                //     return `
                //     <i class="fa fa-pen fa-sm" style="cursor:pointer"></i>
                //     <span style="padding-right:5px;"></span>
                //     <i class="fa fa-trash fa-sm" style="cursor:pointer;color:red"></i>
                //     <span style="padding-right:5px;"></span>
                //     <i class="fa fa-ban fa-sm" style="cursor:pointer"></i>`;
                //     }}
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