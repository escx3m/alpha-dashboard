import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { startOfWeek, endOfWeek } from 'date-fns';
import { makeJSDateObject } from '../../helpers/helpers';
import { makeStyles } from '@material-ui/core/styles';
import CarsLoadTable from '../MonitoringCar/carsLoad/CarsLoadTable';
import CarsLoadHeader from '../MonitoringCar/carsLoad/CarsLoadHeader';
import { ApiContext } from '../../Routes';

const useStyles = makeStyles(theme => ({
  gridMargin: {
    marginTop: '30px'
  }
}));

function CarsLoad() {
  const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), {
    weekStartsOn: 1
  });
  const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = selectedWeekStart;
  const end = endOfWeek(selectedWeekStart, { weekStartsOn: 1 });
  const classes = useStyles();
  const [checkState, setCheckState] = React.useState({
    checked8: false,
    checked7: false,
    checked6: false,
    checked5: false,
    checked4: false,
    checkedAll: true
  });

  const { api } = useContext(ApiContext);

  useEffect(() => {
    setLoading(true);
    api.getTrips(start, end).then(res => {
      setLoading(false);
      const routes = res.data;
      const cars = routes.reduce((acc, route) => {
        if (route.carId && !acc.includes(route.carId)) {
          acc.push(route.carId);
        }
        return acc;
      }, []);
      const result = cars.map(carId => {
        const {
          car,
          carScheme: { seats }
        } = routes.find(route => route.carId === carId);
        const carRoutes = routes.filter(route => carId === route.carId);
        return { car, scheme: seats, carRoutes };
      });
      setCars(result);
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
        <CarsLoadHeader
          checkState={checkState}
          loading={loading}
          selectedWeekStart={selectedWeekStart}
          setCheckState={setCheckState}
          setLoading={setLoading}
          setSelectedWeekStart={setSelectedWeekStart}
        />
      </Grid>
      <Grid
        className={classes.gridMargin}
        item
        xs={12}
      >
        <CarsLoadTable
          cars={cars}
          checkState={checkState}
          loading={loading}
          selectedWeekStart={selectedWeekStart}
          setSelectedWeekStart={setSelectedWeekStart}
        />
      </Grid>
    </Grid>
  );
}

export default CarsLoad;
