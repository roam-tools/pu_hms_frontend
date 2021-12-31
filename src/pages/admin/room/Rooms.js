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
import ConfirmationAlert from '../../../components/modal/ConfirmationAlert'


const Rooms = (props) => {

    const user = useSelector(selectUser)

    const [confirmDelete,setConfirmDelete] = useState(false)
    const [deleteRecordId,setDeleteRecordId] = useState("")
    const [deleteProcess,setDeleteProcess] = useState(false)
    const [action,setAction] = useState("")
    const [loading,setLoading] = useState(false)
    const [processing,setProcessing] = useState(false)
    const [error,setError] = useState("")

    const [showModal,setShowModal] = useState(false)
    const [hostels,setHostels] = useState([])
    const [rooms,setRooms] = useState([])
    const [updateTable,setUpdateTable] = useState(false)
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
            try {
                const hostels = await hostelService.getHostels();
                if(hostels.status === 200){
                    setHostels(hostels.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getHostelList()
    }, [updateTable])

      useEffect(() => {

          const getRoomList = async () => {
            let endSession
            try {
                setLoading(true)
                endSession = setTimeout(() => {
                    setLoading(false)
                }, 10000);
                const rooms = await roomServices.getAllRooms(user.role,user.hostel_id);
                if(rooms.status === 200){
                    clearTimeout(endSession)
                    setRooms(rooms.data.data)
                    setLoading(false)
                }
                
            } catch (error) {
                clearTimeout(endSession)    
                setLoading(false)
                console.log(error)      
            }

          }
          getRoomList()
      }, [updateTable,user.role,user.hostel_id])

    const handleModal = () => {
        setAction("Add")
        setNewRoom({
            hostel_id: "",
            room_id: "",
            capacity: "",
            gender: "",
            description: "",
            facilities: "",
            tags: "",
            available: "",
            bed_price: ""
            })
        setShowModal(!showModal)
    }

    const handleDeleteModal = () => {
        setConfirmDelete(!confirmDelete)
    }

    const deleteRow = (data) => {
        console.log(data)
        handleDeleteModal()
        setDeleteRecordId(data.id)
    }

    const handleConfirmDelete = async () => {
        try {
            setDeleteProcess(true)
            const deleteRecord = await roomServices.deleteRoom(deleteRecordId)
            if(deleteRecord.status === 200){
                setDeleteProcess(false)
                setUpdateTable(!updateTable)
                handleDeleteModal()
            }

        } catch (error) {
            setDeleteProcess(false)
            setUpdateTable(!updateTable)
            handleDeleteModal()
            console.log(error)
        }
    }

    const goEdit = (data) => {
        console.log(data)
        setAction("Edit")

        let roomToUpdate = {}
        roomToUpdate.hostel_id = data.hostel.id;
        roomToUpdate.id = data.id;
        roomToUpdate.room_id = data.roomId;
        roomToUpdate.capacity = data.capacity;
        roomToUpdate.gender = data.gender;
        roomToUpdate.description = data.description;
        roomToUpdate.facilities = data.facilities;
        roomToUpdate.tags = data.tags;
        roomToUpdate.available = data.available;
        roomToUpdate.bed_price = data.bedPrice;

        setNewRoom(roomToUpdate);
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
            let newCreatedRoom 
            if(action === "Add"){
                newCreatedRoom = await roomServices.createRoom(newRoom)
            }else{
                newCreatedRoom = await roomServices.updateRoom(newRoom,newRoom.id)
            }
            if(newCreatedRoom.status === 200){
                setNewRoom({
                    hostel_id: "",
                    room_id: "",
                    capacity: "",
                    gender: "",
                    description: "",
                    facilities: "",
                    tags: "",
                    available: "",
                    bed_price: ""
                  })
                  setUpdateTable(!updateTable)
                  setError(newCreatedRoom.data.message)
                    setProcessing(false)
                    setError("")
                    if(action === "Edit"){
                        setShowModal(!showModal)
                    }
            }

        } catch (error) {
            setError(error.response.data.error)
            setProcessing(false)
            setTimeout(() => {
                setError("")
            }, 5000);
            console.log(error.response.data.error)
        }
    }
    
    return (
        <Fragment>
            {confirmDelete ?
            <ConfirmationAlert title="Confirm Delete">
                <p>Are you sure you delete this record?</p>
                <button className="btn__control btn-w" onClick={handleConfirmDelete} disabled={deleteProcess}>{deleteProcess? <div className="processingloader"></div>:"Yes, delete"}</button>
                <button className="btn__control btn-w" onClick={handleDeleteModal} disabled={deleteProcess}>No</button>
            </ConfirmationAlert>:
            null
            }
            {showModal?
            <Modal closeModal={handleModal} title="Add Room">
                <form onSubmit={handleSubmit}>
                    <div className="form__floating">
                        <select name="hostel_id" className="input__control" onChange={handleInputChange} value={newRoom.hostel_id} required>
                            <option>---</option>
                            {
                                hostels?.map((hotel,index)=>{
                                    return <option key ={index} value={hotel.id}>{hotel.name}</option>
                                })
                            }
                        </select>
                        <label htmlFor='hostel_id' className="input__label">Select Hostel</label>
                    </div>

                    <div className="form__floating">
                        <input type="text" name="room_id" className="input__control" onChange={handleInputChange} value={newRoom.room_id} required/>
                        <label htmlFor='room_id' className="input__label">Room Number</label>
                    </div>

                    <div className="form__floating div__row">
                        <div className="form__floating row__column">
                            <select name="capacity" className="input__control" onChange={handleInputChange} value={newRoom.capacity} required>
                                <option>---</option>
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
                                <option>---</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                            <label htmlFor='gender' className="input__label">Gender</label>
                        </div>
                    </div>

                    <div className="form__floating">
                        <input type="text" name="description" className="input__control" onChange={handleInputChange} value={newRoom.description}/>
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
                            <input type="number" name="bed_price" className="input__control" onChange={handleInputChange} value={newRoom.bed_price} required/>
                            <label htmlFor='bed_price' className="input__label">Bed Price</label>
                        </div>
                    </div>
                    {processing ? 
                    <div className="loader__wrapper">
                        <div className="loader"></div>
                    </div>:
                    <div className="error">{error}</div>
                    }
                    <div className="action__wrapper">
                        <button type="submit" className="btn__control btn-w-100" disabled={processing}>Save</button>
                        <button onClick={handleModal} className="btn__control btn-w-100" disabled={processing}>Cancel</button>
                    </div>
                </form>
            </Modal> 
            : null}
            {!loading ?
            <Fragment>
            <PageHeader title="Rooms" onClick={handleModal} text="Add Room"/>
            <div className="table__wrap">
                <DataTablesComp
                columns={Columns}
                data={rooms}
                deleteRow={deleteRow}
                targets= {[0, 1, 2, 3, 4,5,6]}
                gotoEdit={goEdit}
                dateFields={[6]}
                currencyFields ={[4]}
                // filterDate={filterByDate}
                showDateFilter={true}
                />
            </div>
            </Fragment>
            : <div className="loader__wrapper"><div className="loader"></div></div>}
        </Fragment>
    );

};

export default Rooms;