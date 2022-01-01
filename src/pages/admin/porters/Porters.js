import React, { Fragment, useEffect, useState } from "react";
import "./porters.css";
import DataTablesComp from "../../../components/datatable/DataTableComp";
// import data from '../../../data'
import Columns from "./columns";
import PageHeader from "../../../components/header/PageHeader";
import Modal from "../../../components/modal/modal";
import userServices from "../../../services/user.services";
import hostelService from "../../../services/HotelServices";
import ConfirmationAlert from "../../../components/modal/ConfirmationAlert";

const Porters = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState("");
  const [deleteProcess, setDeleteProcess] = useState(false);
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [porters, setPorters] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [porterHostel, setPorterHostel] = useState({});
  const [updateTable, setUpdateTable] = useState(false);
  const [newPorters, setNewPorters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const getStudentList = async () => {
      let endSession;
      try {
        setLoading(true);
        endSession = setTimeout(() => {
          setLoading(false);
        }, 10000);
        const porters = await await userServices.getPorters();
        if (porters.status === 200) {
          clearTimeout(endSession);
          setPorters(porters.data.data);
          setLoading(false);
        }
      } catch (error) {
        clearTimeout(endSession);
        setLoading(false);
        console.log(error);
      }
    };
    getStudentList();
  }, [updateTable]);

  //   useEffect(() => {
  //       const getStudentList = async () => {
  //           const porters = await userServices.getPorters();
  //           if(porters.status === 200){
  //               console.log(porters.data.data)
  //               setPorters(porters.data.data)
  //           }

  //       }
  //       getStudentList()
  //   }, [])

  useEffect(() => {
    const getHostelList = async () => {
      try {
        const hostels = await hostelService.getHostels();
        if (hostels.status === 200) {
          setHostels(hostels.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHostelList();
  }, []);

  const handleButton = () => {
    setAction("Add");
    setNewPorters({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setShowModal(!showModal);
  };

  const goEdit = (data) => {
    let porter = {};
    porter.firstName = data.firstName;
    porter.lastName = data.surName;
    porter.email = data.emailAddress;
    porter.phone = data.phoneNumber;
    setAction("Edit");
    setNewPorters(porter);
    setShowModal(!showModal);
  };

  const deleteRow = (data) => {
    console.log(data);
    handleDeleteModal();
    setDeleteRecordId(data.id);
  };

  const handleInputChange = (e) => {
    let val = e.target.value;
    let key = e.target.name;
    setNewPorters((prev) => {
      return {
        ...prev,
        [key]: val,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let endSession;
    try {
      setProcessing(true);
      endSession = setTimeout(() => {
        setProcessing(false);
        setError("Network error! Try again");
        let errorTimeout = setTimeout(() => {
          setError("");
          clearTimeout(errorTimeout);
        }, 5000);
      }, 10000);
      let porters;
      if (action === "Add") {
        //   console.log("Add")
        //   return
        porters = await await userServices.createPorters(newPorters);
      } else if (action === "Edit") {
        //   console.log("Edit")
        //   return
        porters = await await userServices.updatePorters(newPorters);
      } else {
        //   console.log("Assign")
        //   return
        porters = await await userServices.assignHostel(porterHostel);
      }
      if (porters.status === 200) {
        clearTimeout(endSession);
        setProcessing(false);
        setNewPorters({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
        setPorterHostel({ porter_id: "", hostel_id: "" });
        setError(porters.message);
        setUpdateTable(!updateTable);
        let successTimeout = setTimeout(() => {
          setError("");
          clearTimeout(successTimeout);
        }, 5000);
      }
    } catch (error) {
      clearTimeout(endSession);
      setUpdateTable(false);
      setProcessing(false);
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const assignHostelToPorter = (data) => {
    setAction("Assign");
    // let ht = {};
    let porter_id = data.id;
    let porter_name = data.firstName + " " + data.surName;
    setPorterHostel({
      porter_id: porter_id,
      hostel_id: "",
      porter_name: porter_name,
    });
    setShowAssignModal(!showAssignModal);
  };

  const handleAssignModal = () => {
    setShowAssignModal(!showAssignModal);
  };

  const selectHostel = (e) => {
    let val = e.target.value;

    setPorterHostel((prev) => {
      return {
        ...prev,
        hostel_id: val,
      };
    });
  };

  const handleDeleteModal = () => {
    setConfirmDelete(!confirmDelete);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteProcess(true);
      const deleteRecord = await hostelService.deleteHostel(deleteRecordId);
      if (deleteRecord.status === 200) {
        setDeleteProcess(false);
        setUpdateTable(!updateTable);
        handleDeleteModal();
      }
    } catch (error) {
      setDeleteProcess(false);
      setUpdateTable(!updateTable);
      handleDeleteModal();
      console.log(error);
    }
  };

  return (
    <Fragment>
      {confirmDelete ? (
        <ConfirmationAlert title="Confirm Delete">
          <p>Are you sure you delete this record?</p>
          <button
            className="btn__control btn-w"
            onClick={handleConfirmDelete}
            disabled={deleteProcess}
          >
            {deleteProcess ? (
              <div className="processingloader"></div>
            ) : (
              "Yes, delete"
            )}
          </button>
          <button
            className="btn__control btn-w"
            onClick={handleDeleteModal}
            disabled={deleteProcess}
          >
            No
          </button>
        </ConfirmationAlert>
      ) : null}
      {showAssignModal ? (
        <Modal closeModal={handleAssignModal} title="Assign Hostel To Porter">
          <form onSubmit={handleSubmit}>
            <div className="form__floating">
              <input
                type="text"
                name="porter_id"
                className="input__control"
                value={porterHostel.porter_name}
                disabled
              />
            </div>
            <div className="form__floating">
              <select
                name="hostel_id"
                className="input__control"
                onChange={selectHostel}
                // value={porterHostel.hostel_id}
                required
              >
                {/* <option value="">--Select Hostel--</option> */}
                {hostels?.map((hostel, index) => {
                  return (
                    <option key={index} value={hostel.id}>
                      {hostel.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {error ? <div className="error">{error}</div> : null}
            <div className="action__wrapper">
              <button
                type="submit"
                className="btn__control btn-w-100"
                disabled={processing}
              >
                {processing ? (
                  <div className="processingloader"></div>
                ) : (
                  "Assign"
                )}
              </button>
              <button
                onClick={handleAssignModal}
                className="btn__control btn-w-100"
                disabled={processing}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
      {showModal ? (
        <Modal closeModal={handleButton} title="Add Porter">
          <form onSubmit={handleSubmit}>
            <div className="div__row">
              <div className="form__floating row__column">
                <div className="form__floating">
                  <input
                    type="text"
                    name="firstName"
                    className="input__control"
                    onChange={handleInputChange}
                    value={newPorters.firstName}
                    required
                  />
                  <label htmlFor="name" className="input__label">
                    First Name
                  </label>
                </div>
              </div>

              <div className="form__floating row__column">
                <div className="form__floating">
                  <input
                    type="text"
                    name="lastName"
                    className="input__control"
                    onChange={handleInputChange}
                    value={newPorters.lastName}
                    required
                  />
                  <label htmlFor="name" className="input__label">
                    Surname
                  </label>
                </div>
              </div>
            </div>
            <fieldset>
              <div className="div__row">
                <div className="form__floating row__column">
                  <input
                    type="email"
                    name="email"
                    className="input__control"
                    onChange={handleInputChange}
                    value={newPorters.email}
                    required
                  />
                  <label htmlFor="email" className="input__label">
                    Email
                  </label>
                </div>
                <div className="form__floating row__column">
                  <input
                    type="tel"
                    name="phone"
                    className="input__control"
                    onChange={handleInputChange}
                    value={newPorters.phone}
                    required
                  />
                  <label htmlFor="telephone" className="input__label">
                    Telephone
                  </label>
                </div>
              </div>
            </fieldset>
            {!processing ? <div className="error">{error}</div> : null}
            <div className="action__wrapper">
              <button
                type="submit"
                className="btn__control btn-w-100"
                disabled={processing}
              >
                {processing ? <div className="processingloader"></div> : "Save"}
              </button>
              <button
                onClick={handleButton}
                className="btn__control btn-w-100"
                disabled={processing}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
      {!loading ? (
        <Fragment>
          <PageHeader
            title="Porters"
            onClick={handleButton}
            text="Add Porter"
          />
          <div className="table__wrap">
            <DataTablesComp
              columns={Columns}
              data={porters}
              deleteRow={deleteRow}
              gotoEdit={goEdit}
              assignHostel={true}
              assignHostelToPorter={assignHostelToPorter}
              targets={[0, 1, 2, 3, 4, 5]}
            />
          </div>
        </Fragment>
      ) : (
        <div className="loader__wrapper">
          <div className="loader"></div>
        </div>
      )}
    </Fragment>
  );
};

export default Porters;
