import React from 'react';
import { Grid } from '@material-ui/core';
import DatePickerANTD from './weekFinanceHeader/datepickerANTD';
import ChooseBox from './weekFinanceHeader/chooseBox';

const WeekFinanceHeader = (props) => {
  const { checkState, setCheckState } = props;
  return (
    <Grid 
      container 
      direction="row" 
      item xs={12}> 
      <Grid item xs={2} style={{marginLeft:'10px'}}>
        <DatePickerANTD {...props} />
      </Grid>
      <Grid item xs={9}>
      <ChooseBox checkState={ checkState } setCheckState={ setCheckState } />
    </Grid>
    </Grid>
  );
}
export default WeekFinanceHeader;



