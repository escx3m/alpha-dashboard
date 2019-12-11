import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, CircularProgress } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import { startOfToday, endOfToday } from 'date-fns';
import { ApiContext } from '../../../../Routes';

const useStyles = makeStyles(theme => ({
  content: {
    alignItems: 'center',
    display: 'flex',
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
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const ToPassenger = props => {
  const { className, ...rest } = props;

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

  const passengersCount = allRoutes.reduce((acc, route) => {
    const passengersStatus = 3;
    const passengersType = 1;
    const passengersPresent = route.passengers
      .filter(passenger => passenger.state === passengersStatus
      && passenger.type === passengersType  ).length;
    return acc + passengersPresent;
  }, 0);
  const classes = useStyles();

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
                Перевезено пассажиров
              </Typography>
              <Typography variant="h3">{passengersCount}</Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <GroupIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
          <div className={classes.difference}>
            <Typography
              className={classes.differenceValue}
              variant="body2"
            >
              12%
            </Typography>
            <Typography
              className={classes.caption}
              variant="caption"
            >
              Since last month
            </Typography>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

ToPassenger.propTypes = {
  className: PropTypes.string
};

export default ToPassenger;
