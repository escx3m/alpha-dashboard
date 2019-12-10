import React, { useState, useEffect } from 'react';
import WeekFinanceTable from './weekFinance/WeekFinanceTable';
import WeekFinanceHeader from './weekFinance/WeekFinanceHeader';
import { Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { startOfWeek, endOfWeek } from 'date-fns';
import { makeJSDateObject } from '../../helpers/helpers';
                 
const useStyles = makeStyles(theme => ({
  gridMargin: {
    marginTop:'30px',
  }
}));

function WeekFinance() {
  const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), { weekStartsOn: 1 });
  const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [routes, setRoutes] = useState([]);
  const [finances, setFinances] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [checkState, setCheckState] = React.useState({
    checked8: false,
    checked7: false,
    checked6: false,
    checked5: false,
    checked4: false,
    checkedAll: true,
  });
  let routesIds = [];

  useEffect(() => {
    axios.get('http://localhost:9000/api/routes', {
      params: {
        startWeek: selectedWeekStart,
        endWeek: endOfWeek(selectedWeekStart, { weekStartsOn: 1 })
      }})
      .then(res => {
        routesIds = res.data.map(({ id }) => id)
        setRoutes(res.data);
        axios.get('http://localhost:9000/api/board/finances', {
          params: {
            ids: routesIds
          }}) 
          .then(res => {
            const { finances } = res.data;
            setFinances(finances);
          });
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
