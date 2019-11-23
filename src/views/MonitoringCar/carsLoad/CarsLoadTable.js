import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContent from '../carsLoad/carsLoadTable/TableContent';
import TableHeader from '../carsLoad/carsLoadTable/TableHeader';
import { Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  progress: {
    marginTop: '20px',
    textAlign:'center',
    }
}));

const CarsLoadTable = ({ cars, loading, selectedWeekStart, checkState }) => {
  const classes = useStyles();
  return (
  loading 
  ? <CircularProgress className={classes.progress}/>
  : <Grid container direction="row">
      <Grid container item xs={12}>
        <TableHeader 
          selectedWeekStart={selectedWeekStart}
        />
      </Grid>
      <Grid container item xs={12}>
        <TableContent 
          cars={cars}
          selectedWeekStart={selectedWeekStart}
          checkState={checkState}
        />
      </Grid>
    </Grid>
  )
  };

export default CarsLoadTable;
