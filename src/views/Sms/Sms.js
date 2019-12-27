import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Calendar, useStaticState } from '@material-ui/pickers';
import CachedIcon from '@material-ui/icons/Cached';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  cityShortNames as citiesName,
  isPassenger,
  canceledState
} from '../../helpers/constants';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Paper,
  IconButton,
  Link,
  Button,
  ExpansionPanel as Expansion,
  ExpansionPanelSummary as ExpansionHeader,
  ExpansionPanelDetails as ExpansionBody
} from '@material-ui/core';
import {
  isSameDay,
  differenceInHours,
  startOfDay,
  endOfDay,
  startOfToday,
  endOfToday
} from 'date-fns';
import { ApiContext } from '../../Routes';

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
    justifyContent: 'center'
  },
  backgroundName: {
    '&:nth-child(odd)': {
      background: 'rgb(244,249,253)'
    }
  },
  borderGrid: {
    borderBottom: '1px solid #3f51b5',
    paddingTop: '8px',
    paddingBottom: '8px'
  },
  paddingGrid: {
    paddingTop: '8px',
    paddingBottom: '8px'
  },
  btnOpenClose: {
    marginBottom: '10px'
  }
}));

const Sms = () => {
  const classes = useStyles();
  const [openAll, setOpenAll] = useState(true);
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
    onChange: e => {
      setSelectedDate(e);
    }
  });
  const passengersIds = [];
  const currentPhones = [];

  const { api } = useContext(ApiContext);

  useEffect(() => {
    setLoading(true);
    api
      .getRoutes(startOfDay(selectedDate), endOfDay(selectedDate))
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
            if (
              passenger.state !== canceledState &&
              passenger.type === isPassenger
            ) {
              passengersIds.push(passenger.id);
            }
          });
        });
        api
          .getSms(passengersIds)
          .then(res => {
            setAlreadySendSms(res.data);
          })
          .catch(e => console.log(e.toString()));
        routes.forEach(route =>
          route.passengers.forEach(passenger => {
            if (passenger.phone_2 !== '' && passenger.phone_2 !== null) {
              currentPhones.push(passenger.phone, passenger.phone_2);
            } else {
              currentPhones.push(passenger.phone);
            }
          })
        );
        api
          .getSmssend(currentPhones)
          .then(res => {
            setAllSendSms(res.data);
          })
          .catch(e => console.log(e.toString()));
        setLoading(false);
      });
  }, [selectedDate]);

  const currentRoutes = allRoutes.filter(route =>
    isSameDay(new Date(route.fromTime), new Date(selectedDate))
  );
  const currentSms = alreadySendSms.filter(
    sms =>
      differenceInHours(new Date(sms.sendTime), new Date(selectedDate)) < 24
  );
  const currentSmsPassengersIds = currentSms.map(
    ({ passengerId }) => passengerId
  );
  const selectedDateSendSms = allSendSms.filter(
    sendSms =>
      differenceInHours(new Date(sendSms.sendTime), new Date(selectedDate)) < 24
  );
  const uniqueSmsDateTime = currentSms.reduce((acc, sms) => {
    const sendTimeHours = `0${new Date(sms.sendTime).getHours()}`.slice(-2);
    const sendTimeMinutes = `0${new Date(sms.sendTime).getMinutes()}`.slice(-2);
    const sendDate = `0${new Date(sms.sendTime).getDate()}`.slice(-2);
    const sendMonth = `0${new Date(sms.sendTime).getMonth() + 1}`.slice(-2);
    const sendSmsDateTime =
      sendDate +
      '.' +
      sendMonth +
      ' в ' +
      sendTimeHours +
      ':' +
      sendTimeMinutes;
    if (!acc.includes(sendSmsDateTime)) {
      acc.push(sendSmsDateTime);
    }
    return acc;
  }, []);
  uniqueSmsDateTime.sort();

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        size="small"
        variant="contained"
        className={classes.btnOpenClose}
        onClick={() => setOpenAll(!openAll)}
      >
        CLICK
      </Button>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={3}
        >
          <Paper>
            <Calendar
              style={{ overflow: 'hidden' }}
              {...pickerProps}
            />
          </Paper>
        </Grid>
        <Grid
          container
          item
          xs={9}
        >
          <Card className={classes.card}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <CachedIcon />
                </IconButton>
              }
              title={
                <div>
                  SMS уведомление
                  <br />
                  <br /> Всего: {currentSms.length}{' '}
                </div>
              }
            />
            <CardContent>
              {uniqueSmsDateTime.map((smsTime, i) => {
                const passengersIdsAtTime = currentSms.reduce((acc, sms) => {
                  const sendTimeHours = `0${new Date(
                    sms.sendTime
                  ).getHours()}`.slice(-2);
                  const sendTimeMinutes = `0${new Date(
                    sms.sendTime
                  ).getMinutes()}`.slice(-2);
                  const sendSmsDateTime = sendTimeHours + ':' + sendTimeMinutes;
                  if (
                    !acc.includes(sms.passengerId) &&
                    sendSmsDateTime === smsTime.slice(-5)
                  ) {
                    acc.push(sms.passengerId);
                  }
                  return acc;
                }, []);
                const passengersIdsSendSms = selectedDateSendSms.reduce(
                  (acc, sendSms) => {
                    if (!acc.includes(sendSms.phone)) {
                      acc.push(sendSms.phone);
                    }
                    return acc;
                  },
                  []
                );
                const smsCount = passengersIdsAtTime.length;

                return (
                  <Expansion
                    defaultExpanded
                    expanded={expanded === `panel${i}` || expanded === openAll}
                    key={i}
                    onChange={handleChange(`panel${i}`)}
                    TransitionProps={{ unmountOnExit: true }}>
                    <ExpansionHeader expandIcon={<ExpandMoreIcon />}>
                      <Grid container>
                        <Grid
                          container
                          direction="row"
                          item
                          style={{ paddingBottom: 10 }}
                          xs={12}
                        >
                          <Grid
                            item
                            xs={2}
                          >
                            <strong>{smsTime}</strong>
                          </Grid>
                          <Grid
                            className={classes.gridCenter}
                            item
                            xs={2}
                          >
                            <strong>Отправлено: {smsCount}</strong>
                          </Grid>
                        </Grid>
                        {expanded === `panel${i}` ? (
                          <Grid
                            container
                            direction="row"
                            item
                            xs={12}
                          >
                            <Grid
                              item
                              xs={3}
                            >
                              Направление
                            </Grid>
                            <Grid
                              className={classes.gridCenter}
                              item
                              xs={3}
                            >
                              Время рейса
                            </Grid>
                            <Grid
                              className={classes.gridCenter}
                              item
                              xs={3}
                            >
                              СМС/Пассажиры
                            </Grid>
                            <Grid
                              item
                              xs={3}
                            />
                          </Grid>
                        ) : (
                          ''
                        )}
                      </Grid>
                    </ExpansionHeader>
                    <ExpansionBody>
                      <Grid container>
                        {currentRoutes.map((route, j) => {
                          const routeDate = `0${new Date(
                            route.fromTime
                          ).getDate()}`.slice(-2);
                          const routeMonth = `0${new Date(
                            route.fromTime
                          ).getMonth() + 1}`.slice(-2);
                          const routeTime = new Date(route.fromTime);
                          const totalPassengers = route.passengers.filter(
                            passenger =>
                              passenger.state !== canceledState &&
                              passenger.type === isPassenger
                          ).length;
                          const correctPassengers = route.passengers.filter(
                            passenger =>
                              passenger.state !== canceledState &&
                              passengersIdsAtTime.includes(passenger.id) &&
                              passenger.type === isPassenger
                          );
                          const routePassengers = route.passengers.filter(
                            passenger =>
                              passenger.state !== canceledState &&
                              passenger.type === isPassenger
                          );
                          const passengersCount = correctPassengers.length;

                          console.log(smsTime);
                          console.log('route passengers ', routePassengers);
                          console.log('correct passengers ', correctPassengers);
                          return passengersCount ? (
                            <Grid
                              item
                              key={j}
                              xs={12}
                            >
                              <Expansion
                              onChange={handleChange(`panel${i}-${j}`)}
                              expanded={expanded === `panel${i}-${j}` || expanded === openAll}
                                TransitionProps={{ unmountOnExit: true }}
                              >
                                <ExpansionHeader
                                  expandIcon={<ExpandMoreIcon />}
                                >
                                  <Grid
                                    item
                                    xs={3}
                                  >{`${
                                      citiesName[route.fromCityId]
                                    } - ${citiesName[route.toCityId]}`}</Grid>
                                  <Grid
                                    className={classes.gridCenter}
                                    item
                                    xs={3}
                                  >
                                    {routeDate +
                                      '.' +
                                      routeMonth +
                                      ' ' +
                                      `0${routeTime.getHours()}`.slice(-2) +
                                      ':' +
                                      `0${routeTime.getMinutes()}`.slice(-2)}
                                  </Grid>
                                  <Grid
                                    className={classes.gridCenter}
                                    item
                                    xs={3}
                                  >
                                    {passengersCount} / {totalPassengers}
                                  </Grid>
                                  <Grid
                                    className={classes.gridCenter}
                                    item
                                    xs={3}
                                  >
                                    <Link
                                      href={`${routeIdTemplate}${route.id}`}
                                      target="_blank"
                                    >
                                      Crmbus
                                    </Link>
                                  </Grid>
                                </ExpansionHeader>
                                <ExpansionBody>
                                  <Grid container>
                                    <Grid
                                      className={classes.borderGrid}
                                      container
                                    >
                                      <Grid
                                        item
                                        xs={4}
                                      >
                                        <strong>ФИО</strong>
                                      </Grid>
                                      <Grid
                                        className={classes.gridCenter}
                                        item
                                        xs={4}
                                      >
                                        <strong>Номер</strong>
                                      </Grid>
                                      <Grid
                                        className={classes.gridCenter}
                                        item
                                        xs={4}
                                      >
                                        <strong>Дата/Время</strong>
                                      </Grid>
                                    </Grid>
                                    {//correctPassengers.map((p, k) => {
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
                                      correctPassengers.map((p, k) => {
                                        const fromCrmbus = selectedDateSendSms.filter(
                                          sendSms =>
                                            sendSms.phone === p.phone ||
                                          sendSms.phone === p.phone_2
                                        );
                                        const sendTimeCrmBus =
                                        fromCrmbus.length > 0
                                          ? `0${new Date(
                                            fromCrmbus[0].sendTime
                                          ).getDate()}`.slice(-2) +
                                            '.' +
                                            `0${new Date(
                                              fromCrmbus[0].sendTime
                                            ).getMonth() + 1}`.slice(-2) +
                                            ' ' +
                                            `0${new Date(
                                              fromCrmbus[0].sendTime
                                            ).getHours()}`.slice(-2) +
                                            ':' +
                                            `0${new Date(
                                              fromCrmbus[0].sendTime
                                            ).getMinutes()}`.slice(-2)
                                          : '';
                                        return (
                                          <Grid
                                            className={classes.backgroundName}
                                            container
                                            key={k}
                                          >
                                            <Grid
                                              className={classes.paddingGrid}
                                              item
                                              xs={4}
                                            >
                                              {p.surname +
                                              ' ' +
                                              p.name +
                                              ' ' +
                                              p.patronymic +
                                              ' '}
                                            </Grid>
                                            <Grid
                                              className={classes.gridCenter}
                                              container
                                              direction="column"
                                              item
                                              xs={4}
                                            >
                                              <Grid
                                                className={classes.gridCenter}
                                                item
                                              >
                                                {p.phone}
                                              </Grid>
                                              <Grid
                                                className={classes.gridCenter}
                                                item
                                              >
                                                {p.phone_2 ? p.phone_2 : ''}
                                              </Grid>
                                            </Grid>
                                            <Grid
                                              className={classes.gridCenter}
                                              item
                                              xs={4}
                                            >
                                              {sendTimeCrmBus}
                                            </Grid>
                                          </Grid>
                                        );
                                      })}
                                  </Grid>
                                </ExpansionBody>
                              </Expansion>
                            </Grid>
                          ) : (
                            ''
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
