import React from 'react';
import TableHeader from './weekFinanceTable/TableHeader';
import TableContent from './weekFinanceTable/TableContent';
import { Grid, CircularProgress } from '@material-ui/core';

const WeekFinanceTable = ({
  routes,
  finances,
  setFinances,
  loading,
  selectedWeekStart,
  checkState,
  selectedDay
}) =>
  loading ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      direction="row"
    >
      <Grid
        container
        item
        xs={12}
      >
        <TableHeader selectedWeekStart={selectedWeekStart} />
      </Grid>
      <Grid
        container
        item
        xs={12}
      >
        <TableContent
          checkState={checkState}
          finances={finances}
          routes={routes}
          selectedDay={selectedDay}
          selectedWeekStart={selectedWeekStart}
          setFinances={setFinances}
        />
      </Grid>
    </Grid>
  );

export default WeekFinanceTable;
