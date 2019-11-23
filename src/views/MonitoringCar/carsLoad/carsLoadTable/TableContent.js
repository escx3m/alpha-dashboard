import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { eachDayOfInterval, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { makeJSDateObject } from '../../../../helpers/helpers';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(theme => ({
  gridBorder: {
    border:'1px solid #969696'
  },
  card: {
    background: '#F6F6F6',
    color: 'black',
    height: 25,
    textAlign: 'center',
  },
  cardTotal: {
    background: '#F6F6F6',
    color: 'black',
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
  },
  notRoad: {
    background: '#F6F6F6',
    height: 25,
  },
  hasRoad: {
    background: '#99D954',
    color: 'black',
    height: 25,
    textAlign: 'center',
  },
  gridAll: {
    marginLeft: '1px',
  },
}));

const citiesName = {
  "10" : "Влг",
  "23" : "Астр",
  "52" : "Ессентуки",
  "67" : "Кисловодск",
  "72" : "Краснодар",
  "90" : "Нальчик",
  "119" : "РнД",
  "133" : "Сочи",
  "134" : "Ставрополь",
  "166" : "Эл",
  "1797" : "МинВод",
  "8748" : "Зимовники",
  "1042266" : "Ольг",
};
const cities = {
  "10" : "В",
  "23" : "А",
  "52" : "Ес",
  "67" : "КВ",
  "72" : "Кдр",
  "90" : "Н",
  "119" : "Р",
  "133" : "Сч",
  "134" : "Став",
  "166" : "Э",
  "1797" : "МВ",
  "8748" : "Зим",
  "1042266" : "Ольг",
};

function TableContent (props) {
  const classes = useStyles(); 
  const { cars, selectedWeekStart, checkState } = props;
  const start = selectedWeekStart;
  const end = endOfWeek(selectedWeekStart, { weekStartsOn: 1 });
  const maxTrips = Math.max(...cars.map(car => Math.ceil(car.carRoutes.length / 2)));

  let d = makeJSDateObject(start);

  const renderRow = (item, index) => {
    const { car, carRoutes, scheme } = item;
    return (
      <Grid container item spacing={1} xs={12} key={index} className={classes.gridAll}>
        <Grid className={classes.gridBorder} item xs={2}><Card className={classes.card}>{`${car.title} ${car.number}`}</Card></Grid> 
        <Grid className={classes.gridBorder} item xs={1}><Card className={classes.card}>{scheme}</Card></Grid>
        {
          eachDayOfInterval({ start, end })
            .map((currentDay, i) => {
              const currentRoutes = carRoutes.filter(route => isSameDay(makeJSDateObject(new Date(new Date(route.fromTimeLocal).toUTCString())), currentDay));
              return (
                currentRoutes.length > 0 ? 
                  <Grid className={classes.gridBorder} item xs={1} key={i}>
                    <Card className={classes.hasRoad}>{currentRoutes.map((route, j) => {
                      const passengersCount = route.passengers.filter(passenger => passenger.state <= 3).length;
                      const routeTime = new Date(route.fromTimeLocal); 
                      const infoRoute = `${citiesName[route.fromCityId]}-${citiesName[route.toCityId]}, 
                                        Пассажиров: ${passengersCount}\nОтпр.:` + 
                                        `0${routeTime.getUTCHours()}`.slice(-2) + `:` + `0${routeTime.getUTCMinutes()}`.slice(-2);
                      return (
                        <Tooltip key={j} title={infoRoute} enterDelay={500} leaveDelay={200}>
                          <span>{cities[route.fromCityId]}-{cities[route.toCityId]} </span>
                        </Tooltip>)})}
                    </Card>
                  </Grid>
                :
                <Grid className={classes.gridBorder} item xs={1} key={i}>
                  <Card className={classes.notRoad}>{currentRoutes.map(route => <div>{route.fromCityId}-{route.toCityId}</div>)}
                  </Card>
                </Grid>
                );
            }) 
        }
        <Grid className={classes.gridBorder} item xs={2}>
          <Card style={{backgroundColor: `rgba(63, 81, 181, ${Math.ceil(carRoutes.length / 2) / maxTrips})`, color: `${(Math.ceil(carRoutes.length / 2) / maxTrips) > 0.6 ? '#FFF' : '#000'}`}} className={classes.cardTotal}>
            {Math.ceil(carRoutes.length / 2)}
          </Card>
        </Grid>
      </Grid>
    )
  };
  return (
    <Grid container spacing={1}>
      {
        [...cars].sort((b, a) => {
          if (a.scheme === b.scheme) {
            return a.carRoutes.length - b.carRoutes.length;
          }
          return a.scheme - b.scheme;
        }).filter(
          car => ((checkState.checked8 && car.scheme === 8) || (checkState.checked7 && car.scheme === 7) 
                   || (checkState.checked6 && car.scheme === 6) || (checkState.checked5 && car.scheme === 5) 
                   || (checkState.checked4 && car.scheme === 4) || (checkState.checkedAll && car.scheme > 0))
        ).map(renderRow)
      }      
    </Grid>
  );
}

export default TableContent;

