import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format, isSameDay } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { makeJSDateObject } from '../../../../helpers/helpers';
import { ApiContext } from '../../../../Routes';
import { cities, wrongPricePassenger } from '../../../../helpers/constants';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.MuiInput-root': {
      fontSize: '12px'
    }
  },
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

function Row(props) {
  const {
    cash,
    card,
    carTitle,
    carOwner,
    carDriver,
    currentCorrection,
    fromCityId,
    toCityId,
    k,
    fromTime,
    selectedDay,
    office,
    direction,
    passengersIncomeSum,
    payToDriver,
    totalToDriver,
    firmIncome,
    startRouteId,
    totalPassengers
  } = props.rowdata;
  const classes = useStyles();
  const { api } = useContext(ApiContext);
  const { finances, setFinances, checkState } = props;
  const [sendCorrection, setSendCorrection] = useState(currentCorrection);

  useEffect(() => {
    setSendCorrection(currentCorrection);
  }, [currentCorrection]);

  const totalSum = +card + +cash + +office + +sendCorrection;
  const totalFirm = totalSum - +cash - +totalToDriver;
  const currentFinance = {
    startRouteId: +startRouteId,
    startRouteDate: fromTime,
    carTitle: carTitle,
    carOwner: carOwner,
    carDriver: carDriver,
    fromCityId: fromCityId,
    toCityId: toCityId,
    passengersTotal: totalPassengers,
    card: +card || 0,
    cash: +cash || 0,
    office: +office || 0,
    correction: +sendCorrection || 0,
    totalSum: +totalSum || 0,
    earned: +payToDriver || 0,
    pay: +totalToDriver || 0,
    firm: +totalFirm || 0
  };
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
    <Grid
      className={classes.overAll}
      container
      direction="row"
      item
      spacing={1}
      wrap="nowrap"
      xs="auto"
    >
      {(checkState.checkedAll || checkState.checkedCar) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{carTitle}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedOwner) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentFinance.carOwner}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedDriver) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentFinance.carDriver}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedDirection) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{direction}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedPassengers) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{totalPassengers}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedCard) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{card}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedCash) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{cash}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedOffice) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{office}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedCorrection) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>
            <TextField
              inputProps={{ style: { textAlign: 'center', width: '40px' } }}
              onChange={e => setSendCorrection(e.target.value)}
              value={sendCorrection}
            />
          </Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedSum) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentFinance.totalSum}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedAccrued) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{payToDriver}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedPayment) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{totalToDriver}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedProfit) && (
        <Grid
          className={classes.gridBorder}
          item
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentFinance.firm}</Card>
        </Grid>
      )}
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>
          <Button
            className={classes.btnSave}
            color="primary"
            onClick={() => {
              setFinances([...finances, currentFinance]);
              api.addFinances(currentFinance);
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
