import React, {Fragment, useEffect, useState} from 'react';
import './hostels.css'
import DataTablesComp from "../../../components/datatable/DataTableComp";
// import data from '../../../data'
import Columns from './columns'
import PageHeader from '../../../components/header/PageHeader'
import Modal from '../../../components/modal/modal'
import hostelService from '../../../services/HotelServices'
import ConfirmationAlert from '../../../components/modal/ConfirmationAlert'


const Hostels = (props) => {

    const [confirmDelete,setConfirmDelete] = useState(false)
    const [deleteRecordId,setDeleteRecordId] = useState("")
    const [deleteProcess,setDeleteProcess] = useState(false)
    const [action,setAction] = useState("")
    const [loading,setLoading] = useState(false)
    const [processing,setProcessing] = useState(false)
    const [error,setError] = useState("")
    const [showModal,setShowModal] = useState(false)
    const [hostels,setHostels] = useState([])
    const [updateTable,setUpdateTable] = useState(false)
    const [newHostel,setNewHostel] = useState({
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
              let endSession
              try {
                setLoading(true)
                endSession = setTimeout(() => {
                    setLoading(false)
                }, 10000);
                const hostels = await hostelService.getHostels();
                if(hostels.status === 200){
                    clearTimeout(endSession)
                    setHostels(hostels.data.data)
                    setLoading(false)
                }
              } catch (error) {
                clearTimeout(endSession)    
                setLoading(false)
                console.log(error)              
              }
          }
          getHostelList()
      }, [updateTable])

    const handleModal = () => {
        setAction("Add")
        setShowModal(!showModal)
    }

    const handleDeleteModal = () => {
        setConfirmDelete(!confirmDelete)
    }

    const goEdit = (data) => {
        console.log(data)
        setAction("Edit")
        setNewHostel(data)
        setShowModal(!showModal)
    }

    const deleteRow = (data) => {
        console.log(data)
        handleDeleteModal()
        setDeleteRecordId(data.id)
    }

    const handleConfirmDelete = async () => {
        try {
            setDeleteProcess(true)
            const deleteRecord = await hostelService.deleteHostel(deleteRecordId)
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

    const handleInputChange = (e) => {
        let val = e.target.value;
        let key = e.target.name
        setNewHostel(prev=>{
            return{
                ...prev,[key]:val
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setProcessing(true)
            let newCreatedHostel 
            if(action === "Add"){
                newCreatedHostel = await hostelService.createHostels(newHostel)
            }else{
                newCreatedHostel = await hostelService.updateHostel(newHostel)
            }
            if(newCreatedHostel.status === 200){
                setNewHostel({
                    name: "",
                    description: "",
                    location: "",
                    gender: "",
                    address: "",
                    email: "",
                    telephone: "",
                    facilities: "",
                    startPrice: ""
                  })
                  setUpdateTable(!updateTable)
                  setError(newCreatedHostel.data.message)
                    setProcessing(false)
                    setError("")
                    if(action === "Edit"){
                        setShowModal(!showModal)
                    }
            }

        } catch (error) {
            setError(error.data.message)
            setProcessing(false)
            setTimeout(() => {
                setError("")
            }, 5000);
            console.log(error)
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
            <Modal closeModal={handleModal} title="Add Hostel">
                <form onSubmit={handleSubmit}>
                    <div className="form__floating">
                        <input type="text" name="name" className="input__control" onChange={handleInputChange} value={newHostel.name} required/>
                        <label htmlFor='name' className="input__label">Hostel Name</label>
                    </div>
                    <div className="form__floating">
                        <input type="text" name="description" className="input__control" onChange={handleInputChange} value={newHostel.description} required/>
                        <label htmlFor='description' className="input__label">Description</label>
                    </div>
                    <fieldset>
                        {/* <legend>Hostel Address</legend> */}
                        <div className="div__row">
                            <div className="form__floating row__column">
                                <input type="text" name="location" className="input__control" onChange={handleInputChange} value={newHostel.location} required/>
                                <label htmlFor='location' className="input__label">Location</label>
                            </div>
                            <div className="form__floating row__column">
                                <input type="text" name="address" className="input__control" onChange={handleInputChange} value={newHostel.address} required/>
                                <label htmlFor='address' className="input__label">Digital Address</label>
                            </div>
                        </div>
                        <div className="div__row">
                            <div className="form__floating row__column">
                                <input type="text" name="email" className="input__control" onChange={handleInputChange} value={newHostel.email} required/>
                                <label htmlFor='email' className="input__label">Email</label>
                            </div>
                            <div className="form__floating row__column">
                                <input type="text" name="telephone" className="input__control" onChange={handleInputChange} value={newHostel.telephone} required/>
                                <label htmlFor='telephone' className="input__label">Telephone</label>
                            </div>
                        </div>
                    </fieldset>
                    <div className="form__floating">
                        <input type="text" name="facilities" className="input__control" onChange={handleInputChange} value={newHostel.facilities} required/>
                        <label htmlFor='facilities' className="input__label">Facilities</label>
                    </div>
                    <div className="div__row">
                        <div className="form__floating row__column">
                            <select name="gender" className="input__control" onChange={handleInputChange} value={newHostel.gender} required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                            <label htmlFor='gender' className="input__label">Gender</label>
                        </div>
                        <div className="form__floating row__column">
                            <input type="number" name="startPrice" className="input__control" onChange={handleInputChange} value={newHostel.startPrice} required/>
                            <label htmlFor='startPrice' className="input__label">Start Price</label>
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
            <PageHeader title="Manage Hostels" onClick={handleModal} text="Create Hostel"/>
            <div className="table__wrap">
                <DataTablesComp
                columns={Columns}
                data={hostels}
                deleteRow={deleteRow}
                targets= {[0, 1, 2, 3, 4,5,6]}
                gotoEdit={goEdit}
                dateFields={[6]}
                currencyFields ={[5]}
                // filterDate={filterByDate}
                showDateFilter={true}
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

export default Hostels;