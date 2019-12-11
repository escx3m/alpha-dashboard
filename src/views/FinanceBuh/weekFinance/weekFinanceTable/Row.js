import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format, isSameDay } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { makeJSDateObject } from '../../../../helpers/helpers';
import { ApiContext } from '../../../../Routes';
import { cities } from '../../../../helpers/constants';

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
  },
  btnSave: {
    width: '45px',
    height: '40px',
    fontSize: '9px'
  }
}));

function Row(props) {
  const {
    cash,
    card,
    carTitle,
    carNumber,
    carOwner,
    carDriver,
    currentCorrection,
    k,
    route,
    selectedDay,
    office,
    fromCity,
    toCity,
    passengersIncomeSum,
    payToDriver,
    totalToDriver,
    firmIncome,
    startRouteId,
    totalPassengers,
  } = props.rowdata;
  const classes = useStyles();
  const { api } = useContext(ApiContext);
  const { finances, setFinances } = props;
  const [sendCorrection, setSendCorrection] = useState(currentCorrection);
  const direction = cities[route[0].fromCityId] + '->' + cities[route[0].toCityId]; 
  const carOwnerString = `${carOwner.id} ${carOwner.surname} ${carOwner.name} ${carOwner.patronymic}`
  const carDriverString = `${carDriver.id} ${carDriver.surname} ${carDriver.name} ${carDriver.patronymic}`
  
  useEffect(() => {
    setSendCorrection(currentCorrection) 
  }, [currentCorrection])
  
  const totalSum = +card + +cash + +office + +sendCorrection
  const totalFirm = totalSum - +cash - +totalToDriver
  const currentFinance = {
    startRouteId: +startRouteId,
    startRouteDate: route[0].fromTime,
    carTitle: carTitle + ' ' + carNumber,
    carOwner: carOwnerString, 
    carDriver: carDriverString,
    direction: direction,
    passengersTotal: totalPassengers,
    card: +card || 0,
    cash: +cash || 0,
    office: +office || 0,
    correction: +sendCorrection || 0,
    totalSum: +totalSum || 0,
    earned: +payToDriver || 0,
    pay: +totalToDriver || 0,
    firm: +totalFirm || 0,
  }
  return (
    <Grid
      className={classes.overAll}
      container
      direction="row"
      item
      spacing={1}
      wrap="nowrap"
    >
      <Grid className={classes.gridBorder} item xs={1}>
        <Card
          className={
            isSameDay(makeJSDateObject(new Date()), selectedDay)
              ? classes.cardToday
              : classes.cardDate
          }>
          {format(selectedDay, 'd MMM', { locale: ruLocale })}
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
          {direction}
        </Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{totalPassengers}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{card}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{cash}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{office}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>
          <TextField 
            onChange={e => setSendCorrection(e.target.value)}
            value={sendCorrection}
          />
        </Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{currentFinance.totalSum}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{payToDriver}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{totalToDriver}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{currentFinance.firm}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>
          <Button
            className={classes.btnSave}
            color="primary"
            onClick={() => {
              setFinances([...finances, currentFinance])
              api.addFinances(currentFinance)
            }}
            variant="contained"
          >
            Сохранить
          </Button>
        </Card>
      </Grid> 
    </Grid>
  );
}

export default Row;
