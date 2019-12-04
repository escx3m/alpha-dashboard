import React from 'react';
import { Grid, Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { eachDayOfInterval, format, endOfWeek, isSameDay } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { makeJSDateObject } from '../../../../helpers/helpers';
import { payToDrivers, cities, notStandard } from '../../../../helpers/constants';

const useStyles = makeStyles(theme => ({
  gridBorder: {
    border: '1px solid #969696'
  },
  card: {
    background: '#F6F6F6',
    color: 'black',
    height: 25
  },
  cardTotal: {
    background: '#F6F6F6',
    color: 'black',
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24
  },
  singleRoute: {},
  pairRoute: {},
  notRoad: {
    background: '#F6F6F6',
    height: 25
  },
  hasRoad: {
    background: '#99D954',
    color: 'black',
    height: 25
  },
  cardInfo: {
    height: '50px',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  cardDate: {
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardToday: {
    height: '50px',
    background: '#3f51b5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overAll: {
    marginLeft: '1px'
  }
}));

function TableContent(props) {
  const classes = useStyles();
  const { routes, selectedWeekStart } = props;
  const start = selectedWeekStart;
  const end = endOfWeek(selectedWeekStart, { weekStartsOn: 1 });
  const ownersId = new Set([7, 38, 52]);
  return (
    <Grid container spacing={1}>
      {eachDayOfInterval({ start, end }).map((currentDay, index) => {
        const currentRoutes = routes.filter(route =>
          isSameDay(
            makeJSDateObject(
              new Date(new Date(route.fromTimeLocal).toUTCString())
            ),
            currentDay
          )
        );
        const cars = currentRoutes.reduce((acc, route) => {
          if (route.carId && !acc.includes(route.carId)) {
            acc.push(route.carId);
          }
          return acc;
        }, []);

        return cars.map((carId, i) => {
          const carRoutes = currentRoutes.filter(
            route => route.carId === carId
          );
          const carTitle = carRoutes[0].car.title;
          const carNumber = carRoutes[0].car.number;
          const carOwner = carRoutes[0].car.owner;
          const carDriver = carRoutes[0].driver.user;
          const carScheme = carRoutes[0].carScheme.seats;
          const resultRoutes = [];
          const copy = [...carRoutes];
          while (copy.length > 0) {
            const index = copy.slice(1).findIndex(route => {
              return (
                copy[0].fromCityId === route.toCityId &&
                copy[0].toCityId === route.fromCityId
              );
            });
            if (index >= 0) {
              resultRoutes.push([copy[0], copy[index + 1]]);
              copy.splice(index + 1, 1);
              copy.splice(0, 1);
            } else {
              resultRoutes.push([copy[0]]);
              copy.splice(0, 1);
            }
          }

          return resultRoutes.map((route, k) => {
            const human = 1;
            const delivered = 3;
            const payNot = 1;
            const payCash = 4;
            const payCard = 2;
            const payOffice = 3;
            const passengers = route.reduce((acc, r) => {
              const { passengers } = r;
              return acc.concat(
                passengers.filter(
                  passenger =>
                    passenger.state === delivered && passenger.type === human
                )
              );
            }, []);
            const totalPassengers = passengers.length;
            const fromCity = cities[route[0].fromCityId][0]; 
            const toCity = cities[route[0].toCityId][0];
            const fromToCityKey = `${fromCity}-${toCity} ${carScheme} ${totalPassengers}`;
            const toFromCityKey = `${toCity}-${fromCity} ${carScheme} ${totalPassengers}`;
            const payObj = payToDrivers.hasOwnProperty(fromToCityKey)
              ? payToDrivers[fromToCityKey]
              : payToDrivers.hasOwnProperty(toFromCityKey) 
              ? payToDrivers[toFromCityKey]
              : payToDrivers['no passengers'];

            const passengersIncome = passengers.reduce((acc, passenger) => {
                switch (+passenger.price_status) {
                  case payCard:
                    return {
                      ...acc,
                      card: acc.card + +passenger.price,
                    };
                  case payNot:
                  case payCash:
                    return {
                      ...acc,
                      cash: acc.cash + +passenger.price,
                    };
                  case payOffice:
                    return {
                      ...acc,
                      office: acc.office + +passenger.price,
                    };
                  default:
                    return acc;
                }
              },
              { cash: 0, card: 0, office: 0 }
            );
            const { cash, card, office } = passengersIncome;
            const passengersIncomeSum = card + cash + office;
            const payToDriver = isNaN(payObj.all) 
              ? notStandard : ownersId.has(carOwner)
              ? ((payObj.all > passengersIncomeSum) 
              ? payObj.all : (payObj.owner_id > passengersIncomeSum) 
              ? passengersIncomeSum : payObj.all) : payObj.all;

            const totalToDriver = payToDriver - cash;
            const firmIncome = passengersIncomeSum - cash - totalToDriver;
            return (
              <Grid
                className={classes.overAll}
                container
                item
                direction='row'
                spacing={1}
                wrap='nowrap'
                key={`${index}${k}`}
                
                style={route.length === 1 ? {backgroundColor: 'orange'} : {}}
              >
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card
                    className={
                      isSameDay(makeJSDateObject(new Date()), currentDay)
                        ? classes.cardToday
                        : classes.cardDate
                    }>
                    {format(currentDay, 'd MMM', { locale: ruLocale })}
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    {carTitle} {carNumber}
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    {`${carOwner.surname} ${carOwner.name} ${carOwner.patronymic}`}
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    {`${carDriver.surname} ${carDriver.name} ${carDriver.patronymic}`}
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    {cities[route[0].fromCityId]}->{cities[route[0].toCityId]}
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>{totalPassengers}</Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    {card}
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    {office}
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    {cash}
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    <TextField variant='outlined' type='number'/> 
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    {passengersIncomeSum}
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>Начис {payToDriver}</Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    Выдача {totalToDriver}
                  </Card>
                </Grid>
                <Grid className={classes.gridBorder} item xs={1}>
                  <Card className={classes.cardInfo}>
                    firma {firmIncome} 
                  </Card>
                </Grid>

              </Grid>
            );
          });
        });
      })}
    </Grid>
  );
}

export default TableContent;
