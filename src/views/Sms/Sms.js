import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Calendar, useStaticState } from '@material-ui/pickers';
import CachedIcon from '@material-ui/icons/Cached';
import {
  cityShortNames as citiesName,
  isPassenger,
  canceledState
} from '../../helpers/constants';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Paper,
  IconButton,
  Button
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
import ExpansionParent from './Expansion/expansionParent';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  card: {
    maxWidth: 900,
    width: '100%'
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
        className={classes.btnOpenClose}
        color="primary"
        onClick={() => setOpenAll(!openAll)}
        size="small"
        variant="contained"
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
                  <ExpansionParent
                    currentRoutes={currentRoutes}
                    expanded={expanded}
                    passengersIdsAtTime={passengersIdsAtTime}
                    routeIdTemplate={routeIdTemplate}
                    selectedDateSendSms={selectedDateSendSms}
                    smsCount={smsCount}
                    smsTime={smsTime}
                  />
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
