import React, {Fragment, useEffect, useState} from 'react';
import './rooms.css'
import DataTablesComp from "../../../components/datatable/DataTableComp";
// import data from '../../../data'
import Columns from './columns'
import PageHeader from '../../../components/header/PageHeader'
import Modal from '../../../components/modal/modal'
import roomServices from '../../../services/RoomServices'
import hostelService from '../../../services/HotelServices'
import {useSelector} from 'react-redux'
import {selectUser} from '../../../features/authentication'


const Rooms = (props) => {

    const user = useSelector(selectUser)

    const [showModal,setShowModal] = useState(false)
    const [hostels,setHostels] = useState([])
    const [rooms,setRooms] = useState([])
    const [updateTable,setUpdateTable] = useState({})
    const [newRoom,setNewRoom] = useState({
        name: "",
        description: "",
        location: "",
        gender: "",
        address: "",
        email: "",
        telephone: "",
        facilities: "",
        startPrice: 0
      })

      useEffect(() => {
        const getHostelList = async () => {
            const hostels = await hostelService.getHostels();
            if(hostels.status === 200){
                console.log(hostels.data.data)
                setHostels(hostels.data.data)
            }

        }
        getHostelList()
    }, [updateTable])

      useEffect(() => {
          const getRoomList = async () => {
              const rooms = await roomServices.getAllRooms(user.role,user.hostel_id);
              if(rooms.status === 200){
                  console.log(rooms.data.data)
                  setRooms(rooms.data.data)
              }

          }
          getRoomList()
      }, [updateTable,user.role,user.hostel_id])

    const handleModal = () => {
        setShowModal(!showModal)
    }


    const deleteRow = (data) => {

    }

    const goEdit = (data) => {
        setNewRoom(data)
        setShowModal(!showModal)
    }

    const handleInputChange = (e) => {
        let val = e.target.value;
        let key = e.target.name
        setNewRoom(prev=>{
            return{
                ...prev,[key]:val
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newCreatedRoom = await roomServices.createRoom(newRoom)
            console.log(newCreatedRoom)
            if(newCreatedRoom.status === 200){
                setNewRoom({
                    hostel_id: 0,
                    room_id: "",
                    capacity: "",
                    gender: "",
                    description: "",
                    facilities: "",
                    tags: "",
                    available: 0,
                    bed_price: 0
                  })
                  setUpdateTable({})
            }else{
                console.log(newCreatedRoom)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Fragment>
            {showModal?
            <Modal closeModal={handleModal} title="Add Room">
                <form onSubmit={handleSubmit}>
                    <div className="form__floating">
                        <select name="hostel_id" className="input__control" onChange={handleInputChange} value={newRoom.hostel_id} required>
                            {
                                hostels?.map((hotel,index)=>{
                                    return <option key ={index} value={hotel.id}>{hotel.name}</option>
                                })
                            }
                        </select>
                        <label htmlFor='hostel_id' className="input__label">Select Hostel</label>
                    </div>

                    <div className="form__floating">
                        <input type="text" name="room_id" className="input__control" onChange={handleInputChange} value={newRoom.roomId} required/>
                        <label htmlFor='room_id' className="input__label">Room Number</label>
                    </div>

                    <div className="form__floating div__row">
                        <div className="form__floating row__column">
                            <select name="capacity" className="input__control" onChange={handleInputChange} value={newRoom.capacity} required>
                                <option value="One">One</option>
                                <option value="Two">Two</option>
                                <option value="Three">Three</option>
                                <option value="Four">Four</option>
                                <option value="Five">Five</option>
                                <option value="Six">Six</option>
                                <option value="Seven">Seven</option>
                                <option value="Eight">Eight</option>
                            </select>
                            <label htmlFor='capacity' className="input__label">Capacity</label>
                        </div>
                        <div className="form__floating row__column">
                            <select name="gender" className="input__control" onChange={handleInputChange} value={newRoom.gender} required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                            <label htmlFor='gender' className="input__label">Gender</label>
                        </div>
                    </div>

                    <div className="form__floating">
                        <input type="text" name="description" className="input__control" onChange={handleInputChange} value={newRoom.description} required/>
                        <label htmlFor='description' className="input__label">Description</label>
                    </div>

                    <div className="form__floating">
                        <input type="text" name="facilities" className="input__control" onChange={handleInputChange} value={newRoom.facilities} required/>
                        <label htmlFor='facilities' className="input__label">Facilities</label>
                    </div>

                    <div className="form__floating div__row">
                        <div className="form__floating row__column">
                            <input type="number" name="available" className="input__control" onChange={handleInputChange} value={newRoom.available} required/>
                            <label htmlFor='available' className="input__label">Available</label>
                        </div>

                        <div className="form__floating row__column">
                            <input type="number" name="bedPrice" className="input__control" onChange={handleInputChange} value={newRoom.bedPrice} required/>
                            <label htmlFor='bedPrice' className="input__label">Bed Price</label>
                        </div>
                    </div>

                    <div className="action__wrapper">
                        <button type="submit" className="btn__control">Save</button>
                    </div>
                </form>
            </Modal> 
            : null}
            {rooms.length > 0 ?
            <Fragment>
            <PageHeader title="Rooms" onClick={handleModal} text="Add Room"/>
            <div className="table__wrap">
                <DataTablesComp
                columns={Columns}
                data={rooms}
                deleteRow={deleteRow}
                targets= {[0, 1, 2, 3, 4,5]}
                handleModal={goEdit}
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
            : <div className="loader__wrapper"><div className="loader"></div></div>}
        </Fragment>
    );

};

export default Rooms;