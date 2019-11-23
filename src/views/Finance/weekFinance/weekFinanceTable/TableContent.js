import React from 'react';
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { eachDayOfInterval, format, endOfWeek, isSameDay } from 'date-fns';
import ruLocale from "date-fns/locale/ru";
import { makeJSDateObject } from '../../../../helpers/helpers';

const useStyles = makeStyles(theme => ({
  gridBorder: {
    border:'1px solid #969696'
  },
  card: {
    background: '#F6F6F6',
    color: 'black',
    height: 25,
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
  },
  cardInfo: {
    height:'50px',
    fontSize:'13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardDate:{
    height:'50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardToday:{
    height:'50px',
    background: '#3f51b5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overAll: {
    marginLeft: '1px',
  },
}));

function TableContent (props) {
  const classes = useStyles(); 
  const { routes, selectedWeekStart } = props;
  const start = selectedWeekStart;
  const end = endOfWeek(selectedWeekStart, { weekStartsOn: 1 });

  return (
    <Grid container spacing={1}>
      {
        eachDayOfInterval({ start, end })
          .map((currentDay, index) => {
            const currentRoutes = routes.filter(route => isSameDay(makeJSDateObject(new Date(new Date(route.fromTimeLocal).toUTCString())), currentDay));
            const cars = currentRoutes.reduce((acc, route) => {
              if(route.carId && !acc.includes(route.carId)) {
                acc.push(route.carId);
              }
              return acc;
            }, []);
            return (
              cars.map((carId, i) => {
                const carRoutes = currentRoutes.filter(route => route.carId === carId);
                const carTitle = carRoutes[0].car.title;
                const carNumber = carRoutes[0].car.number;
                const carOwner = carRoutes[0].car.owner;
                const carDriver = carRoutes[0].driver;
                const human = 3; 
                const payNot = 1;
                const payCash = 4;
                const payCard = 2;
                const payOffice = 3;
                const passengers = carRoutes.reduce((acc, route) => {
                  const { passengers } = route;
                  return acc.concat(passengers.filter(passenger => passenger.state === human));
                }, []);

                console.log('carRoutes', carRoutes, 'car', carId);
                console.log('passengers', passengers, carId, currentDay);
                const passengersIncome = passengers.reduce((acc, passenger) => {
                  switch (+passenger.price_status) {
                    case payNot: return acc;
                    case payCard: return { ...acc, card: acc.card + +passenger.price };
                    case payCash: return { ...acc, cash: acc.cash + +passenger.price };
                    case payOffice: return { ...acc, office: acc.office + +passenger.price };
                    default: return acc;
                  }
                }, { cash: 0, card: 0, office: 0 });
                
                const totalPassengers = passengers.length;

                return (
                  <Grid className={classes.overAll} container item spacing={1} xs={12} key={`${index}${i}`}>
                    
                    <Grid className={classes.gridBorder} item xs={1}>
                      <Card className={isSameDay(makeJSDateObject(new Date()), currentDay) ? classes.cardToday : classes.cardDate}>
                        {format(currentDay, "d MMM", {locale:ruLocale})}
                      </Card>
                    </Grid>
                    <Grid className={classes.gridBorder} item xs={1}>
                      <Card className={classes.cardInfo}>
                        {carTitle}, {carNumber}
                      </Card>
                    </Grid>
                    <Grid className={classes.gridBorder} item xs={1}>
                      <Card className={classes.cardInfo}>
                        {carNumber}
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
                        {totalPassengers}
                      </Card>
                        </Grid>
                    <Grid className={classes.gridBorder} item xs={1}>
                      <Card className={classes.cardInfo}>
                        {passengersIncome.card} 
                      </Card>
                    </Grid>
                    <Grid className={classes.gridBorder} item xs={1}>
                      <Card className={classes.cardInfo}>
                        {passengersIncome.cash} 
                      </Card>
                    </Grid>
                    <Grid className={classes.gridBorder} item xs={1}>
                      <Card className={classes.cardInfo}>
                        {passengersIncome.office} 
                      </Card>
                    </Grid>
                    <Grid className={classes.gridBorder} item xs={1}>
                      <Card className={classes.cardInfo}> 
                        {passengersIncome.cash + passengersIncome.card + passengersIncome.office}
                      </Card>
                    </Grid>
                    <Grid className={classes.gridBorder} item xs={1}>
                      <Card className={classes.cardInfo}>
                      Выдача
                      </Card>
                    </Grid>
                    <Grid className={classes.gridBorder} item xs={1}>
                      <Card className={classes.cardInfo}>
                        Фирма  
                      </Card>
                    </Grid>

                  </Grid>
                )
              })
            )
          })
      }  
    </Grid>
  );
}

export default TableContent;

