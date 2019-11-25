import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import CachedIcon from '@material-ui/icons/Cached';
import RangePickerANTD from '../DatePicker/rangepickerANTD';
import { makeJSDateObject } from '../../helpers/helpers';
import axios from 'axios';
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

const useStyles = makeStyles(theme => ({
  //  "@global": {
  //   ".mnoButton-button": {
  //     backgroundColor: "#2196f3"
  //   },
  //   ".mnoButton-buttonDark": {
  //     backgroundColor: "#880e4f"
  //   },
  //   ".mnoButton-buttonLight": {
  //     backgroundColor: "#e1bee7"
  //   }
  // },
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
  textAlign:'center',
  },
}));

const Report = () => {
  const citiesName = {
    '1': 'Москва',
    '10': 'Волгоград',
    '21': 'Армавир',
    '23': 'Астрахань',
    '38': 'Владикавказ',
    '40': 'Волжский',
    '44': 'Геленджик',
    '52': 'Ессентуки',
    '53': 'Жуковский',
    '62': 'Калуга',
    '67': 'Кисловодск',
    '72': 'Краснодар',
    '90': 'Нальчик',
    '98': 'Новороссийск',
    '103': 'Обнинск',
    '119': 'Ростов-на-Дону',
    '133': 'Сочи',
    '134': 'Ставрополь',
    '139': 'Таганрог',
    '143': 'Тольятти',
    '155': 'Химки',
    '160': 'Грозный',
    '164': 'Шахты',
    '166': 'Элиста',
    '354': 'Анапа',
    '355': 'Лагань',
    '669': 'Железноводск',
    '818': 'Ялта',
    '1261': 'Михайловск',
    '1449': 'Буденновск',
    '1797': 'Минеральные Воды',
    '3060': 'Ипатово',
    '3700': 'Волгодонск',
    '3978': 'Цимлянск',
    '6310': 'Троицкое',
    '6356': 'Цаган-Аман',
    '7188': 'Судак',
    '8748': 'Зимовники',
    '8963': 'Кетченеры',
    '12895': 'Ики-Бурул',
    '14209': 'Заветное',
    '17290': 'Витязево',
    '17472': 'Малые Дербеты',
    '20320': 'Архипо-Осиповка',
    '1014402': 'Дальний',
    '1031866': 'Шин-Мер',
    '1042266': 'Ольгинка',
    '1042272': 'Пляхо',
    '1079156': 'Дмитриадовка',
    '1030609': 'Аушигер',
    '1031804': 'Городовиковск',
    '1053557': 'Внуково',
    '1054308': 'Домодедово',
  };
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

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/routes', {
        params: {
          startWeek: startDay,
          endWeek: endDay
        }
      })
      .then(res => {
        setLoading(false);
        const routes = res.data;
        console.log('data recieved');
        const uniqueRoutes = routes.reduce((acc, route) => {
          const way = `${route.fromCityId}-${route.toCityId}`;
          if (way && !acc.includes(way)) {
            acc.push(way);
          }
          return acc;
        }, []);
        console.log(routes);
        // const result = cars.map((carId) => {
        //   const { car, carScheme: { seats } } = routes.find((route) => route.carId === carId);
        //   const carRoutes = routes.filter((route) => carId === route.carId);
        //   return { car, scheme: seats, carRoutes };
        // });
        setUniqueRoutes(uniqueRoutes);
        setAllRoutes(routes);
      });
  }, [startDay]);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Button onClick={handleToday} className={classes.btn}>
            Сегодня
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleThisWeek} className={classes.btn}>
            Неделя
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleThisMonth} className={classes.btn}>
            Месяц
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleThisYear} className={classes.btn}>
            Год
          </Button>
        </Grid>
        <Grid item xs={4}>
          <RangePickerANTD
            startDay={startDay}
            endDay={endDay}
            setStartDay={setStartDay}
            setEndDay={setEndDay}
          />
        </Grid>
      </Grid>
      {loading 
  ? <div className={classes.progress}><CircularProgress /></div>
  :
      <Grid container spacing={3} className={classes.gridCardPas}>
        <Grid item xs={4}>
            <Card className={classes.card}>
              <CardHeader
                title="Перевезено пассажиров"
                action={
                  <IconButton aria-label="settings">
                    <CachedIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Grid className={classes.headInfo}>
                  <span className={classes.trip}>Рейсы</span>
                  <span className={classes.spanSumm}>Количество</span>
                </Grid>
                <div>
                  {uniqueRoutes.map((way, i) => {
                    console.log(way);
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
                        const passengersPresent = route.passengers.filter(
                          passenger => passenger.state === passengersStatus
                        ).length;
                        return acc + passengersPresent;
                      }, 0);
                    console.log('ssdfsdfsdfsdfs', passengersCount);
                    return (
                      <Grid
                        container
                        spacing={1}
                        className={classes.gridMarginTop}
                        key={i}>
                        <Grid
                          item
                          xs={
                            10
                          }>{`${citiesName[idCityFrom]}-${citiesName[idCityTo]}`}</Grid>
                        <Grid item xs={2}>
                          {passengersCount}
                        </Grid>
                      </Grid>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card className={classes.card}>
              <CardHeader
                title="Количество записанных пассажиров"
                action={
                  <IconButton aria-label="settings">
                    <CachedIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Grid className={classes.headInfo}>
                  <span className={classes.trip}>Рейсы</span>
                  <span className={classes.spanSumm}>Количество</span>
                </Grid>
                <div>
                  {uniqueRoutes.map((way, i) => {
                    console.log(way);
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
                          passenger =>
                            passenger.state === 2 || passenger.state === 3
                        ).length;
                        return acc + passengersPresent;
                      }, 0);
                    console.log('кол-во', passengersCount);
                    return (
                      <Grid
                        container
                        spacing={1}
                        className={classes.gridMarginTop}
                        key={i}>
                        <Grid
                          item
                          xs={
                            10
                          }>{`${citiesName[idCityFrom]}-${citiesName[idCityTo]}`}</Grid>
                        <Grid item xs={2}>
                          {passengersCount}
                        </Grid>
                      </Grid>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card className={classes.card}>
              <CardHeader
                title="Количество купивших онлайн"
                action={
                  <IconButton aria-label="settings">
                    <CachedIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Grid className={classes.headInfo}>
                  <span className={classes.trip}>Рейсы</span>
                  <span className={classes.spanSumm}>Количество</span>
                </Grid>
                <div>
                  {uniqueRoutes.map((way, i) => {
                    console.log(way);
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
                            passenger.sales_channel_id === onlineChannel
                        ).length;
                        return acc + passengersPresent;
                      }, 0);
                    console.log('ssdfsdfsdfsdfs', passengersCount);
                    return (
                      <Grid
                        container
                        spacing={1}
                        className={classes.gridMarginTop}
                        key={i}>
                        <Grid
                          item
                          xs={
                            10
                          }>{`${citiesName[idCityFrom]}-${citiesName[idCityTo]}`}</Grid>
                        <Grid item xs={2}>
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
}
    </div>
  );
};

export default Report;
