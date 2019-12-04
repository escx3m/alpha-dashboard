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
  },
  gridCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundName: {
    "&:nth-child(odd)": {
      background: 'rgb(244,249,253)',
    },
  },
  borderGrid: {
    borderBottom: '1px solid #3f51b5',
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  paddingGrid: {
    paddingTop: '8px',
    paddingBottom: '8px',
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
  const canceledState = 5;
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
        routes.forEach(route => {
          const passengers = route.passengers.filter(passenger => {
            if (passenger.state !== canceledState) {
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
  const currentSms = alreadySendSms.filter(sms => isSameDay(new Date(sms.sendTime), new Date(selectedDate)));
  const currentSmsIds = currentSms.map(({ passengerId }) => passengerId);
  console.log(currentSmsIds);
  const uniqueSmsTime = alreadySendSms.reduce((acc, sms) => {
    const sendTimeHours = `0${new Date(sms.sendTime).getHours()}`.slice(-2);
    const sendTimeMinutes = `0${new Date(sms.sendTime).getMinutes()}`.slice(-2);
    const sendSmsTime = sendTimeHours + ':' + sendTimeMinutes; 
    if (!acc.includes(sendSmsTime)) {
      acc.push(sendSmsTime); 
    }
    return acc;
  }, []); 
  uniqueSmsTime.sort();
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3} >
        <Grid item xs={3}>
          <Paper>
            <Calendar style={{overflow: "hidden"}} {...pickerProps} />  
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Card className={classes.card}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <CachedIcon />
                </IconButton>
              }
              title="SMS уведомление"
            />
            <CardContent>
              {uniqueSmsTime.map((smsTime, i) => {
                const passengersIdsAtTime = alreadySendSms.reduce((acc, sms) => {
                  const sendTimeHours = `0${new Date(sms.sendTime).getHours()}`.slice(-2);
                  const sendTimeMinutes = `0${new Date(sms.sendTime).getMinutes()}`.slice(-2);
                  const sendSmsTime = sendTimeHours + ':' + sendTimeMinutes; 
                  if (!acc.includes(sms.passengerId) && sendSmsTime === smsTime) {
                    acc.push(sms.passengerId); 
                  }
                  return acc;
                }, [])
                console.log(passengersIdsAtTime);
                return (
                  <Expansion>
                    <ExpansionHeader
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Grid item xs={4}>{smsTime}</Grid>
                      <Grid item xs={4}>
                      </Grid>
                    </ExpansionHeader>
                    <ExpansionBody>
                      <Grid container >
                      {currentRoutes.map((route, i) => {
                        const routeTime = new Date(route.fromTime);
                        const correctPassengers = route.passengers.filter(passenger => passenger.state !== canceledState && passengersIdsAtTime.includes(passenger.id));
                        const passengersCount = correctPassengers.length;
                        
                        return (
                          <Grid item xs={12}>
                            <Expansion>
                              <ExpansionHeader
                                expandIcon={<ExpandMoreIcon />}
                              >
                                <Grid item xs={3}>{`${citiesName[route.fromCityId]}-${citiesName[route.toCityId]}`}</Grid>
                                <Grid item xs={3} className={classes.gridCenter}> Время рейса:&nbsp;
                                  {`0${routeTime.getHours()}`.slice(-2) 
                                    + ':' + `0${routeTime.getMinutes()}`.slice(-2)}
                                </Grid>
                                <Grid item xs={1}>{passengersCount}</Grid>
                                <Grid item xs={3} className={classes.gridCenter}><Link href={`${routeIdTemplate}${route.id}`} target="_blank">Crmbus</Link></Grid>
                              </ExpansionHeader>
                              <ExpansionBody>
                                <Grid container>
                                <Grid container xs={12} className={classes.borderGrid}>
                                <Grid xs={3} item>
                                <strong>Фамилия Имя Отчество</strong>
                              </Grid>
                              <Grid xs={3} item className={classes.gridCenter}>
                              <strong>Номер телефона</strong>
                              </Grid>
                              <Grid xs={3} item className={classes.gridCenter}>
                              <strong>Кол-во SMS/Людей в рейсе</strong>
                              </Grid>
                              </Grid>
                                {
                                  correctPassengers.map(p => {
                                    return (
                                      <Grid container xs={12} className={classes.backgroundName}>
                                    <Grid xs={3} item className={classes.paddingGrid}>
                                      {p.surname + ' ' 
                                        + p.name + ' ' 
                                        + p.patronymic + ' '
                                      }
                                    </Grid>
                                    <Grid xs={3} item className={classes.gridCenter}>
                                      +{
                                        + p.phone
                                      }
                                    </Grid>
                                    <Grid xs={3} item className={classes.gridCenter}>
                                      50/12
                                    </Grid>
                                    </Grid>
                                    )
                                })}
                                </Grid>
                              </ExpansionBody>
                            </Expansion>
                          </Grid>
                        );
                      })}
                      </Grid>
                    </ExpansionBody>
                  </Expansion>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Sms;
