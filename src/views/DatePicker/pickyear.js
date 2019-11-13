import React, { Fragment, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

function YearPicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Fragment>
      <DatePicker
        inputVariant="outlined"
        views={["year"]}
        label="Year picker"
        value={selectedDate}
        onChange={handleDateChange}
      />

      {/* <DatePicker
        views={["month"]}
        label="Year and Month"
        // helperText="With min and max"
        // minDate={new Date("2018-03-01")}
        // maxDate={new Date("2018-06-01")}
        value={selectedDate}
        onChange={handleDateChange}
      /> */}

      {/* <DatePicker
        // variant="inline"
        openTo="year"
        views={["year", "month"]}
        label="Year and Month"
        // helperText="Start from year selection"
        value={selectedDate}
        onChange={handleDateChange}
      /> */}
    </Fragment>
    </MuiPickersUtilsProvider>
  );
}

export default YearPicker;
