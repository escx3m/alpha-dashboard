import React from 'react';

import ChooseSchema from '../carsLoad/carsLoadHeader/ChooseSchema';
import WeekPicker from '../carsLoad/carsLoadHeader/WeekPicker';
import { Grid } from '@material-ui/core';

const CarsLoadHeader = (props) => {
  const { checkState, setCheckState } = props;

  return (

  <Grid container 
        direction="row" 
        item xs={12}
        spacing={1}> 
    <Grid item xs={3}>
      <ChooseSchema checkState={ checkState } setCheckState={ setCheckState } />
    </Grid>
    <Grid item xs={9}>
      <WeekPicker {...props}/>
    </Grid>
  </Grid>
);
}
export default CarsLoadHeader;



