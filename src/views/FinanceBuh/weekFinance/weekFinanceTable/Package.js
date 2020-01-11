import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, TextField, Button } from '@material-ui/core';
import { ApiContext } from '../../../../Routes';

// const useStyles = makeStyles(theme => ({
//   gridBorder: {
//     border: '1px solid #969696'
//   },
//   card: {
//     background: '#F6F6F6',
//     color: 'black',
//     height: 25
//   },
//   cardInfo: {
//     height: '50px',
//     fontSize: '12px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center'
//   },
//   overAll: {
//     marginLeft: '1px'
//   }
// }));
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
  const classes = useStyles();
  const { api } = useContext(ApiContext);

  const {
    dateTimeStr,
    directionStr,
    index,
    ownerStr,
    senderStr,
    cargo,
    packages,
    setPackages,
    checkState
  } = props;
  const [sendEarned, setSendEarned] = useState(cargo.earned);

  useEffect(() => {
    setSendEarned(cargo.earned);
  }, [cargo.earned]);

  const currentPackage = {
    card: cargo.card || 0,
    cash: cargo.cash || 0,
    office: cargo.office || 0,
    owner: ownerStr,
    sender: senderStr,
    fromCityId: cargo.fromCityId,
    toCityId: cargo.toCityId,
    total: cargo.total || 0,
    earned: +sendEarned || 0,
    pay: +cargo.pay || 0,
    firm: +cargo.firm || 0
  };

  return (
    <Grid
      className={classes.overAll}
      container
      direction="row"
      item
      key={index}
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
          <Card className={classes.cardInfo}>
            <strong>Посылка</strong>
          </Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedOwner) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{ownerStr}</Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedDriver) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{senderStr}</Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedDirection) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{directionStr}</Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedPassengers) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{dateTimeStr}</Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedCard) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.card}</Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedCash) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.cash}</Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedOffice) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.office}</Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedCorrection) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.correction}</Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedSum) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.total}</Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedAccrued) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        {/* <Card className={classes.cardInfo}>{payToDriver}</Card> */}
        <Card className={classes.cardInfo}>
          <TextField
            inputProps={{ style: { textAlign: 'center', width: '40px' } }}
            onChange={e => setSendEarned(e.target.value)}
            value={sendEarned}
          />
        </Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedPayment) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.pay}</Card>
      </Grid>}
      {(checkState.checkedAll || checkState.checkedProfit) && <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.firm}</Card>
      </Grid>}
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>
          <Button
            className={classes.btnSave}
            color="primary"
            onClick={e => {
              setPackages([...packages, currentPackage]);
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
