import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = (props) => {
  const { dataSet, columns } = props;
  const ExportXLS = (props) => {
    const handleClick = () => {
      //   props.onExport();
    };
    return (
      <button type='button' className='btn btn-default' onClick={handleClick}>
        DOWNLOAD XLS
      </button>
    );
  };
  return (
    <ExcelFile element={<ExportXLS />} filename='ePCN-Excel-Data'>
      <ExcelSheet data={dataSet} name='ePCN-Excel-Data'>
        {typeof columns != "undefined" &&
          columns.length > 0 &&
          columns.map((column) => (
            <ExcelColumn label={column.text} value={column.dataField} />
          ))}
      </ExcelSheet>
    </ExcelFile>
  );
};
export default ExportExcel;
