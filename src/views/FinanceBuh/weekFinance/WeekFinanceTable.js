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
  selectedDay,
  exportData,
  setExportData,
  localDataRoutes,
  localDataParcels,
  totalPerDayRoutes,
  totalPerDayPackages,
  daySum,
  exportToExcel
}) => {
  const classes = useStyles();
  return loading ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.gridWindow} container direction="row">
      <Grid className={classes.gridHeader} container item xs={12}>
        <TableHeader
          checkState={checkState}
          exportToExcel={exportToExcel}
          selectedWeekStart={selectedWeekStart}
        />
      </Grid>
      <Grid container item xs={12}>
        <TableContent
          checkState={checkState}
          exportData={exportData}
          setExportData={setExportData}
          daySum={daySum}
          finances={finances}
          localDataParcels={localDataParcels}
          localDataRoutes={localDataRoutes}
          parcels={parcels}
          routes={routes}
          selectedDay={selectedDay}
          selectedWeekStart={selectedWeekStart}
          setFinances={setFinances}
          setParcels={setParcels}
          totalPerDayPackages={totalPerDayPackages}
          totalPerDayRoutes={totalPerDayRoutes}
        />
      </Grid>
    </Grid>
  );
};

export default WeekFinanceTable;
