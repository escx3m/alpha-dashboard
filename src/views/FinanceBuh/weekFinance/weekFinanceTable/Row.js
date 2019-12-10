import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Grid, Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { eachDayOfInterval, format, endOfWeek, isSameDay } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { makeJSDateObject } from '../../../../helpers/helpers';
import {
  payToDrivers,
  cities,
  notStandard
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
  const classes = useStyles();
  const {
    totalPassengers,
    k,
    route,
    selectedDay,
    carTitle,
    carNumber,
    carOwner,
    carDriver,
    office,
    cash,
    card,
    fromCity,
    toCity,
    passengersIncomeSum,
    currentCorrection,
    payToDriver,
    totalToDriver,
    firmIncome,
    startRouteId,
  } = props.rowdata;
  const [sendCorrection, setSendCorrection] = useState(currentCorrection === '' ? 0 : currentCorrection);
  console.log('ROW startRouteId ', startRouteId)
  console.log('ROW sendCorrection ', sendCorrection)
  return (
    <Grid
      className={classes.overAll}
      container
      item
      direction="row"
      spacing={1}
      wrap="nowrap">
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
          {cities[route[0].fromCityId]}->{cities[route[0].toCityId]}
        </Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{totalPassengers}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{card}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{office}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{cash}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>
          <TextField 
            defaultValue={0 || sendCorrection}
            onChange={e => setSendCorrection(e.target.value)}
          />
        </Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{passengersIncomeSum}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{payToDriver}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{totalToDriver}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>{firmIncome}</Card>
      </Grid>
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>
          <Button
            className={classes.btnSave}
            onClick={() => 
                axios.post('/api/board/corrections', 
                {
                  correction: +sendCorrection,
                  startRouteId: +startRouteId
                })
            }
            variant="contained"
            color="primary">
            Сохранить
          </Button>
        </Card>
      </Grid> 
    </Grid>
  );
}

export default Row;
