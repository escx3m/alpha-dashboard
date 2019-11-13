import React, { Fragment, useState, useCallback } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import MoreIcon from "@material-ui/icons/MoreVert";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import ruLocale from "date-fns/locale/ru";

const localeMap = {
  ru: ruLocale,
};

function MonthPicker() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [locale, setLocale] = useState("ru");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = useCallback(e => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const selectLocale = useCallback(locale => {
    setLocale(locale);
    setAnchorEl(null);
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]} >
    <Fragment>
      <DatePicker
        inputVariant="outlined"
        views={["month"]}
        label="Month picker"
        // helperText="With min and max"
        // minDate={new Date("2018-03-01")}
        // maxDate={new Date("2018-06-01")}
        value={selectedDate}
        onChange={handleDateChange}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="Select locale"
              onClick={handleMenuOpen}
              aria-owns={anchorEl ? "locale-menu" : undefined}
            >
              <MoreIcon />
            </IconButton>
          ),
        }}
      />
      <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {Object.keys(localeMap).map(localeItem => (
          <MenuItem
            key={localeItem}
            selected={localeItem === locale}
            onClick={() => selectLocale(localeItem)}
          >
            {localeItem}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
    </MuiPickersUtilsProvider>
  );
}

export default MonthPicker;
