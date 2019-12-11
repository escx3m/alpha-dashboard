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
    checked8: false,
    checked7: false,
    checked6: false,
    checked5: false,
    checked4: false,
    checkedAll: true,
  });
  let routesIds = [];

  useEffect(() => {
    api.getRoutes(selectedWeekStart, endOfWeek(selectedWeekStart, { weekStartsOn: 1 }))
      .then(res => {
        routesIds = res.data.map(({ id }) => id)
        setRoutes(res.data);
        const params = {
          ids: routesIds
        }
        api.getFinances(params)
          .then(res => {
            const { finances } = res.data;
            console.log('finances ', finances)
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
