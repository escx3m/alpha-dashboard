import React from 'react';
import { Grid, Card, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DirectionsCar,
         AirlineSeatReclineExtra, 
         CompareArrows, 
         AirlineSeatReclineNormal, 
         Payment, 
         Money, 
         Business, 
         Edit, 
         AccountBalance, 
         AccountBox,
         Poll,
         AssignmentReturned,
         AssignmentTurnedIn } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  borderCard: {
    border: '1px solid #969696',
  },
  gridMarginBot:{
    marginBottom: '4px',
    fontSize: '20px',
    marginLeft: '1px',
  },
  card: {
    background: '#C8C8C8',
    color: 'black',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:'12px',
  },
  cardToday: {
    background: '#3f51b5',
    color: 'white',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function TableHeader (props) {
  const classes = useStyles();
  
  return (
    <Grid 
      className={classes.gridMarginBot} 
      container 
      item 
      direction="row" 
      spacing={1} 
      xs='auto'
      wrap='nowrap'
    >

      <Grid item xs={1} className={classes.borderCard}> <Card className={classes.card}><Tooltip title="Авт, г/н"><DirectionsCar /></Tooltip></Card></Grid> 
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Владелец"><AccountBox /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Водитель"><AirlineSeatReclineExtra /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Направление"><CompareArrows /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Пассажиров"><AirlineSeatReclineNormal /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Картой"><Payment /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Наличные"><Money /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Офис"><Business /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Корректировка"><Edit /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Всего"><Poll /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Начислено"><AssignmentTurnedIn /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Выдача"><AssignmentReturned /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}><Tooltip title="Фирма"><AccountBalance /></Tooltip></Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}></Card></Grid>
    </Grid>
  );
}

export default TableHeader;

