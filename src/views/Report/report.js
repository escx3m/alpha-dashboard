import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import CachedIcon from '@material-ui/icons/Cached';
import RangePickerANTD from '../DatePicker/rangepickerANTD';
import { makeJSDateObject } from '../../helpers/helpers';
import { citiesName } from '../../helpers/constants';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  CircularProgress
} from '@material-ui/core';
import {
  startOfWeek,
  endOfWeek,
  startOfToday,
  endOfToday,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
} from 'date-fns';
import { ApiContext } from '../../Routes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  card: {
    maxWidth: 400,
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

const Report = () => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [uniqueRoutes, setUniqueRoutes] = useState([]);
  const [allRoutes, setAllRoutes] = useState([]);
  const start = startOfWeek(makeJSDateObject(new Date()), {
    weekStartsOn: 1
  });
  const end = endOfWeek(start, { weekStartsOn: 1 });
  const [startDay, setStartDay] = useState(startOfToday());
  const [endDay, setEndDay] = useState(endOfToday());
  const handleThisWeek = () => setStartDay(start, setEndDay(end));
  const handleToday = () =>
    setStartDay(startOfToday(), setEndDay(endOfToday()));
  const handleThisMonth = () => {
    setStartDay(startOfMonth(new Date())); setEndDay(endOfMonth(new Date()))
  };
  const handleThisYear = () => {
    setStartDay(startOfYear(new Date())); setEndDay(endOfYear(new Date()))
  };

  const { api } = useContext(ApiContext);

  useEffect(() => {
    setLoading(true);
    api.getRoutes(startDay, endDay)
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
        // const result = cars.map((carId) => {
        //   const { car, carScheme: { seats } } = routes.find((route) => route.carId === carId);
        //   const carRoutes = routes.filter((route) => carId === route.carId);
        //   return { car, scheme: seats, carRoutes };
        // });
        setUniqueRoutes(uniqueRoutes);
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
    const passengersType = 1;
    const passengersPresent = route.passengers.filter(
      passenger => (passenger.sales_channel_id !== onlineChannel || passenger.sales_channel_id !== null) && passenger.state !== 5 && passenger.type === passengersType
    ).length;
    return acc + passengersPresent;
  }, 0);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={2}
        >
          <Button
            className={classes.btn}
            onClick={handleToday}
          >
            Сегодня
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Button
            className={classes.btn}
            onClick={handleThisWeek}
          >
            Неделя
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Button
            className={classes.btn}
            onClick={handleThisMonth}
          >
            Месяц
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Button
            className={classes.btn}
            onClick={handleThisYear}
          >
            Год
          </Button>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <RangePickerANTD
            endDay={endDay}
            setEndDay={setEndDay}
            setStartDay={setStartDay}
            startDay={startDay}
          />
        </Grid>
      </Grid>
      {loading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
        <Grid
          className={classes.gridCardPas}
          container
          spacing={3}
        >
          <Grid
            item
            xs={4}
          >
            <Card className={classes.card}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <CachedIcon />
                  </IconButton>
                }
                title="Перевезено пассажиров"
              />
              <CardContent>
                <Grid className={classes.headInfo}>
                  <span className={classes.trip}>Рейсы</span>
                  <span className={classes.spanSumm}>Количество</span>
                </Grid>
                <div>
                  {uniqueRoutes.map((way, i) => {
                    const idCityFrom = Number(way.slice(0, way.indexOf('-')));
                    const idCityTo = Number(way.slice(way.indexOf('-') + 1));
                    const passengersCount = allRoutes
                      .filter(
                        (item, j) =>
                          item.fromCityId === idCityFrom &&
                          item.toCityId === idCityTo
                      )
                      .reduce((acc, route) => {
                        const passengersStatus = 3;
                        const passengersType = 1;
                        const passengersPresent = route.passengers.filter(
                          passenger => passenger.state === passengersStatus
                          &&
                          passenger.type === passengersType
                        ).length;
                        return acc + passengersPresent;
                      }, 0);
                    return (
                      <Grid
                        className={classes.gridMarginTop}
                        container
                        key={i}
                        spacing={1}
                      >
                        <Grid
                          item
                          xs={
                            10
                          }
                        >{`${citiesName[idCityFrom]}-${citiesName[idCityTo]}`}</Grid>
                        <Grid
                          item
                          xs={2}
                        >
                          {passengersCount}
                        </Grid>
                      </Grid>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <Card className={classes.card}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <CachedIcon />
                  </IconButton>
                }
                title="Количество записанных пассажиров"
              />
              <CardContent>
                <Grid className={classes.headInfo}>
                  <span className={classes.trip}>Рейсы</span>
                  <span className={classes.spanSumm}>Количество</span>
                </Grid>
                <div>
                  {uniqueRoutes.map((way, i) => {
                    const idCityFrom = Number(way.slice(0, way.indexOf('-')));
                    const idCityTo = Number(way.slice(way.indexOf('-') + 1));
                    const passengersCount = allRoutes
                      .filter(
                        (item, j) =>
                          item.fromCityId === idCityFrom &&
                          item.toCityId === idCityTo
                      )
                      .reduce((acc, route) => {
                        // const passengersStatus = 3;
                        const passengersPresent = route.passengers.filter(
                          passenger => {
                            return passenger.state === 2 || passenger.state === 3 && new Date(passenger.attached_to_route_time) >= startDay && new Date(passenger.attached_to_route_time) <= endDay
                          }).length; 
                        return acc + passengersPresent;
                      }, 0);
                      
                    return (
                      <Grid
                        className={classes.gridMarginTop}
                        container
                        key={i}
                        spacing={1}
                      >
                        <Grid
                          item
                          xs={
                            10
                          }
                        >{`${citiesName[idCityFrom]}-${citiesName[idCityTo]}`}</Grid>
                        <Grid
                          item
                          xs={2}
                        >
                          {passengersCount}
                        </Grid>
                      </Grid>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <Card className={classes.card}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <CachedIcon />
                  </IconButton>
                }
                title="Количество купивших онлайн"
              />
              <CardContent>
                <Grid className={classes.headInfo}>
                  <span className={classes.trip}>Рейсы</span>
                  <span className={classes.spanSumm}>Количество</span>
                </Grid>
                <div>
                  {uniqueRoutes.map((way, i) => {
                    const idCityFrom = Number(way.slice(0, way.indexOf('-')));
                    const idCityTo = Number(way.slice(way.indexOf('-') + 1));
                    const passengersCount = allRoutes
                      .filter(
                        (item, j) =>
                          item.fromCityId === idCityFrom &&
                          item.toCityId === idCityTo
                      )
                      .reduce((acc, route) => {
                        const onlineChannel = 13;
                        const passengersPresent = route.passengers.filter(
                          passenger =>
                            passenger.sales_channel_id === onlineChannel && passenger.state !== 5
                        ).length;
                        return acc + passengersPresent;
                      }, 0);
                    return (
                      <Grid
                        className={classes.gridMarginTop}
                        container
                        key={i}
                        spacing={1}
                      >
                        <Grid
                          item
                          xs={
                            10
                          }
                        >{`${citiesName[idCityFrom]}-${citiesName[idCityTo]}`}</Grid>
                        <Grid
                          item
                          xs={2}
                        >
                          {passengersCount}
                        </Grid>
                      </Grid>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            className={classes.gridCardPas}
            container
            spacing={3}
          >
            <Grid
              item
              xs={4}
            >
              <Card className={classes.card}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <CachedIcon />
                    </IconButton>
                  }
                  title="Перевезено посылок"
                />
                <CardContent>
                  <Grid className={classes.headInfo}>
                    <span className={classes.trip}>Рейсы</span>
                    <span className={classes.spanSumm}>Количество</span>
                  </Grid>
                  <div>
                    {uniqueRoutes.map((way, i) => {
                      const idCityFrom = Number(way.slice(0, way.indexOf('-')));
                      const idCityTo = Number(way.slice(way.indexOf('-') + 1));
                      const passengersCount = allRoutes
                        .filter(
                          (item, j) =>
                            item.fromCityId === idCityFrom &&
                            item.toCityId === idCityTo
                        )
                        .reduce((acc, route) => {
                          const passengersStatus = 3;
                          const passengersType = 2;
                          const passengersPresent = route.passengers.filter(
                            passenger => passenger.state === passengersStatus 
                            &&
                            passenger.type === passengersType
                          ).length;
                          return acc + passengersPresent;
                        }, 0);
                      return (
                        <Grid
                          className={classes.gridMarginTop}
                          container
                          key={i}
                          spacing={1}
                        >
                          <Grid
                            item
                            xs={
                              10
                            }
                          >{`${citiesName[idCityFrom]}-${citiesName[idCityTo]}`}</Grid>
                          <Grid
                            item
                            xs={2}
                          >
                            {passengersCount}
                          </Grid>
                        </Grid>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Card className={classes.card}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <CachedIcon />
                    </IconButton>
                  }
                  title="Купившие онлайн ко всем пассажирам"
                />
                <CardContent>
                  <Grid className={classes.headInfo}>
                    <span className={classes.trip}>Тип оплаты</span>
                    <span className={classes.spanSumm}>Количество</span>
                  </Grid>
                  <div>
                    <Grid
                      className={classes.gridMarginTop}
                      container
                      spacing={1}
                    >
                      <Grid
                        item
                        xs={10}
                      >
                        Онлайн
                      </Grid>
                      <Grid
                        item
                        xs={2}
                      >
                        {passengersOnline}
                      </Grid>
                      <Grid
                        item
                        xs={10}
                      >
                        Не онлайн
                      </Grid>
                      <Grid
                        item
                        xs={2}
                      >
                        {passengersOffline}
                      </Grid>
                      <Grid
                        item
                        xs={10}
                      >
                        Соотношение
                      </Grid>
                      <Grid
                        item
                        xs={2}
                      >
                        {passengersOffline+passengersOnline !== 0 
                          ? Math.round(passengersOnline/(passengersOffline+passengersOnline)*100)
                          : 0
                        }%
                      </Grid>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={4}
            >
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
                  <Grid className={classes.headInfo}>
                    <span className={classes.trip}>Рейсы</span>
                    <span className={classes.spanSumm}>Количество</span>
                  </Grid>
                  <div>
                    {uniqueRoutes.map((way, i) => {
                      const idCityFrom = Number(way.slice(0, way.indexOf('-')));
                      const idCityTo = Number(way.slice(way.indexOf('-') + 1));
                      const passengersCount = allRoutes
                        .filter(
                          (item, j) =>
                            item.fromCityId === idCityFrom &&
                            item.toCityId === idCityTo
                        )
                        .reduce((acc, route) => {
                          const onlineChannel = 13;
                          const passengersPresent = route.passengers.filter(
                            passenger =>
                              passenger.sales_channel_id === onlineChannel && passenger.state !== 5
                          ).length;
                          return acc + passengersPresent;
                        }, 0);
                      return (
                        <Grid
                          className={classes.gridMarginTop}
                          container
                          key={i}
                          spacing={1}
                        >
                          <Grid
                            item
                            xs={
                              10
                            }
                          >{`${citiesName[idCityFrom]}-${citiesName[idCityTo]}`}</Grid>
                          <Grid
                            item
                            xs={2}
                          >
                            {passengersCount}
                          </Grid>
                        </Grid>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Report;
