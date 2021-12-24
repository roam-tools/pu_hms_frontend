import React, { Component } from "react";
import ReactDOM from "react-dom";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import JSZip from 'jszip';
import './datatable.css'
window.JSZip = JSZip;
const $ = require("jquery");
$.DataTable = require("datatables.net");

class DataTableComp extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Working now.....")
    this.$el = $(this.el);
    this.$el.DataTable({
    //   dom: '<"data-table-wrapper"t>',
    dom: 'Bfrtip',
    scrollX:        true,
    // scrollCollapse: true,
    // paging:         false,
    // processing: true,
    buttons: [
        'excel'
    ],
      data: this.props.data,
      columns: this.props.columns,
      ordering: false,
      columnDefs: [
        { className: 'dt-center', targets: [0, 1, 2, 3, 4,6] },
        {
          targets: Object.keys(this.props.columns).length,
          data: null,
          sorting: false,
          width: 180,
          render: function(data, type, row, meta) {
            return '<button>+</button>';
            }
          // createdCell: (td, cellData, rowData) =>
          //   ReactDOM.render(
          //     <div
          //       id={rowData.id}
          //       onClick={() => {
          //         this.props.deleteRow(rowData.id);
          //       }}
          //     >
          //       {" "}
          //       Delete{" "} 
          //     </div>,
          //     td
          //   ),
        },
      ],
    });
  }

  componentWillUnmount() {
    $(".data-table-wrapper").find("table").DataTable().destroy(true);
  }

  reloadTableData = (data) => {
    const table = $(".data-table-wrapper").find("table").DataTable();
    table.clear();
    table.rows.add(data);
    table.draw();
  };
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.data.length !== this.props.data.length) {
  //     this.reloadTableData(nextProps.data);
  //   }
  //   return false;
  // }


  render() {
    return (
      <div className="table__wrapper">
        <table
          className="table cell-border dt-center table-striped dt-centered display"
          id="dataTable"
          width="100%"
          cellSpacing="0"
          ref={(el) => (this.el = el)}
        />
      </div>
    );
  }
}
export default DataTableComp;
