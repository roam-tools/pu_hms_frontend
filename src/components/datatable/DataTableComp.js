import React, { Component } from "react";
import ReactDOM from "react-dom";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import moment from "moment";
import { DatePicker } from "antd";
import JSZip from "jszip";
import "./datatable.css";
window.JSZip = JSZip;
const $ = require("jquery");
$.DataTable = require("datatables.net");
const { RangePicker } = DatePicker;


let table = "";

class DataTableComp extends Component {
    constructor(props) {
    super(props);

    this.state = {
      dates: [],
      dateString: "",
    };
  }
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.DataTable({
      dom: '<"data-table-wrapper"tip>',
      // dom: 'Bfrtip',
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
          targets: this.props.currencyFields,
          render: $.fn.dataTable.render.number(",", ".", 2, ""),
        },
        {
          targets:this.props.dateFields, 
          render:function(data){
            return moment.unix(data).format('DD-MM-YYYY hh:mm:ss');
          }
        },
        {
          targets: Object.keys(this.props.columns).length - 1,
          data: null,
          sorting: false,
          createdCell: (td, cellData, rowData) =>
            ReactDOM.render(
              <div className="tbl-actions">
                {this.props.showConfirm ? (
                  // <button className="">Confirm</button>
                  <div>                    
                  <button onClick={this.props.confirmBooking} title="Click to confirm"><i className="fa fa-check fa-sm"></i></button>
                  <span style={{ paddingRight: "15px" }}></span>
                  <button onClick={this.props.cancelBooking} title="Click to cancel"><i className="fa fa-times fa-sm"></i></button>
                  </div>
                ) : null
                }
                {!this.props.showConfirm ?
                <>
                <div
                  id={rowData.id}
                  onClick={() => {
                    this.props.gotoEdit(rowData);
                  }}
                >
                  {" "}
                  <i className="fa fa-pen fa-sm"></i>{" "}
                </div>
                <span style={{ paddingRight: "15px" }}></span>
                <div
                  id={rowData.id}
                  onClick={() => {
                    this.props.deleteRow(rowData);
                  }}
                >
                  {" "}
                  <i className="fa fa-trash fa-sm"></i>{" "}
                </div>
                </>:
                null}
              </div>,
              td
            ),
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
        <div className="filter-box">
          <i className="fa fa-search fa-lg"></i>
          <input
            type="text"
            placeholder="Search"
            onChange={this.handleSearch}
            className="customer-search input__control search-input"
          />
          <div className="date-select">
            <RangePicker
              format="YYYY-MM-DD hh:mm:ss"
              defaultValue={[moment().startOf('month'), moment().endOf('month')]}
              showTime
              size="small"
              bordered={false}
              onChange={(val, dateString) =>
                this.props.filterDate(val, dateString)
              }
            />
          </div>
        </div>
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
