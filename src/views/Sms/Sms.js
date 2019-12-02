import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Calendar, useStaticState } from '@material-ui/pickers';
import CachedIcon from '@material-ui/icons/Cached';
import RangePickerANTD from '../DatePicker/rangepickerANTD';
import { makeJSDateObject } from '../../helpers/helpers';
import { citiesName } from '../../helpers/constants';
import axios from 'axios';
import { Grid, Card, CardContent, CardHeader, Paper,
  IconButton, Button, CircularProgress
} from '@material-ui/core';
import { startOfToday, endOfToday, startOfWeek, endOfWeek } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  card: {
    maxWidth: 900,
    width: '100%'
  },
  headInfo: {
    background: 'rgb(244,249,253)',
    width: '100%',
    padding: '12px',
    fontSize: '20px'
  },
  trip: {
    marginLeft: '10px'
  },
  spanSumm: {
    float: 'right',
    marginRight: '10px'
  },
  gridMarginTop: {
    marginTop: '5px'
  },
  gridCardPas: {
    marginTop: '50px'
  },
  btn: {
    width: '150px',
    height: '50px',
    border: '1px solid #3f51b5',
    background: 'white',
    color: 'black',
    fontSize: '18px'
  },
  progress: {
    marginTop: '20px',
    textAlign: 'center'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const Sms = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allRoutes, setAllRoutes] = useState([]);
  const [uniqueRoutes, setUniqueRoutes] = useState([]);
  const [start, setStart] = useState(startOfWeek(makeJSDateObject(selectedDate), {
    weekStartsOn: 1
  }));
  const [end, setEnd] = useState(endOfWeek(start, { weekStartsOn: 1 }));
  const handleToday = () =>
    setSelectedDate(startOfToday(), setSelectedDate(endOfToday()));
  const { pickerProps, wrapperProps } = useStaticState({
    value: selectedDate, 
    onChange: setSelectedDate
  });
 
  const passengersIds = [];
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:9000/api/routes', {
        params: {
          startWeek: startOfToday(),
          endWeek: endOfToday()
        }
      })
      .then(res => {
        const routes = res.data;
        const uniqueRoutes = routes.reduce((acc, route) => {
          const way = `${route.fromCityId}-${route.toCityId}`;
          if (way && !acc.includes(way)) {
            acc.push(way);
          }
          return acc;
        }, []);
        setUniqueRoutes(uniqueRoutes);
        setAllRoutes(routes);
        console.log('allRoutes ', routes);

        routes.forEach(route => {
          const passengers = route.passengers.filter(passenger => {
            if (passenger.state !== 5) {
              passengersIds.push(passenger.id);
            }
            return;
          })
        }); 
        axios.get('http://localhost:9000/api/sms',{
          params: {
            ids: passengersIds, 
          }
        })
        .then(res => {
          console.log('get sms');
        })
        .catch();
        setLoading(false);
      });
  }, [start]);

  return (
      <div className={classes.root}>
        <Grid container spacing={3} >
          <Grid item xs={3}>
            <Paper>
              <Calendar style={{overflow: "hidden"}} {...pickerProps} />  
            </Paper>
          </Grid>
          <Grid item xs={9} >
            <Card className={classes.card}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <CachedIcon />
                  </IconButton>
                }
                title="SMS"
              />
              <CardContent>
                <Grid className={classes.headInfo}>
                  <span className={classes.trip}>Рейсы</span>
                  <span className={classes.spanSumm}>Количество</span>
                </Grid>
                <div>
                  {uniqueRoutes.map((way, i) => {
                    const idCityFrom = Number(way.slice(0, way.indexOf('-')));
                    const idCityTo = Number(way.slice(way.indexOf('-') + 1));
                    return (
                      <Grid
                        className={classes.gridMarginTop}
                        container
                        key={i}
                        spacing={1}
                      >
                        <Grid item xs={10}>{`${citiesName[idCityFrom]}-${citiesName[idCityTo]}`}</Grid>
                        <Grid item xs={2}>{}</Grid>
                      </Grid>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
  );
};

export default Sms;
