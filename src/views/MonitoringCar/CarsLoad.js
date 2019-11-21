import React, { useState, useEffect } from 'react';
// import CarsLoadTable from './carsLoad/CarsLoadTable';
// import CarsLoadHeader from './carsLoad/CarsLoadHeader';

import CarsLoadTable from '../MonitoringCar/carsLoad/CarsLoadTable';
import CarsLoadHeader from '../MonitoringCar/carsLoad/CarsLoadHeader';

import { Grid } from '@material-ui/core';
import axios from 'axios';
import { startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { makeJSDateObject } from '../../helpers/helpers';
                 
import { makeStyles } from '@material-ui/core/styles';
       
const useStyles = makeStyles(theme => ({
  //  "@global": {
  //   ".mnoButton-button": {
  //     backgroundColor: "#2196f3"
  //   },
  //   ".mnoButton-buttonDark": {
  //     backgroundColor: "#880e4f"
  //   },
  //   ".mnoButton-buttonLight": {
  //     backgroundColor: "#e1bee7"
  //   }
  // },
  gridMargin: {
    marginTop:'30px',
  }
}));


function CarsLoad() {
  const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), { weekStartsOn: 1 });
  const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const end = endOfWeek(selectedWeekStart, { weekStartsOn: 1 });
  const start = selectedWeekStart;
  const classes = useStyles();
  const [checkState, setCheckState] = React.useState({
    checked8: false,
    checked7: false,
    checked6: false,
    checked5: false,
    checked4: false,
    checkedAll: true,
  });

  useEffect(() => {
    setLoading(true);
   axios.get('http://localhost:5000/api/trips', {
    params: {
      startWeek: start,
      endWeek: end
    }})
    .then(res => {
      setLoading(false);
      const routes = res.data;
      console.log('data recieved');
      const cars = routes.reduce((acc, route) => {
        if(route.carId && !acc.includes(route.carId)) {
          acc.push(route.carId);
        }
        return acc;
      }, []);
      console.log(cars);
      const result = cars.map((carId) => {
        const { car, carScheme: { seats } } = routes.find((route) => route.carId === carId);
        const carRoutes = routes.filter((route) => carId === route.carId);
        return { car, scheme: seats, carRoutes };
      });
      setCars(result);
   });
 
  }, [selectedWeekStart]);

  return (
    <Grid className={classes.gridMargin} container direction="row"> 
      <Grid item xs={12}>
        <CarsLoadHeader 
          loading={loading} 
          setLoading={setLoading}
          selectedWeekStart={selectedWeekStart}
          setSelectedWeekStart={setSelectedWeekStart}
          checkState={checkState}
          setCheckState={setCheckState}
        />
      </Grid>
      <Grid className={classes.gridMargin} item xs={12}>
        <CarsLoadTable 
          cars={cars} 
          loading={loading}
          selectedWeekStart={selectedWeekStart}
          setSelectedWeekStart={setSelectedWeekStart}
          checkState={checkState}
        />
      </Grid>
    </Grid>
  );
}

export default CarsLoad;
