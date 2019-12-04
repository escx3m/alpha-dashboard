import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Calendar, useStaticState } from '@material-ui/pickers';
import CachedIcon from '@material-ui/icons/Cached';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RangePickerANTD from '../DatePicker/rangepickerANTD';
import { makeJSDateObject } from '../../helpers/helpers';
import { citiesName } from '../../helpers/constants';
import axios from 'axios';
import { Grid, Card, CardContent, CardHeader, Paper,
  IconButton, Button, CircularProgress, Link, Typography,
  ExpansionPanel as Expansion,
  ExpansionPanelSummary as ExpansionHeader,
  ExpansionPanelDetails as ExpansionBody
} from '@material-ui/core';
import { 
  startOfDay, endOfDay, isSameDay, 
  startOfToday, endOfToday, startOfWeek, endOfWeek } from 'date-fns';

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
  const [alreadySendSms, setAlreadySendSms] = useState([]);
  const [start, setStart] = useState(startOfWeek(makeJSDateObject(selectedDate), {
    weekStartsOn: 1
  }));
  const [end, setEnd] = useState(endOfWeek(start, { weekStartsOn: 1 }));
  const routeIdTemplate = 'http://crmbus.ru/#/company/6/route/'; //route.id
  const handleToday = () =>
    setSelectedDate(startOfToday(), setSelectedDate(endOfToday()));
  const { pickerProps, wrapperProps } = useStaticState({
    value: selectedDate, 
    onChange: e => {
      console.log('day change ',e)
      setSelectedDate(e)
    }
  });
 
  const passengersIds = [];
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:9000/api/routes', {
        params: {
          startWeek: startOfDay(selectedDate),
          endWeek: endOfDay(selectedDate)
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
            setAlreadySendSms(res.data); 
          })
          .catch(e => console.log(e.toString()));
          setLoading(false);
      });
      
  }, [selectedDate]);

  const currentRoutes = allRoutes.filter(route => isSameDay(new Date(route.fromTime), new Date(selectedDate)));

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
                <div>
                  {currentRoutes.map((route, i) => {
                    const routeTime = new Date(route.fromTime);
                    return (
                      <Grid
                        className={classes.gridMarginTop}
                        container
                        key={i}
                        spacing={1}
                      >
                        <Grid item xs={12}>
                          <Expansion>
                            <ExpansionHeader
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Grid item xs={4}>{`${citiesName[route.fromCityId]}-${citiesName[route.toCityId]}`}</Grid>
                              <Grid item xs={4}>
                                {`0${routeTime.getHours()}`.slice(-2) 
                                  + ':' + `0${routeTime.getMinutes()}`.slice(-2)}
                              </Grid>
                              <Grid item xs={4}><Link href={`${routeIdTemplate}${route.id}`} target="_blank">Crmbus</Link></Grid>
                            </ExpansionHeader>
                            <ExpansionBody>
                              <Grid container>
                              {
                                route.passengers.map(p => {
                                  return (
                                    <Grid xs={12} item>
                                      {p.surname + ' ' 
                                        + p.name + ' ' 
                                        + p.patronymic + ' '
                                        + p.phone
                                      }
                                    </Grid>
                                  )
                              })}
                              </Grid>
                            </ExpansionBody>
                          </Expansion>
                        </Grid>
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
