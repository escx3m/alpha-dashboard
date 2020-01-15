import React, { useState } from 'react';
import TableHeader from './weekFinanceTable/TableHeader';
import TableContent from './weekFinanceTable/TableContent';
import { Grid, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  gridWindow: {
    height: '417px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    position: 'relative'
  },
  gridHeader: {
    position: 'sticky',
    top: '0',
    zIndex: 1,
    background: 'white'
  }
}));

const WeekFinanceTable = ({
  routes,
  finances,
  setFinances,
  parcels,
  setParcels,
  loading,
  selectedWeekStart,
  checkState,
  selectedDay
}) => {
  const classes = useStyles();
  const [exportData, setExportData] = useState([]);
  return loading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.gridWindow}
      container
      direction="row"
    >
      <Grid
        className={classes.gridHeader}
        container
        item
        xs={12}
      >
        <TableHeader
          checkState={checkState}
          exportData={exportData}
          selectedWeekStart={selectedWeekStart}
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
      >
        <TableContent
          checkState={checkState}
          exportData={exportData}
          finances={finances}
          parcels={parcels}
          routes={routes}
          selectedDay={selectedDay}
          selectedWeekStart={selectedWeekStart}
          setExportData={setExportData}
          setFinances={setFinances}
          setParcels={setParcels}
        />
      </Grid>
    </Grid>
  );
};

export default WeekFinanceTable;
