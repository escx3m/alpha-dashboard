import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Calendar, useStaticState } from '@material-ui/pickers';
import CachedIcon from '@material-ui/icons/Cached';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RangePickerANTD from '../DatePicker/rangepickerANTD';
import { makeJSDateObject } from '../../helpers/helpers';
import { cityShortNames as citiesName, isPassenger } from '../../helpers/constants';
import axios from 'axios';
import { Grid, Card, CardContent, CardHeader, Paper,
  IconButton, Button, CircularProgress, Link, Typography,
  ExpansionPanel as Expansion,
  ExpansionPanelSummary as ExpansionHeader,
  ExpansionPanelDetails as ExpansionBody
} from '@material-ui/core';
import { 
  startOfDay, endOfDay, isSameDay, differenceInHours, 
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
  const [expanded, setExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allRoutes, setAllRoutes] = useState([]);
  const [uniqueRoutes, setUniqueRoutes] = useState([]);
  const [allSendSms, setAllSendSms] = useState([]);
  const [alreadySendSms, setAlreadySendSms] = useState([]);
  const routeIdTemplate = 'http://crmbus.ru/#/company/6/route/'; //route.id
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleToday = () =>
    setSelectedDate(startOfToday(), setSelectedDate(endOfToday()));
  const { pickerProps, wrapperProps } = useStaticState({
    value: selectedDate, 
    onChange: e => {setSelectedDate(e)}
  });
  const canceledState = 5;
  const passengersIds = [];
  const currentPhones = [];
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
            if (passenger.state !== canceledState && passenger.type === isPassenger) {
              passengersIds.push(passenger.id);
            }
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
        routes.forEach(route => route.passengers.forEach(passenger => {
          if (passenger.phone_2 != '') { 
            currentPhones.push(passenger.phone, passenger.phone_2)
          } else {
            currentPhones.push(passenger.phone)
          }
        }));
        axios
          .get('http://localhost:9000/api/smssend',{
              params: {
                phones: currentPhones, 
              }
            })
            .then(res => {
              setAllSendSms(res.data); 
            })
            .catch(e => console.log(e.toString()));
        setLoading(false);
      });
      
  }, [selectedDate]);

  const currentRoutes = allRoutes.filter(route => isSameDay(new Date(route.fromTime), new Date(selectedDate)));
  const currentSms = alreadySendSms.filter(sms => differenceInHours(new Date(sms.sendTime), new Date(selectedDate)) < 24);
  const selectedDateSendSms = allSendSms.filter(sendSms => differenceInHours(new Date(sendSms.sendTime), new Date(selectedDate)) < 24)
  const uniqueSmsDateTime = currentSms.reduce((acc, sms) => {
    const sendTimeHours = `0${new Date(sms.sendTime).getHours()}`.slice(-2);
    const sendTimeMinutes = `0${new Date(sms.sendTime).getMinutes()}`.slice(-2);
    const sendDate = `0${new Date(sms.sendTime).getDate()}`.slice(-2);
    const sendMonth = `0${new Date(sms.sendTime).getMonth() + 1}`.slice(-2);
    const sendSmsDateTime = sendDate + '.' + sendMonth + ' в ' + sendTimeHours + ':' + sendTimeMinutes; 
    if (!acc.includes(sendSmsDateTime)) {
      acc.push(sendSmsDateTime); 
    }
    return acc;
  }, []);
  uniqueSmsDateTime.sort();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} >
        <Grid item xs={3}>
          <Paper><Calendar style={{overflow: "hidden"}} {...pickerProps} /></Paper>
        </Grid>
        <Grid item container xs={9}>
          <Card className={classes.card}>
            <CardHeader
              action={<IconButton aria-label="settings"><CachedIcon /></IconButton>}
                title={<div>SMS уведомление<br/><br/> Всего: {currentSms.length} </div>}
            />
            <CardContent>
              {uniqueSmsDateTime.map((smsTime, i) => {
                const passengersIdsAtTime = currentSms.reduce((acc, sms) => {
                  const sendTimeHours = `0${new Date(sms.sendTime).getHours()}`.slice(-2);
                  const sendTimeMinutes = `0${new Date(sms.sendTime).getMinutes()}`.slice(-2);
                  const sendSmsDateTime = sendTimeHours + ':' + sendTimeMinutes; 
                  if (!acc.includes(sms.passengerId) && sendSmsDateTime === smsTime) {
                    acc.push(sms.passengerId); 
                  }
                  return acc;
                }, []);
                const passengersIdsSendSms = selectedDateSendSms.reduce((acc, sendSms) => {
                  const sendTimeHours = `0${new Date(sendSms.sendTime).getHours()}`.slice(-2);
                  const sendTimeMinutes = `0${new Date(sendSms.sendTime).getMinutes()}`.slice(-2);
                  const sendSmsDateTime = sendTimeHours + ':' + sendTimeMinutes; 
                  if (!acc.includes(sendSms.phone)) {
                    acc.push(sendSms.phone); 
                  }
                  return acc;

                }, []); 
                const smsCount = passengersIdsAtTime.length;

                return (
                  <Expansion 
                    key={i} 
                    expanded={expanded === `panel${i}`} 
                    onChange={handleChange(`panel${i}`)}
                  >
                    <ExpansionHeader expandIcon={<ExpandMoreIcon />}>
                      <Grid container>
                        <Grid container item xs={12} direction="row" style={{paddingBottom: 10}}>
                          <Grid item xs={2}><strong>{smsTime}</strong></Grid>
                          <Grid item xs={2} className={classes.gridCenter}><strong>Отправлено: {smsCount}</strong></Grid>
                        </Grid>
                        {expanded === `panel${i}` ?
                        <Grid container item xs={12} direction="row">
                          <Grid item xs={3}>Направление</Grid>
                          <Grid item xs={3} className={classes.gridCenter}>Время рейса</Grid>
                          <Grid item xs={3} className={classes.gridCenter}>СМС/Пассажиры</Grid>
                          <Grid item xs={3}></Grid>
                        </Grid>
                        : ''}
                      </Grid>
                    </ExpansionHeader>
                    <ExpansionBody>
                      <Grid container >
                      {currentRoutes.map((route, j) => {
                        const routeTime = new Date(route.fromTime);
                        const totalPassengers = route.passengers.filter(passenger => passenger.state !== canceledState 
                          && passenger.type === isPassenger).length;
                        const correctPassengers = route.passengers.filter(passenger => passenger.state !== canceledState 
                          && passengersIdsAtTime.includes(passenger.id)
                          && passenger.type === isPassenger);
                        const routePassengers = route.passengers.filter(passenger => 
                          passenger.state !== canceledState && passenger.type === isPassenger)
                        const passengersCount = correctPassengers.length;
                        return (
                          //passengersCount ?
                          <Grid item xs={12} key={j}>
                            <Expansion>
                              <ExpansionHeader expandIcon={<ExpandMoreIcon />}>
                                <Grid item xs={3}>{`${citiesName[route.fromCityId]} - ${citiesName[route.toCityId]}`}</Grid>
                                <Grid item xs={3} className={classes.gridCenter}>
                                  {`0${routeTime.getHours()}`.slice(-2) 
                                    + ':' + `0${routeTime.getMinutes()}`.slice(-2)}
                                </Grid>
                                  <Grid item xs={3} className={classes.gridCenter}>{passengersCount} / {totalPassengers}</Grid>
                                  <Grid item xs={3} className={classes.gridCenter}>
                                    <Link href={`${routeIdTemplate}${route.id}`} target="_blank">Crmbus</Link>
                                  </Grid>
                              </ExpansionHeader>
                              <ExpansionBody>
                                <Grid container>
                                  <Grid container className={classes.borderGrid}>
                                    <Grid xs={4} item><strong>ФИО</strong></Grid>
                                    <Grid xs={4} item className={classes.gridCenter}><strong>Номер</strong></Grid>
                                    <Grid xs={4} item className={classes.gridCenter}><strong>Время</strong></Grid>
                                  </Grid>
                                  {
                                    //correctPassengers.map((p, k) => {
                                      //const fromCrmbus = selectedDateSendSms.filter(sendSms => 
                                              //sendSms.phone === p.phone || sendSms.phone === p.phone_2)
                                      //const sendTimeCrmBus = fromCrmbus.length > 0
                                        //? (`0${new Date(fromCrmbus[0].sendTime).getHours()}`.slice(-2) + ':' 
                                        //+ `0${new Date(fromCrmbus[0].sendTime).getMinutes()}`.slice(-2))
                                        //: '';
                                      //return (
                                        //<Grid container className={classes.backgroundName} key={k}>
                                          //<Grid xs={4} item className={classes.paddingGrid}>
                                            //{p.surname + ' ' + p.name + ' ' + p.patronymic + ' '}
                                          //</Grid>
                                          //<Grid xs={4} item className={classes.gridCenter}>{p.phone}</Grid>
                                            //<Grid xs={4} item className={classes.gridCenter}>{sendTimeCrmBus}</Grid>
                                        //</Grid>
                                      //)
                                    routePassengers.map((p, k) => {
                                      const fromCrmbus = selectedDateSendSms.filter(sendSms => 
                                              sendSms.phone === p.phone || sendSms.phone === p.phone_2)
                                      const sendTimeCrmBus = fromCrmbus.length > 0
                                        ? (`0${new Date(fromCrmbus[0].sendTime).getHours()}`.slice(-2) + ':' 
                                        + `0${new Date(fromCrmbus[0].sendTime).getMinutes()}`.slice(-2))
                                        : '';
                                      return (
                                        <Grid container className={classes.backgroundName} key={k}>
                                          <Grid xs={4} item className={classes.paddingGrid}>
                                            {p.surname + ' ' + p.name + ' ' + p.patronymic + ' '}
                                          </Grid>
                                          <Grid xs={4} container item direction="column" className={classes.gridCenter}>
                                            <Grid item className={classes.gridCenter}>{p.phone}</Grid>
                                            <Grid item className={classes.gridCenter}>{p.phone_2 ? p.phone_2 : ''}</Grid>
                                          </Grid>
                                          <Grid xs={4} item className={classes.gridCenter}>{sendTimeCrmBus}</Grid>
                                        </Grid>
                                      )
                                  })}
                                </Grid>
                              </ExpansionBody>
                            </Expansion>
                          </Grid>
                          //: ''
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
