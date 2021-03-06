import React, { Component, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

import filterFactory, {
  selectFilter,
  Comparator,
} from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  // CSVExport,
  Search,
} from "react-bootstrap-table2-toolkit";
import ExportExcel from "./ExportExcel";
import DatePicker from "./DatePicker";
import "./Table.css";
const { SearchBar } = Search;

const CaptionElement = () => (
  <h3
    style={{
      borderRadius: "0.25em",
      textAlign: "center",
      color: "purple",
      border: "1px solid purple",
      padding: "0.5em",
    }}
  >
    ePCN :- React Component POC
  </h3>
);

const ExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <span>
      <button type='button' className='btn btn-default' onClick={handleClick}>
        DOWNLOAD CSV
      </button>
    </span>
  );
};
class TabaleComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedRow: null,
    };
  }
  render() {
    const defaultSorted = [
      {
        dataField: "id",
        order: "asc",
      },
    ];
    const selectFilterOptions = [
      { value: "George", label: "George" },
      { value: "Jeffrey", label: "Jeffrey" },
      { value: "Alice", label: "Alice" },
    ];
    const columns = [
      { dataField: "id", text: "Id", sort: true },
      {
        dataField: "name",
        text: "Name",
        filter: selectFilter({
          options: selectFilterOptions,
          placeholder: " ",
          //   className: "test-classname",
          //   withoutEmptyOption: true,
          defaultValue: 2,
          comparator: Comparator.LIKE,
          getFilter: (filter) => {
            // qualityFilter was assigned once the component has been mounted.
            // qualityFilter = filter;
          },
          onFilter: (filterValue) => {
            // filter = filterValue;
            //...
          },
        }),
        sort: true,
      },
      { dataField: "animal", text: "Animal", sort: true },
    ];
    const products = [
      { id: 1, name: "George", animal: "Monkey" },
      { id: 2, name: "Jeffrey", animal: "Giraffe" },
      { id: 3, name: "Alice", animal: "Giraffe" },
      { id: 4, name: "Alice", animal: "Tiger" },
      { id: 5, name: "George", animal: "Monkey" },
      { id: 6, name: "Jeffrey", animal: "Giraffe" },
      { id: 7, name: "Alice", animal: "Giraffe" },
      { id: 8, name: "Alice", animal: "Giraffe" },
      { id: 9, name: "Alice", animal: "Tiger" },
      { id: 10, name: "George", animal: "Monkey" },
      { id: 11, name: "George", animal: "Monkey" },
      { id: 12, name: "Jeffrey", animal: "Giraffe" },
      { id: 13, name: "Alice", animal: "Giraffe" },
      { id: 14, name: "Alice", animal: "Tiger" },
      { id: 15, name: "George", animal: "Monkey" },
      { id: 16, name: "Jeffrey", animal: "Giraffe" },
      { id: 17, name: "Alice", animal: "Giraffe" },
      { id: 18, name: "Alice", animal: "Giraffe" },
      { id: 19, name: "Alice", animal: "Tiger" },
      { id: 20, name: "George", animal: "Monkey" },
    ];
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      style: { backgroundColor: "#CCCCCC" },
      onSelect: (row, isSelect, rowIndex, e) => {
        e.preventDefault();
        console.log("====onSelect====");
        console.log("row=>", row);
        console.log("isSelect=>", isSelect);
        console.log("rowIndex=>", rowIndex);
        this.setState({ selectedRow: row });
      },
      onSelectAll: (isSelect, rows, e) => {
        e.preventDefault();
        console.log("====onSelectAll====");
        console.log("rows=>", rows);
        console.log("isSelect=>", isSelect);
        this.setState({ selectedRow: rows });
      },
    };
    const options = {
      custom: true,
      sizePerPage: 3,
      totalSize: products.length,
      showTotal: true, // display pagination information
      firstPageText: "First", // the text of first page button
      prePageText: "Prev", // the text of previous page button
      nextPageText: "Next", // the text of next page button
      lastPageText: "Last", // the text of last page button
      nextPageTitle: "Go to next", // the title of next page button
      prePageTitle: "Go to previous", // the title of previous page button
      firstPageTitle: "Go to first", // the title of first page button
      lastPageTitle: "Go to last", // the title of last page button
    };

    return (
      <Fragment>
        <CaptionElement />
        <ToolkitProvider
          keyField='id'
          data={products}
          columns={columns}
          headerClasses='header-class'
          bootstrap4={true}
          search
          exportCSV={{ fileName: "ePCN-CSV-Data.csv" }}
        >
          {(props) => (
            <div className='row'>
              <div className='col-md-12'>
                <PaginationProvider pagination={paginationFactory(options)}>
                  {({ paginationProps, paginationTableProps }) => (
                    <div>
                      <div className='btn-list'>
                        <DatePicker />
                        <div>
                          <label>Filter : &nbsp;</label>

                          <SearchBar
                            {...props.searchProps}
                            className='custome-search-field'
                            delay={1000}
                            placeholder='Filter by...'
                          />
                        </div>
                        <ExportCSV {...props.csvProps} /> &nbsp; &nbsp;
                        <ExportExcel
                          key={1}
                          dataSet={products}
                          columns={columns}
                        />
                      </div>

                      <div>
                        <BootstrapTable
                          ref={(n) => (this.node = n)}
                          noDataIndication='No Records Found '
                          defaultSorted={defaultSorted}
                          {...paginationTableProps}
                          {...props.baseProps}
                          columns={columns}
                          classes='comparisonTable table table-bordered table-striped'
                          bootstrap4={true}
                          wrapperClasses='table-responsive'
                          filterPosition={"top"}
                          filter={filterFactory()}
                          bordered={false}
                          selectRow={selectRow}
                        />
                      </div>
                      <div
                        style={{
                          margin: "-12px",
                          marginTop: "-20px",
                          marginRight: "0px",
                          float: "right",
                        }}
                      >
                        <PaginationListStandalone {...paginationProps} />
                      </div>
                    </div>
                  )}
                </PaginationProvider>
              </div>
            </div>
          )}
        </ToolkitProvider>
      </Fragment>
    );
  }
}
export default TabaleComponent;
