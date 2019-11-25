import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';

import axios from 'axios';
import {
  startOfToday,
  endOfToday,
} from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TasksProgress = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [allRoutes, setAllRoutes] = useState([]);
  const [startDay, setStartDay] = useState(startOfToday());
  const [endDay, setEndDay] = useState(endOfToday());

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/routes', {
        params: {
          startWeek: startDay,
          endWeek: endDay
        }
      })
      .then(res => {
        const routes = res.data;
        const uniqueRoutes = routes.reduce((acc, route) => []);
        setAllRoutes(routes);
      });
  }, [startDay]);

  const passengersCount = allRoutes
  .reduce((acc, route) => {
    const passengersStatus = 3;
    const passengersType = 2;
    const passengersPresent = route.passengers.filter(
      passenger => passenger.type === passengersType
    ).length;
    return acc + passengersPresent;
  }, 0);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
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
              Перевезено посылок
            </Typography>
            <Typography variant="h3">{passengersCount}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <WorkIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          value={75.5}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
