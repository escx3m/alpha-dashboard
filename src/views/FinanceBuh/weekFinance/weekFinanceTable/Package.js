import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, TextField, Button } from '@material-ui/core';
import { ApiContext } from '../../../../Routes';

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

const PackageRow = props => {
  const {
    dateTimeStr,
    directionStr,
    index,
    ownerStr,
    senderStr,
    cargo,
    parcels,
    setParcels,
    checkState
  } = props;
  console.log('props = ', props)
  const classes = useStyles();
  const { api } = useContext(ApiContext);
  const [sendEarned, setSendEarned] = useState(cargo.earned);

  useEffect(() => {
    setSendEarned(cargo.earned);
  }, [cargo.earned]);

  const totalPay = +sendEarned - +cargo.cash;
  const totalSum = +cargo.card + +cargo.cash + +cargo.office;
  const totalFirm = +cargo.total - +cargo.cash - +cargo.pay;

  const currentPackage = {
    packageId: cargo.packageId,
    routeId: cargo.routeId,
    ownerId: cargo.ownerId,
    ownerStr: ownerStr,
    dateTime: cargo.dateTime,
    directionStr: directionStr,
    card: cargo.card || 0,
    cash: cargo.cash || 0,
    office: cargo.office || 0,
    senderStr: senderStr,
    fromCityId: cargo.fromCityId,
    phone: cargo.phone,
    phone_2: cargo.phone_2,
    toCityId: cargo.toCityId,
    total: totalSum || 0,
    earned: +sendEarned || 0,
    pay: +totalPay || 0,
    firm: +totalFirm || 0
  };

  return (
    <Grid
      className={classes.overAll}
      container
      direction="row"
      item
      key={`${index}`}
      spacing={1}
      wrap="nowrap"
      xs="auto"
    >
      {(checkState.checkedAll || checkState.checkedCar) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}1`}
          xs={1}
        >
          <Card className={classes.cardInfo}>
            <strong>Посылка</strong>
          </Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedOwner) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}2`}
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentPackage.ownerStr}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedDriver) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}3`}
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentPackage.senderStr}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedDirection) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}4`}
          xs={1}
        >
          <Card className={classes.cardInfo}>
            {currentPackage.directionStr}
          </Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedPassengers) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}5`}
          xs={1}
        >
          <Card className={classes.cardInfo}>{dateTimeStr}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedCard) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}6`}
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentPackage.card}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedCash) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}7`}
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentPackage.cash}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedOffice) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}8`}
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentPackage.office}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedCorrection) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}9`}
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentPackage.correction}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedSum) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}10`}
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentPackage.total}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedAccrued) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}11`}
          xs={1}
        >
          <Card className={classes.cardInfo}>
            <TextField
              inputProps={{ style: { textAlign: 'center', width: '40px' } }}
              onChange={e => setSendEarned(e.target.value)}
              value={sendEarned}
            />
          </Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedPayment) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}12`}
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentPackage.pay}</Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedProfit) && (
        <Grid
          className={classes.gridBorder}
          item
          key={`${index}13`}
          xs={1}
        >
          <Card className={classes.cardInfo}>{currentPackage.firm}</Card>
        </Grid>
      )}
      <Grid
        className={classes.gridBorder}
        item
        key={`${index}14`}
        xs={1}
      >
        <Card className={classes.cardInfo}>
          <Button
            className={classes.btnSave}
            color="primary"
            onClick={e => {
              setParcels([...parcels, currentPackage]);
              api.addPackages(currentPackage);
              e.currentTarget.style.backgroundColor = 'green';
            }}
            variant="contained"
          >
            Сохранить
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PackageRow;
