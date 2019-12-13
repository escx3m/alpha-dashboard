import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, CircularProgress } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { startOfToday, endOfToday } from 'date-fns';
import { ApiContext } from '../../../../Routes';

const useStyles = makeStyles(theme => ({
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const TotalUsers = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [allRoutes, setAllRoutes] = useState([]);
  const [startDay, setStartDay] = useState(startOfToday());
  const [endDay, setEndDay] = useState(endOfToday());
  const [loading, setLoading] = useState(false);

  const { api } = useContext(ApiContext);

  useEffect(() => {
    setLoading(true);
    api.getRoutes(startDay, endDay)
      .then(res => {
        setLoading(false);
        const routes = res.data;
        setAllRoutes(routes);
      });
  }, [startDay]);

  const passengersPresent = allRoutes.reduce((acc, route) => {
    const passengersType = 1;
    const passengersPresent = route.passengers.filter(passenger => {
      return passenger.state !== 5
      // (passenger.state === 2 || passenger.state === 3)\
        && new Date(passenger.attached_to_route_time) >= startDay
        && new Date(passenger.attached_to_route_time) <= endDay
        && passenger.type === passengersType
    }).length; 
    
    return acc + passengersPresent;
  }, 0);
  
  return (
    <Card
      {...rest}
    >
      {loading ? (
        <div className={classes.progress}>
          <CircularProgress />
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
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Записанных пассажиров
              </Typography>
              <Typography variant="h3">{passengersPresent}</Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <PeopleIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </Card>
  );
};

TotalUsers.propTypes = {
  className: PropTypes.string
};

export default TotalUsers;
