import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography,
  CircularProgress
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import MoneyIcon from '@material-ui/icons/Money';
import PaymentIcon from '@material-ui/icons/Payment';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import axios from 'axios';
import {
  startOfToday,
  endOfToday,
} from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'50px',
  },
}));



const OnlineOffline = props => {
  
  const [allRoutes, setAllRoutes] = useState([]);
  const [startDay, setStartDay] = useState(startOfToday());
  const [endDay, setEndDay] = useState(endOfToday());
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:6000/api/routes', {
        params: {
          startWeek: startDay,
          endWeek: endDay
        }
      })
      .then(res => {
        setLoading(false);
        const routes = res.data;
        const uniqueRoutes = routes.reduce((acc, route) => {
          const way = `${route.fromCityId}-${route.toCityId}`;
          if (way && !acc.includes(way)) {
            acc.push(way);
          }
          return acc;
        }, []);
        setAllRoutes(routes);
      });
  }, [startDay]);
  const passengersOnline = allRoutes.reduce((acc, route) => {
    const onlineChannel = 13;
    const passengersPresent = route.passengers.filter(
      passenger => passenger.sales_channel_id === onlineChannel && passenger.state !== 5
    ).length;
    return acc + passengersPresent;
  }, 0);
  const passengersOffline = allRoutes.reduce((acc, route) => {
    const onlineChannel = 13;
    const passengersPresent = route.passengers.filter(
      passenger => passenger.sales_channel_id !== onlineChannel
    ).length;
    return acc + passengersPresent;
  }, 0);
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [`${passengersOnline}`, `${passengersOffline}`],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Онлайн', 'Не онлайн']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: 'Онлайн',
      value: `${passengersOnline}`,
      icon: <PaymentIcon />,
      color: theme.palette.primary.main
    },
    {
      title: 'Не онлайн',
      value: `${passengersOffline}`,
      icon: <MoneyIcon />,
      color: theme.palette.error.main
    },
    {
      title: 'Соотношение',
      value: `${Math.round (passengersOnline/(passengersOffline+passengersOnline)*100)}%`,
      icon: <DonutLargeIcon />,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Купившие онлайн ко всем пассажирам"
      />
      <Divider />
      {loading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography
                style={{ color: device.color }}
                variant="h2"
              >
                {device.value}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
      )}
    </Card>
  );
};

OnlineOffline.propTypes = {
  className: PropTypes.string
};

export default OnlineOffline;
