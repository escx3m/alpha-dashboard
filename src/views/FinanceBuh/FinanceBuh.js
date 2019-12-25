import React, { useState, useEffect, useContext } from 'react';
import WeekFinanceTable from './weekFinance/WeekFinanceTable';
import WeekFinanceHeader from './weekFinance/WeekFinanceHeader';
import { Grid, makeStyles } from '@material-ui/core';
import { startOfWeek, endOfWeek } from 'date-fns';
import { makeJSDateObject } from '../../helpers/helpers';
import { ApiContext } from '../../Routes';

const useStyles = makeStyles(theme => ({
  gridMargin: {
    marginTop: '30px'
  }
}));

function WeekFinance() {
  const { api } = useContext(ApiContext);
  const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), {
    weekStartsOn: 1
  });
  const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [routes, setRoutes] = useState([]);
  const [finances, setFinances] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [checkState, setCheckState] = React.useState({
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
    checked7: false,
    checked8: false,
    checked9: false,
    checked10: false,
    checked11: false,
    checked12: false,
    checked13: false,
    checkedAll: true
  });
  let routesIds = [];

  useEffect(() => {
    api
      .getRoutes(
        selectedWeekStart,
        endOfWeek(selectedWeekStart, { weekStartsOn: 1 })
      )
      .then(res => {
        routesIds = res.data.map(({ id }) => id);
        setRoutes(res.data);
        const params = {
          //ids: routesIds
          ids: res.data.map(({ id }) => id)
        };
        api
          .getFinances(params)
          .then(res => {
            const { finances } = res.data;
            setFinances(finances);
          })
          .catch(e => console.log(JSON.stringify(e)));
      });
  }, [selectedWeekStart]);

  return (
    <Grid
      className={classes.gridMargin}
      container
      direction="row"
    >
      <Grid
        item
        xs={12}
      >
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
      <Grid
        className={classes.gridMargin}
        item
        xs={12}
      >
        <WeekFinanceTable
          checkState={checkState}
          finances={finances}
          loading={loading}
          routes={routes}
          selectedDay={selectedDay}
          selectedWeekStart={selectedWeekStart}
          setFinances={setFinances}
          setSelectedWeekStart={setSelectedWeekStart}
        />
      </Grid>
    </Grid>
  );
}

export default WeekFinance;
