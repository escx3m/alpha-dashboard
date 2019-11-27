import React from 'react';
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  borderCard: {
    border: '1px solid #969696',
  },
  gridMarginBot:{
    marginBottom: '4px',
    fontSize: '20px',
    marginLeft: '1px',
    // position: 'fixed',  
    // top: '0',
    // zIndex: '100',  
    // width: '100',
  },
  card: {
    background: '#C8C8C8',
    color: 'black',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:'16px',
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
      xs={14}
      wrap='nowrap'
    >
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Дата</Card></Grid> 
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Авт, г/н</Card></Grid> 
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Владелец</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Водитель</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Направление</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Пассажиров</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Картой</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Наличные</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Офис</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Корректировка</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Всего</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Начислено</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Выдача</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Фирма</Card></Grid>
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>кнопка</Card></Grid>
    </Grid>
  );
}

export default TableHeader;

