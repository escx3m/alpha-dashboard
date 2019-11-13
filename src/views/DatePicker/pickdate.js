import React, { Fragment, useState, useCallback } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import ruLocale from "date-fns/locale/ru";


import MoreIcon from "@material-ui/icons/MoreVert";
import { IconButton, Menu, MenuItem } from "@material-ui/core";

const localeMap = {
  ru: ruLocale,
};

function BasicDatePicker(props) {
  const [locale, setLocale] = useState("ru");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMenuOpen = useCallback(e => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const selectLocale = useCallback(locale => {
    setLocale(locale);
    setAnchorEl(null);
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
    <Fragment>
      <DatePicker
        inputVariant="outlined"
        // variant="inline"
        label="Date picker"
        format="dd/MM/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        animateYearScrolling
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
export default BasicDatePicker;