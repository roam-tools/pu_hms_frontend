import React, {Fragment, useEffect, useState} from 'react';
import './hostels.css'
import DataTablesComp from "../../../components/datatable/DataTableComp";
// import data from '../../../data'
import Columns from './columns'
import PageHeader from '../../../components/header/PageHeader'
import Modal from '../../../components/modal/modal'
import hostelService from '../../../services/HotelServices'


const Hostels = (props) => {

    const [showModal,setShowModal] = useState(false)
    const [hostels,setHostels] = useState([])
    const [updateTable,setUpdateTable] = useState({})
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
              const hostels = await hostelService.getHostels();
              if(hostels.status === 200){
                  console.log(hostels.data.data)
                  setHostels(hostels.data.data)
              }

          }
          getHostelList()
      }, [updateTable])

    const handleModal = () => {
        setShowModal(!showModal)
    }

    const goEdit = (data) => {
        setNewHostel(data)
        setShowModal(!showModal)
    }

    const deleteRow = (id) => {
        console.log(id)
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
            const newCreatedHostel = await hostelService.createHostels(newHostel)
            console.log(newCreatedHostel)
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
                    startPrice: 0
                  })
                  setUpdateTable({})
            }else{
                console.log(newCreatedHostel)
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <Fragment>
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
                        <legend>Hostel Address</legend>
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
                    <div className="action__wrapper">
                        <button type="submit" className="btn__control">Save</button>
                    </div>
                </form>
            </Modal> 
            : null}
            {hostels.length > 0 ?
            <Fragment>
            <PageHeader title="Hostels" onClick={handleModal} text="Add Hostel"/>
            <div className="table__wrap">
                <DataTablesComp
                columns={Columns}
                data={hostels}
                deleteRow={deleteRow}
                targets= {[0, 1, 2, 3, 4,5]}
                handleModal={goEdit}
                // actions={(data, type, row, meta) => {
                //     return `
                //     <i class="fa fa-pen fa-sm" style="cursor:pointer" onClick={this.props.handleModal}></i>
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

export default Hostels;