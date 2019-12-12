import React from 'react';
import { Grid } from '@material-ui/core';
import DatePickerANTD from './weekFinanceHeader/datepickerANTD';

const WeekFinanceHeader = (props) => {
  return (
    <Grid 
      container 
      direction="row" 
      item xs={12}> 
      <Grid item xs={3} style={{marginLeft:'50px'}}>
        <DatePickerANTD {...props} />
      </Grid>
    </Grid>
  );
}
export default WeekFinanceHeader;



