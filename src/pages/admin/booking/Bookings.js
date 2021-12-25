import React, {Fragment} from 'react';
import './bookings.css'
import DataTablesComp from "../../../components/datatable/DataTableComp";
import data from '../../../data'
import Columns from '../../../Columns'
import PageHeader from '../../../components/header/PageHeader'


const Bookings = () => {

    const handleButton = () => {
        
    }


    const deleteRow = () => {

    }

    const gotoEdit = () => {
        
    }
    
    return (
        <Fragment>
            <PageHeader title="Bookings" onClick={handleButton} />
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

export default Bookings;