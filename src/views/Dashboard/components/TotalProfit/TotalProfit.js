import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, CircularProgress } from '@material-ui/core';
import TextsmsIcon from '@material-ui/icons/Textsms';
import { 
  startOfDay, endOfDay, isSameDay, 
  startOfToday, endOfToday } from 'date-fns';
  import { useStaticState } from '@material-ui/pickers';
import { isPassenger } from '../../../../helpers/constants';
import { ApiContext } from '../../../../Routes';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorCircular: {
    color: 'white'
  }
}));

const TotalProfit = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const { api } = useContext(ApiContext);

  useEffect(() => {
    setLoading(true);
    api.getRoutes(startOfDay(selectedDate), endOfDay(selectedDate))
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
        api.getSms(passengersIds)
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
        api.getSmssend(currentPhones)
          .then(res => {
            setAllSendSms(res.data); 
          })
          .catch(e => console.log(e.toString()));
        setLoading(false);
      });
      
  }, [selectedDate]);
  const currentSms = alreadySendSms.filter(sms => isSameDay(new Date(sms.sendTime), new Date(selectedDate)));
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      {loading ? (
        <div className={classes.progress}>
          <CircularProgress className={classes.colorCircular} />
        </div>
      ) : (
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              Отправлено СМС
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              {currentSms.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <TextsmsIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
      )}
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
