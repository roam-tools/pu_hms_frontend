import React, {Fragment, useEffect, useState} from 'react';
import './porters.css'
import DataTablesComp from "../../../components/datatable/DataTableComp";
// import data from '../../../data'
import Columns from './columns'
import PageHeader from '../../../components/header/PageHeader'
import Modal from '../../../components/modal/modal'
import userServices from '../../../services/user.services'


const Porters = (props) => {

    const [showModal,setShowModal] = useState(false)
    const [porters,setPorters] = useState([])
    const [newPorters,setNewPorters] = useState({
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
          const getStudentList = async () => {
              const porters = await userServices.getPorters();
              if(porters.status === 200){
                  console.log(porters.data.data)
                  setPorters(porters.data.data)
              }

          }
          getStudentList()
      }, [])

    const handleButton = () => {
        setShowModal(!showModal)
    }


    const deleteRow = () => {

    }

    const gotoEdit = () => {
        
    }

    const handleInputChange = (e) => {
        let val = e.target.value;
        let key = e.target.name
        setNewPorters(prev=>{
            return{
                ...prev,[key]:val
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newPorters)
    }

    
    return (
        <Fragment>
            {showModal?
            <Modal closeModal={handleButton} title="Add Porter">
                <form onSubmit={handleSubmit}>
                    <div className="form__floating">
                        <input type="text" name="name" className="input__control" onChange={handleInputChange} required/>
                        <label htmlFor='name' className="input__label">Student Name</label>
                    </div>
                    <div className="form__floating">
                        <input type="text" name="description" className="input__control" onChange={handleInputChange} required/>
                        <label htmlFor='description' className="input__label">Description</label>
                    </div>
                    <fieldset>
                        <legend>Student Address</legend>
                        <div className="div__row">
                            <div className="form__floating row__column">
                                <input type="text" name="location" className="input__control" onChange={handleInputChange} required/>
                                <label htmlFor='location' className="input__label">Location</label>
                            </div>
                            <div className="form__floating row__column">
                                <input type="text" name="address" className="input__control" onChange={handleInputChange} required/>
                                <label htmlFor='address' className="input__label">Digital Address</label>
                            </div>
                        </div>
                        <div className="div__row">
                            <div className="form__floating row__column">
                                <input type="text" name="email" className="input__control" onChange={handleInputChange} required/>
                                <label htmlFor='email' className="input__label">Email</label>
                            </div>
                            <div className="form__floating row__column">
                                <input type="text" name="telephone" className="input__control" onChange={handleInputChange} required/>
                                <label htmlFor='telephone' className="input__label">Telephone</label>
                            </div>
                        </div>
                    </fieldset>
                    <div className="form__floating">
                        <input type="text" name="facilities" className="input__control" onChange={handleInputChange} required/>
                        <label htmlFor='facilities' className="input__label">Facilities</label>
                    </div>
                    <div className="div__row">
                        <div className="form__floating row__column">
                            {/* <input type="text" name="gender" className="input__control" onChange={handleInputChange} required/> */}
                            <select name="gender" className="input__control" onChange={handleInputChange} required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                            <label htmlFor='gender' className="input__label">Gender</label>
                        </div>
                        <div className="form__floating row__column">
                            <input type="text" name="startPrice" className="input__control" onChange={handleInputChange} required/>
                            <label htmlFor='startPrice' className="input__label">Start Price</label>
                        </div>
                    </div>
                    <div className="action__wrapper">
                        <button type="submit" className="btn__control">Save</button>
                    </div>
                </form>
            </Modal> 
            : null}
            {porters.length > 0 ?
            <Fragment>
            <PageHeader title="Porters" onClick={handleButton} text="Add Porter"/>
            <div className="table__wrap">
                <DataTablesComp
                columns={Columns}
                data={porters}
                deleteRow={deleteRow}
                gotoEdit={gotoEdit}
                targets= {[0, 1, 2, 3,4,5]}
                />
            </div>
            </Fragment>
            : <div className="loader__wrapper"><div className="loader"></div></div>}
        </Fragment>
    );

};

export default Porters;