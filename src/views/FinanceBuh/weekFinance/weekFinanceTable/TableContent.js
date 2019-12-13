import React  from 'react';
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { isSameDay, format } from 'date-fns';
import { ruLocale } from 'date-fns/locale/ru'
import Row from './Row';
import {
  payToDrivers,
  cities,
  notStandard,
  isPassenger,
  payNot,
  payCard,
  payCash,
  payOffice,
  delivered,
  ownersId,
} from '../../../../helpers/constants';


const useStyles = makeStyles(theme => ({
  gridBorder: { 
    border: '1px solid #969696'
  },
  card: {
    background: '#F6F6F6',
    color: 'black',
    height: 25
  },
  singleRoute: {},
  pairRoute: {},
  cardInfo: {
    height: '50px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  overAll: {
    marginLeft: '1px'
  },
  btnSave: {
    width: '45px',
    height: '40px',
    fontSize: '9px'
  }
}));

function TableContent(props) {
  const classes = useStyles();
  const { routes, finances, setFinances, selectedDay } = props;
  const financesIds = new Set(finances.map(({ startRouteId }) => startRouteId))
  const currentRoutes = routes.filter(route =>
    isSameDay(new Date(route.fromTime), selectedDay)
  );
  const cars = currentRoutes.reduce((acc, route) => {
    if (route.carId && !acc.includes(route.carId)) {
      acc.push(route.carId);
    }
    return acc;
  }, []);

  const totalPerDay = {
    passengers: 0,
    card: 0,
    cash: 0,
    office: 0,
    correction: 0,
    tripSum: 0,
    toDriver: 0,
    giveToDriver: 0,
    firm: 0
  };

  return (
    <Grid container spacing={1}>
      {cars.map((carId, i) => {
        const carRoutes = currentRoutes.filter(route => route.carId === carId);
        const carNumber = carRoutes[0].car.number;
        const carOwner = carRoutes[0].car.owner;
        const carDriver = carRoutes[0].driver.user;
        const carOwnerString = `${carOwner.surname} ${carOwner.name[0]} ${carOwner.patronymic[0]}`
        const carDriverString = `${carDriver.surname} ${carDriver.name[0]} ${carDriver.patronymic[0]}`
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
          const startRouteId = route[0].id;
          let rowdata  = {};

          if (financesIds.has(startRouteId)) {
            const financeRoute = finances.filter(finance => 
              finance.startRouteId === startRouteId 
            ).slice(-1)[0];
            const direction = `${cities[financeRoute.fromCityId]} -> ${cities[financeRoute.toCityId]}`
            rowdata = {
              k: k,
              fromTime: financeRoute.startRouteDate,
              selectedDay: selectedDay,
              carTitle: financeRoute.carTitle,
              carOwner: financeRoute.carOwner,
              carDriver: financeRoute.carDriver,
              totalPassengers: financeRoute.passengersTotal,
              fromCityId: financeRoute.fromCityId,
              toCityId: financeRoute.toCityId,
              direction: direction,
              cash: financeRoute.cash,
              card: financeRoute.card, 
              office: financeRoute.office,
              passengersIncomeSum: financeRoute.totalSum,
              currentCorrection: financeRoute.correction,
              payToDriver: financeRoute.earned,
              totalToDriver: financeRoute.pay,
              firmIncome: financeRoute.firm,
              startRouteId: financeRoute.startRouteId,
            }; 
            totalPerDay.passengers += +financeRoute.passengersTotal;
            totalPerDay.cash += +financeRoute.cash;
            totalPerDay.card += +financeRoute.card;
            totalPerDay.office += +financeRoute.office;
            totalPerDay.correction += +financeRoute.correction;
            totalPerDay.tripSum += +financeRoute.totalSum;
            totalPerDay.toDriver += +financeRoute.earned;
            totalPerDay.giveToDriver += +financeRoute.pay;
            totalPerDay.firm += +financeRoute.firm;
          } else {
            const passengers = route.reduce((acc, r) => {
              const { passengers } = r;
              return acc.concat(
                passengers.filter(passenger => passenger.state === delivered && passenger.type === isPassenger)
              );
            }, []);
            const currentCorrection = 0 
            const totalPassengers = passengers.length;
            const fromCity = cities[route[0].fromCityId][0];
            const toCity = cities[route[0].toCityId][0];
            const direction = `${fromCity} -> ${toCity}`
            const fromToCityKey = `${fromCity}-${toCity} ${carScheme} ${totalPassengers}`;
            const toFromCityKey = `${toCity}-${fromCity} ${carScheme} ${totalPassengers}`;
            const payObj = payToDrivers.hasOwnProperty(fromToCityKey)
              ? payToDrivers[fromToCityKey]
              : payToDrivers.hasOwnProperty(toFromCityKey)
                ? payToDrivers[toFromCityKey]
                : totalPassengers > 0 
                  ? notStandard
                  : payToDrivers['no passengers'];

            const passengersIncome = passengers.reduce(
              (acc, passenger) => {
                switch (+passenger.price_status) {
                  case payCard:
                    return {
                      ...acc,
                      card: acc.card + +passenger.price
                    };
                  case payNot:
                  case payCash:
                    return {
                      ...acc,
                      cash: acc.cash + +passenger.price
                    };
                  case payOffice:
                    return {
                      ...acc,
                      office: acc.office + +passenger.price
                    };
                  default:
                    return acc;
                }
              },
              { cash: 0, card: 0, office: 0 }
            );
            const { cash, card, office } = passengersIncome;
            const passengersIncomeSum = card + cash + office + currentCorrection;
            const payToDriver = isNaN(payObj.all)
              ? notStandard
              : ownersId.has(+carOwner.id)
                ? payObj.owner_id 
                : payObj.all;
            const totalToDriver = payToDriver - cash;
            const firmIncome = passengersIncomeSum - cash - totalToDriver;

            rowdata = {
              k: k,
              fromTime: route[0].fromTime,
              selectedDay: selectedDay,
              carTitle: carNumber,
              carOwner: carOwnerString,
              carDriver: carDriverString,
              fromCityId: +route[0].fromCityId,
              toCityId: +route[0].toCityId,
              totalPassengers: totalPassengers,
              direction: direction,
              cash: cash,
              card: card, 
              office: office,
              passengersIncomeSum: passengersIncomeSum,
              currentCorrection: currentCorrection,
              payToDriver: payToDriver,
              totalToDriver: totalToDriver,
              firmIncome: firmIncome,
              startRouteId: startRouteId,
            }; 
          
            totalPerDay.passengers += +totalPassengers;
            totalPerDay.cash += +cash;
            totalPerDay.card += +card;
            totalPerDay.office += +office;
            totalPerDay.correction += +currentCorrection;
            totalPerDay.tripSum += +passengersIncomeSum;
            totalPerDay.toDriver += +payToDriver;
            totalPerDay.giveToDriver += +totalToDriver;
            totalPerDay.firm += +firmIncome;
          }

          return (
            <Grid
              container
              direction="row"
              item
              key={`${k}`}
              spacing={1}
              style={route.length === 1 ? { backgroundColor: 'orange' } : {}}
              wrap="nowrap"
              xs="auto"
            >
              <Row finances={finances} rowdata={rowdata} setFinances={setFinances} />
            </Grid>
          );
        });
      })}
      <Grid
             container
             direction="row"
             item
             spacing={1}
             wrap="nowrap"
             xs="auto"
             className={classes.overAll}
        >
      <Grid className={classes.gridBorder} item xs={4}>
          <Card className={classes.cardInfo}><strong>ИТОГО</strong></Card>
        </Grid>
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{totalPerDay.passengers}</Card>
        </Grid>
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{totalPerDay.card}</Card>
        </Grid>
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{totalPerDay.office}</Card>
        </Grid>
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{totalPerDay.cash}</Card>
        </Grid>
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>
            {totalPerDay.correction}
          </Card>
        </Grid>
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{totalPerDay.tripSum}</Card>
        </Grid>
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{totalPerDay.toDriver}</Card>
        </Grid>
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{totalPerDay.giveToDriver}</Card>
        </Grid>
        <Grid className={classes.gridBorder} item xs={2}>
          <Card className={classes.cardInfo}>{totalPerDay.firm}</Card>
        </Grid>
      </Grid>      
    </Grid>
  );
}

export default TableContent;
