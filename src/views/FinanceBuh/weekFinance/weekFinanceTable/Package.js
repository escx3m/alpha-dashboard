import React from 'react';
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
  }
}));

const PackageRow = props => {
  const classes = useStyles();
  const { dateTimeStr, directionStr, index, ownerStr, cargo } = props;
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
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>
          <strong>Посылка</strong>
        </Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{dateTimeStr}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{ownerStr}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{directionStr}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.cash}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.total}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.earned}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.firm}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cargo.pay}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{ownerStr}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{ownerStr}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{ownerStr}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{ownerStr}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{ownerStr}</Card>
      </Grid>
    </Grid>
  );
};

export default PackageRow;
