import React, { useState, useEffect, useContext } from 'react';
import WeekFinanceTable from './weekFinance/WeekFinanceTable';
import WeekFinanceHeader from './weekFinance/WeekFinanceHeader';
import { Grid, makeStyles } from '@material-ui/core';
import { startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { makeJSDateObject } from '../../helpers/helpers';
import { ApiContext } from '../../Routes';
import { calculateFinance } from './calc/calcFinance';
import xlsExport from 'xlsexport';
// const comp = () => {
//   useEffect(() =>
//     makeApiCall().then(() => setState(calc(2333)))
//   )
// }
const useStyles = makeStyles(theme => ({ gridMargin: { marginTop: '30px' } }));

function WeekFinance() {
  const { api } = useContext(ApiContext);
  const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), {
    weekStartsOn: 1
  });
  const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [routes, setRoutes] = useState([]);
  const [finances, setFinances] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exportData, setExportData] = useState({});
  const classes = useStyles();
  const [checkState, setCheckState] = React.useState({
    checkedCar: false,
    checkedOwner: false,
    checkedDriver: false,
    checkedDirection: false,
    checkedPassengers: false,
    checkedCard: false,
    checkedCash: false,
    checkedOffice: false,
    checkedCorrection: false,
    checkedSum: false,
    checkedAccrued: false,
    checkedPayment: false,
    checkedProfit: false,
    checkedAll: true
  });

  useEffect(() => {
    Promise.all([
      api
        .getRoutes(
          selectedWeekStart,
          endOfWeek(selectedWeekStart, { weekStartsOn: 1 })
        )
        .then(res => {
          console.log('getRoutes');
          setRoutes(res.data);
          const params = {
            ids: res.data.map(({ id }) => id)
          };
          api
            .getFinances(params)
            .then(res => {
              console.log('getFinances');
              const { finances } = res.data;
              setFinances(finances);
            })
            .catch(e => console.log(JSON.stringify(e)));
        })
        .catch(e => console.log(JSON.stringify(e))),
      api
        .getPackages(
          selectedWeekStart,
          endOfWeek(selectedWeekStart, { weekStartsOn: 1 })
        )
        .then(res => {
          console.log('getPackages');
          setParcels(res.data.packages);
        })
        .catch(e => console.log(JSON.stringify(e)))
    ])
      .then(results =>
        results.forEach(result => console.log(' promise all result= ', result))
      )
      .catch(error => console.log(error));
  }, [selectedWeekStart]);

  useEffect(() => {
    setExportData(calculateFinance(finances, routes, selectedDay, parcels));
  }, [finances, routes, parcels]);
  console.log('export data', exportData);
  console.log('routes == ', routes);
  console.log('finances == ', finances);
  console.log('parcels == ', parcels);
  const exportToExcel = () =>
    new xlsExport(exportData.dataToExport || [], 'test.xls') || [];

  return (
    <Grid className={classes.gridMargin} container direction="row">
      <Grid item xs={12}>
        <WeekFinanceHeader
          checkState={checkState}
          loading={loading}
          selectedDay={selectedDay}
          selectedWeekStart={selectedWeekStart}
          setCheckState={setCheckState}
          setLoading={setLoading}
          setSelectedDay={setSelectedDay}
          setSelectedWeekStart={setSelectedWeekStart}
        />
      </Grid>
      <Grid className={classes.gridMargin} item xs={12}>
        <WeekFinanceTable
          checkState={checkState}
          daySum={exportData.dayResult}
          exportToExcel={exportToExcel}
          exportData={exportData}
          finances={finances}
          loading={loading}
          localDataParcels={exportData.parcelsData}
          localDataRoutes={exportData.routesData}
          parcels={parcels}
          routes={routes}
          selectedDay={selectedDay}
          selectedWeekStart={selectedWeekStart}
          setExportData={setExportData}
          setFinances={setFinances}
          setParcels={setParcels}
          setSelectedWeekStart={setSelectedWeekStart}
          totalPerDayPackages={exportData.parcelsResult}
          totalPerDayRoutes={exportData.routesResult}
        />
      </Grid>
    </Grid>
  );
}

export default WeekFinance;
