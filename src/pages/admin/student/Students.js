import React,{Fragment} from 'react';
import './students.css'
import DataTablesComp from "../../../components/datatable/DataTableComp";
import data from '../../../data'
import Columns from '../../../Columns'
import PageHeader from '../../../components/header/PageHeader'


const Students = () => {

    const handleButton = () => {
        
    }


    const deleteRow = () => {

    }

    const gotoEdit = () => {
        
    }
    
    return (
        <Fragment>
            <PageHeader title="Students" onClick={handleButton} />
        <div className="table__wrap">
            <DataTablesComp
            columns={Columns}
            data={data}
            deleteRow={deleteRow}
            gotoEdit={gotoEdit}
            />
        </div>
        </Fragment>
    );
};

export default Students;