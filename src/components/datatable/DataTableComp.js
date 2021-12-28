import React, { Component } from "react";
import ReactDOM from "react-dom";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import JSZip from "jszip";
import "./datatable.css";
window.JSZip = JSZip;
const $ = require("jquery");
$.DataTable = require("datatables.net");

let table = "";

class DataTableComp extends Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.DataTable({
      // dom: '<"data-table-wrapper"Brtip>',
      dom: "Bfrtip",
      scrollX: true,
      // scrollCollapse: true,
      // paging:         false,
      // processing: true,
      buttons: ["excel"],
      data: this.props.data,
      columns: this.props.columns,
      ordering: false,
      columnDefs: [
        { className: "dt-center", targets: this.props.targets },
        {
          // Object.keys(this.props.columns).length
          className:"dt-center",
          targets: Object.keys(this.props.columns).length - 1,
          data: null,
          sorting: false,

          createdCell: (td, cellData, rowData) =>
            ReactDOM.render(
              <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <div
                  id={rowData.id}
                  onClick={() => {
                    this.props.handleModal(rowData);
                  }}
                >
                  {" "}
                  <i className="fa fa-pen fa-sm"></i>{" "}
                </div>
                <span style={{paddingRight:"15px"}}></span>
                <div
                  id={rowData.id}
                  onClick={() => {
                    this.props.deleteRow(rowData);
                  }}
                >
                  {" "}
                  <i className="fa fa-trash fa-sm"></i>{" "}
                </div>
              </div>
              ,
              td
            ),

          // render: function (data, type, row, meta){
          //   return `<div>
          //       <i class="fa fa-pen fa-sm" style="cursor:pointer"></i>
          //       <span style="padding-right:5px;"></span>
          //       <i class="fa fa-trash fa-sm" style="cursor:pointer;color:red"></i>
          //       <span style="padding-right:5px;"></span>
          //       <i class="fa fa-ban fa-sm" style="cursor:pointer"></i>
          //     </div>`

          // }
        },
      ],
    });
    table = $(".data-table-wrapper").find("table").DataTable();
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

  // let oTable = this.$el.DataTable();
  // $('#myInputTextField').keyup(function(){
  //       oTable.search($(this).val()).draw() ;
  //     })

  handleSearch(e) {
    let val = e.target.value;
    console.log(val);
    console.log(table);
    table.search(val);
    table.draw();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.data.length !== this.props.data.length) {
  //     this.reloadTableData(nextProps.data);
  //   }
  //   return false;
  // }

  render() {
    return (
      <div className="table__wrapper">
        {/* <input type="text" placeholder="Search" onChange={this.handleSearch}/> */}
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
