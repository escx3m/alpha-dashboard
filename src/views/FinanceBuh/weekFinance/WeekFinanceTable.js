import React from 'react';
import TableHeader from './weekFinanceTable/TableHeader';
import TableContent from './weekFinanceTable/TableContent';
import { Grid, CircularProgress } from '@material-ui/core';

const WeekFinanceTable = ({ routes, loading, selectedWeekStart, checkState, selectedDay }) => ( 
  loading 
  ? <CircularProgress />
  : <Grid container direction="row">
      <Grid container item xs={12}>
        <TableHeader 
          selectedWeekStart={selectedWeekStart}
        />
      </Grid>
      <Grid container item xs={12}>
        <TableContent 
          routes={routes}
          selectedWeekStart={selectedWeekStart}
          selectedDay={selectedDay}
          checkState={checkState}
        />
      </Grid>
    </Grid>
);

export default WeekFinanceTable;
