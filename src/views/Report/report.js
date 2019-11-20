import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Button
} from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import RangePickerANTD from '../DatePicker/rangepickerANTD';
import axios from 'axios';
import { startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { makeJSDateObject } from '../../helpers/helpers';

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
    width: '100%',
  },
  headInfo: {
    background: 'rgb(244,249,253)',
    width: '100%',
    padding: '12px',
    fontSize: '20px',
  },
  trip: {
    marginLeft: '10px',
  },
  spanSumm: {
    float: 'right',
    marginRight: '10px',
  },
  gridMarginTop: {
    marginTop: '5px',
  },
  gridCardPas: {
    marginTop: '50px',
  },
  btn: {
    width: '150px',
    height: '50px',
    border: '1px solid #3f51b5',
    background: 'white',
    color:'black',
    fontSize: '18px',
  },
}));

const Report = () => {
  const citiesName = {
    "10" : "Волгоград",
    "23" : "Астрахань",
    "52" : "Ессентуки",
    "67" : "Кисловодск",
    "72" : "Краснодар",
    "90" : "Нальчик",
    "119" : "Ростов-на-Дону",
    "133" : "Сочи",
    "134" : "Ставрополь",
    "166" : "Элиста",
    "1797" : "Минеральные Воды",
    "8748" : "Зимовники",
    "1042266" : "Ольгинка",
  };
  const classes = useStyles();
  
    const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), { weekStartsOn: 1 });
    const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart);
    const [loading, setLoading] = useState(false);
    const [uniqueRoutes, setUniqueRoutes] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);
    const end = endOfWeek(selectedWeekStart, { weekStartsOn: 1 });
    const start = selectedWeekStart;
   
  
    useEffect(() => {
      setLoading(true);
     axios.get('http://localhost:5000/api/routes', {
      params: {
        startWeek: start,
        endWeek: end
      }})
      .then(res => {
        setLoading(false);
        const routes = res.data;
        console.log('data recieved');
        const uniqueRoutes = routes.reduce((acc, route) => {
          const way = `${route.fromCityId}-${route.toCityId}`;
          if(way && !acc.includes(way)) {
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
   
    }, [selectedWeekStart]);

  return (
    <div className={classes.root}>

<Grid container spacing={3}>
<Grid item xs={2}>
<Button className={classes.btn}>Сегодня</Button>
</Grid>
<Grid item xs={2}>
<Button className={classes.btn}>Неделя</Button>
</Grid>
<Grid item xs={2}>
<Button className={classes.btn}>Месяц</Button>
</Grid>
<Grid item xs={2}>
<Button className={classes.btn}>Год</Button>
</Grid>
<Grid item xs={4}>
<RangePickerANTD />
</Grid>
</Grid>

      <Grid container spacing={3} className={classes.gridCardPas}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
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
                <Grid className={classes.headInfo}><span className={classes.trip}>Рейсы</span><span className={classes.spanSumm}>Количество</span></Grid>
                <div>
                  {uniqueRoutes.map((way, i) => { 
                    console.log(way);
                    const idCityFrom = Number(way.slice(0, way.indexOf('-')));
                    const idCityTo = Number(way.slice(way.indexOf('-')+1));
                    const passengersCount = allRoutes.filter((item, j) => item.fromCityId === idCityFrom && item.toCityId === idCityTo)
                       .reduce((acc, route) => {
                         return acc + route.passengers.length;
                       }, 0);
                      console.log('ssdfsdfsdfsdfs',passengersCount);
                    return (
                    <Grid container spacing={1} className={classes.gridMarginTop} key={i}>
                      <Grid item xs={10}>{`${citiesName[idCityFrom]}-${citiesName[idCityTo]}`}</Grid>
                      <Grid item xs={2}>{passengersCount}</Grid>
                    </Grid>
                  )})}
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><Card className={classes.card}>
            <CardHeader
              title="Количество записанных пассажиров"
              action={
                <IconButton aria-label="settings">
                  <CachedIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Grid className={classes.headInfo}><span className={classes.trip}>Рейсы</span><span className={classes.spanSumm}>Количество</span></Grid>
              <div >
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Элиста - Волгоград
        </Grid>
                  <Grid item xs={2}>
                    256
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Элиста - Астрахань
        </Grid>
                  <Grid item xs={2}>
                    250
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Элиста - Ростов-на-Дону
        </Grid>
                  <Grid item xs={2}>
                    230
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Ростов-на-Дону - Астрахань
        </Grid>
                  <Grid item xs={2}>
                    220
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Астрахань - Ростов-на-Дону
        </Grid>
                  <Grid item xs={2}>
                    220
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Волгоград - Элиста
        </Grid>
                  <Grid item xs={2}>
                    256
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Астрахань - Элиста
        </Grid>
                  <Grid item xs={2}>
                    250
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Ростов-на-Дону - Элиста
        </Grid>
                  <Grid item xs={2}>
                    230
        </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
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
                <Grid className={classes.headInfo}><span className={classes.trip}>Рейсы</span><span className={classes.spanSumm}>Количество</span></Grid>
                <div >
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Элиста - Волгоград
        </Grid>
                    <Grid item xs={2}>
                      256
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Элиста - Астрахань
        </Grid>
                    <Grid item xs={2}>
                      250
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Элиста - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      230
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Ростов-на-Дону - Астрахань
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Астрахань - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Волгоград - Элиста
        </Grid>
                    <Grid item xs={2}>
                      256
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Астрахань - Элиста
        </Grid>
                    <Grid item xs={2}>
                      250
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Ростов-на-Дону - Элиста
        </Grid>
                    <Grid item xs={2}>
                      230
        </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Report;