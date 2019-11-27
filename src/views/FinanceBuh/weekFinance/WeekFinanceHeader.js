import React from 'react';
import ChooseSchema from './weekFinanceHeader/ChooseSchema';
import WeekPicker from './weekFinanceHeader/WeekPicker';
import { Grid } from '@material-ui/core';
import DatePickerANTD from './weekFinanceHeader/datepickerANTD';

const WeekFinanceHeader = (props) => {
  const { checkState, setCheckState } = props;

  return (
    <Grid 
      container 
      direction="row" 
      item xs={12}> 
      {/* <Grid item xs={3}>
        <ChooseSchema checkState={ checkState } setCheckState={ setCheckState } />
      </Grid>
      <Grid item xs={9}>
        <WeekPicker {...props}/>
      </Grid> */}
      <Grid item xs={3}>
        <DatePickerANTD {...props} />
      </Grid>
      <Grid item xs={6}>
      <WeekPicker {...props}/>
      </Grid>
    </Grid>
  );
}
export default WeekFinanceHeader;



