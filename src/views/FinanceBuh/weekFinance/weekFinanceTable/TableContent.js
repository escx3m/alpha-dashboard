import React  from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { eachDayOfInterval, format, endOfWeek, isSameDay } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { makeJSDateObject } from '../../../../helpers/helpers';
import {
  payToDrivers,
  cities,
  notStandard
} from '../../../../helpers/constants';
import Row from './Row';

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
    color: 'black', height: 25,
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
  },
  btnSave: {
    width: '45px',
    height: '40px',
    fontSize: '9px'
  }
}));

function TableContent(props) {
  const classes = useStyles();
  const { routes, finances, selectedWeekStart, selectedDay } = props;
  const start = selectedWeekStart;
  const end = endOfWeek(selectedWeekStart, { weekStartsOn: 1 });
  const ownersId = new Set([7, 38, 52]);
  const currentRoutes = routes.filter(route =>
    isSameDay(
      makeJSDateObject(new Date(new Date(route.fromTimeLocal).toUTCString())),
      selectedDay
    )
  );
  const cars = currentRoutes.reduce((acc, route) => {
    if (route.carId && !acc.includes(route.carId)) {
      acc.push(route.carId);
    }
    return acc;
  }, []);

  return (
    <Grid container spacing={1}>
      {cars.map((carId, i) => {
        const carRoutes = currentRoutes.filter(route => route.carId === carId);
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
          const currentFinancesArray = finances.filter(finance => 
            finance.startRouteId === route[0].id);
          const currentCorrection = currentFinancesArray.length 
            ? currentFinancesArray.slice(-1)[0].correction
            : '';

          console.log(currentCorrection)
          const passengers = route.reduce((acc, r) => {
            const { passengers } = r;
            return acc.concat(
              passengers.filter(passenger => passenger.state === delivered && passenger.type === human)
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
            : ownersId.has(carOwner)
            ? payObj.all > passengersIncomeSum
              ? payObj.all
              : payObj.owner_id > passengersIncomeSum
              ? passengersIncomeSum
              : payObj.all
            : payObj.all;

          const totalToDriver = payToDriver - cash;
          const firmIncome = passengersIncomeSum - cash - totalToDriver;
          const rowData = {
            startRouteId: route[0].id
          };
          const rowdata = {
            k: k,
            route: route,
            isSameDay: isSameDay,
            selectedDay: selectedDay,
            carTitle: carTitle,
            carNumber: carNumber,
            carOwner: carOwner,
            carDriver: carDriver,
            totalPassengers: totalPassengers,
            fromCity: fromCity,
            toCity: toCity,
            cash: cash,
            card: card, 
            office: office,
            passengersIncomeSum: passengersIncomeSum,
            currentCorrection: currentCorrection,
            payToDriver: payToDriver,
            totalToDriver: totalToDriver,
            firmIncome: firmIncome,
            startRouteId: rowData.startRouteId,
            cities: cities,
          }; 
          return (
            <Grid
              className={classes.overAll}
              container
              item
              direction="row"
              spacing={1}
              xs='auto'
              wrap='nowrap'
              key={`${k}`}
              style={route.length === 1 ? { backgroundColor: 'orange' } : {}}
            >
              <Row rowdata={rowdata}/>
            </Grid>
          );
        });
      })}
    </Grid>
  );
}

export default TableContent;
