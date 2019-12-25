import React, { useState, useEffect, useContext } from 'react';
import WeekFinanceTable from './weekFinance/WeekFinanceTable';
import WeekFinanceHeader from './weekFinance/WeekFinanceHeader';
import { Grid, makeStyles } from '@material-ui/core';
import { startOfWeek, endOfWeek } from 'date-fns';
import { makeJSDateObject } from '../../helpers/helpers';
import { ApiContext } from '../../Routes';
                 
const useStyles = makeStyles(theme => ({
  gridMargin: {
    marginTop:'30px',
  }
}));

function WeekFinance() {
  const { api } = useContext(ApiContext);
  const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), { weekStartsOn: 1 });
  const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [routes, setRoutes] = useState([]);
  const [finances, setFinances] = useState([]);
  const [loading, setLoading] = useState(false);
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
    checkedAll: true,
  });
  let routesIds = [];

  useEffect(() => {
    api.getRoutes(selectedWeekStart, endOfWeek(selectedWeekStart, { weekStartsOn: 1 }))
      .then(res => {
        routesIds = res.data.map(({ id }) => id)
        setRoutes(res.data);
        const params = {
          //ids: routesIds
          ids: res.data.map(({ id }) => id)
        }
        api.getFinances(params)
          .then(res => {
            const { finances } = res.data;
            setFinances(finances);
          })
          .catch(e => console.log(JSON.stringify(e)));
      });
  }, [selectedWeekStart]);

  return (
    <Grid className={classes.gridMargin} container direction="row"> 
      <Grid item xs={12}>
        <WeekFinanceHeader
          loading={loading}
          setLoading={setLoading}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedWeekStart={selectedWeekStart}
          setSelectedWeekStart={setSelectedWeekStart}
          checkState={checkState}
          setCheckState={setCheckState}
        />
      </Grid>
      <Grid className={classes.gridMargin} item xs={12}>
        <WeekFinanceTable
          routes={routes}
          finances={finances}
          setFinances={setFinances}
          loading={loading}
          selectedDay={selectedDay}
          selectedWeekStart={selectedWeekStart}
          setSelectedWeekStart={setSelectedWeekStart}
          checkState={checkState}
        />
      </Grid>
    </Grid>
  );
}

export default WeekFinance;
