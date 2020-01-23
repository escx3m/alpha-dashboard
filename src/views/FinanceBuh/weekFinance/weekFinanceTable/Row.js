import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ApiContext } from '../../../../Routes';
import { citiesName } from '../../../../helpers/constants';

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
    key,
    cash,
    card,
    carTitle,
    carOwner,
    carDriver,
    currentCorrection,
    fromCityId,
    toCityId,
    fromTime,
    office,
    direction,
    isSingleRoute,
    payToDriver,
    startRouteId,
    totalPassengers,
    finances,
    setFinances,
    checkState,
    exportData,
    setExportData
  } = props;
  const classes = useStyles();
  const { api } = useContext(ApiContext);
  const [sendCorrection, setSendCorrection] = useState(currentCorrection);
  const [sendEarned, setSendEarned] = useState(payToDriver);

  useEffect(() => {
    setSendCorrection(currentCorrection);
  }, [currentCorrection]);

  useEffect(() => {
    setSendEarned(payToDriver);
  }, [payToDriver]);

  const totalPay = +sendEarned - +cash;
  const totalSum = +card + +cash + +office + +sendCorrection;
  const totalFirm = +totalSum - +cash - +totalPay;
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
    earned: +sendEarned || 0,
    pay: +totalPay || 0,
    firm: +totalFirm || 0,
    isSingleRoute: isSingleRoute
  };
  console.log('row exportData.dayResult = ', exportData.dayResult)
  const currentRoutesResult = {
    count: exportData.routesResult.count + +currentFinance.count,
    card: exportData.routesResult.card + +currentFinance.card,
    cash: exportData.routesResult.cash + +currentFinance.cash,
    office: exportData.routesResult.office + +currentFinance.office,
    correction: exportData.routesResult.correction + +currentFinance.correction,
    total: exportData.routesResult.total + +currentFinance.total,
    earned: exportData.routesResult.earned + +currentFinance.earned,
    pay: exportData.routesResult.pay + +currentFinance.pay,
    firm: exportData.routesResult.firm + +currentFinance.firm
  }
  const currentDayResult = {
    count: exportData.dayResult.count + +currentFinance.count,
    card: exportData.dayResult.card + +currentFinance.card,
    cash: exportData.dayResult.cash + +currentFinance.cash,
    office: exportData.dayResult.office + +currentFinance.office,
    correction: exportData.dayResult.correction + +currentFinance.correction,
    total: exportData.dayResult.total + +currentFinance.total,
    earned: exportData.dayResult.earned + +currentFinance.earned,
    pay: exportData.dayResult.pay + +currentFinance.pay,
    firm: exportData.dayResult.firm + +currentFinance.firm
  }
  return (
    <Grid
      className={classes.overAll}
      container
      direction="row"
      item
      spacing={1}
      key={key}
      wrap="nowrap"
      xs="auto">
      {(checkState.checkedAll || checkState.checkedCar) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{carTitle}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedOwner) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{currentFinance.carOwner}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedDriver) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{currentFinance.carDriver}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedDirection) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{direction}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedPassengers) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>
            {currentFinance.passengersTotal}
          </Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedCard) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{currentFinance.card}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedCash) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{currentFinance.cash}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedOffice) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{currentFinance.office}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedCorrection) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>
            <TextField
              inputProps={{ style: { textAlign: 'center', width: '40px' } }}
              onChange={e => {
                setSendCorrection(e.target.value)
                setExportData({ 
                  ...exportData,
                  routesResult: {
                    ...exportData.routesResult,
                    currentRoutesResult
                  },
                  dayResult: {
                    ...exportData.dayResult,
                    currentDayResult
                  }
                })
              }}
              value={sendCorrection}
            />
          </Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedSum) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{currentFinance.totalSum}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedAccrued) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>
            <TextField
              inputProps={{ style: { textAlign: 'center', width: '40px' } }}
              onChange={e => { 
                setSendEarned(e.target.value)
                setExportData({ 
                  ...exportData,
                  routesResult: {
                    ...exportData.routesResult,
                    currentRoutesResult
                  },
                  dayResult: {
                    ...exportData.dayResult,
                    currentDayResult
                  }
                })
              }}
              value={sendEarned}
            />
          </Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedPayment) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{currentFinance.pay}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedProfit) && (
        <Grid className={classes.gridBorder} item xs={1}>
          <Card className={classes.cardInfo}>{currentFinance.firm}</Card>
        </Grid>
      )}
      <Grid className={classes.gridBorder} item xs={1}>
        <Card className={classes.cardInfo}>
          <Button
            className={classes.btnSave}
            color="primary"
            onClick={e => {
              setFinances([...finances, currentFinance]);
              setExportData(() => {
                const exportCopy = exportData.dataToExport.filter(
                  data => data.startRouteId !== currentFinance.startRouteId
                );
                const currentFinanceToExport = {
                  Тип: currentFinance.isSingleRoute,
                  Время_рейса: currentFinance.fromTime,
                  Номер_машины: currentFinance.carTitle,
                  Владелец: currentFinance.carOwner,
                  Водитель: currentFinance.carDriver,
                  Направление: `${citiesName[currentFinance.fromCityId]} - ${
                    citiesName[currentFinance.toCityId]
                  }`,
                  Пассажиров: currentFinance.passengersTotal,
                  Карта: currentFinance.card,
                  Наличные: currentFinance.cash,
                  Офис: currentFinance.office,
                  Корректировка: currentFinance.correction,
                  Всего: currentFinance.totalSum,
                  Начислено: currentFinance.earned,
                  Выдача: currentFinance.pay,
                  Фирма: currentFinance.firm,
                  startRouteId: currentFinance.startRouteId
                };
                return {
                  ...exportData,
                  dataToExport: [...exportData.dataToExport, currentFinanceToExport]
                };
              });
              api.addFinances(currentFinance);
              e.currentTarget.style.backgroundColor = 'green';
            }}
            variant="contained">
            Сохранить
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Row;
