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
  const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), { weekStartsOn: 1 });
  const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart);
  const [routes, setRoutes] = useState([]);
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

  const { api } = useContext(ApiContext);

  useEffect(() => {
    api.getRoutes(selectedWeekStart, endOfWeek(selectedWeekStart, { weekStartsOn: 1 }))
      .then(res => {
        setRoutes(res.data);
      });
  }, [selectedWeekStart]);

  return (
    <Grid className={classes.gridMargin} container direction="row"> 
      <Grid item xs={12}>
        <WeekFinanceHeader 
          loading={loading} 
          setLoading={setLoading}
          selectedWeekStart={selectedWeekStart}
          setSelectedWeekStart={setSelectedWeekStart}
          checkState={checkState}
          setCheckState={setCheckState}
        />
      </Grid>
      <Grid className={classes.gridMargin} item xs={12}>
        <WeekFinanceTable 
          routes={routes} 
          loading={loading}
          selectedWeekStart={selectedWeekStart}
          setSelectedWeekStart={setSelectedWeekStart}
          checkState={checkState}
        />
      </Grid>
    </Grid>
  );
}

export default WeekFinance;
