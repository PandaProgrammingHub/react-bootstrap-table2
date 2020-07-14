import React, { Component } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.onApply = this.onApply.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      startDate: moment().subtract(6, "days").format("MMMM D, YYYY"),
      endDate: moment().format("MMMM D, YYYY"),
    };
  }
  onApply(event, props) {
    event.preventDefault();
    let startDate = props.startDate.format("MMMM D, YYYY");
    let endDate = props.endDate.format("MMMM D, YYYY");
    this.setState({ startDate, endDate });
    console.log("onApply startDate:", startDate);
    console.log("onApply endDate:", endDate);
  }
  onCancel(event, props) {
    event.preventDefault();
    // console.log("onCancel:", props);
  }
  render() {
    const { startDate, endDate } = this.state;
    const ranges = {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "Last 30 Days": [moment().subtract(29, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Last Month": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    };
    const child = () => (
      <div style={{ color: "red" }}>Don't forget to check the weather!</div>
    );
    return (
      <DateRangePicker
        ranges={ranges}
        onApply={this.onApply}
        onCancel={this.onCancel}
        autoApply={true}
        autoUpdateInput={true}
        children={child}
      >
        <div id='reportrange'>
          <i className='fa fa-calendar'></i>&nbsp;
          <span>
            {startDate} - {endDate}
          </span>{" "}
          <i className='fa fa-caret-down'></i>
        </div>
      </DateRangePicker>
    );
  }
}
export default DatePicker;
