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
  },
  btnSave: {
    width: '45px',
    height: '40px',
    fontSize: '9px'
  }
}));

const Summary = props => {
  const classes = useStyles();
  const {
    message,
    count,
    card,
    cash,
    office,
    correction,
    total,
    earned,
    pay,
    firm
  } = props;
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
      <Grid
        className={classes.gridBorder}
        item
        xs={4}
      >
        <Card className={classes.cardInfo}>
          <strong>{message}</strong>
        </Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{count}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{card}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{cash}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{office}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{correction}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{total}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{earned}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={1}
      >
        <Card className={classes.cardInfo}>{pay}</Card>
      </Grid>
      <Grid
        className={classes.gridBorder}
        item
        xs={2}
      >
        <Card className={classes.cardInfo}>{firm}</Card>
      </Grid>
    </Grid>
  );
};

export default Summary;
