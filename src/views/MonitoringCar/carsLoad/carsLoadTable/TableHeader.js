import React from 'react';
import { Grid } from '@material-ui/core';
import { format, startOfWeek, endOfWeek, getISODay, isSameDay, eachDayOfInterval } from 'date-fns';
import { makeJSDateObject } from '../../../../helpers/helpers';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ruLocale from "date-fns/locale/ru";


const useStyles = makeStyles(theme => ({
  borderCard: {
    border: '1px solid #969696',
  },
  gridMarginBot:{
    marginBottom: '4px',
    // fontSize: '20px',
    marginLeft: '1px',
  },
  card: {
    background: '#C8C8C8',
    color: 'black',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  const { selectedWeekStart } = props;
  const start = selectedWeekStart; 
  const end = endOfWeek(selectedWeekStart, { weekStartsOn: 1 });
  const classes = useStyles();


  let d = makeJSDateObject(start);
  
  return (
    <Grid className={classes.gridMarginBot} container item direction="row" spacing={1} xs={12}>
      <Grid item xs={2} className={classes.borderCard}><Card className={classes.card}>Автомобиль, г/н</Card></Grid> 
      <Grid item xs={1} className={classes.borderCard}><Card className={classes.card}>Схема</Card></Grid>

      {eachDayOfInterval({ start, end })
            .map((currentDay, i) => {
              
              return (
                <Grid key={i} item xs={1} className={classes.borderCard}>
                  <Card className={isSameDay(makeJSDateObject(new Date()), currentDay) ? classes.cardToday : classes.card}>
                    {`${format(currentDay, "d MMM", {locale:ruLocale})} ${format(currentDay, "EEEEEE", {locale:ruLocale})} `}
                  </Card>
                </Grid>
               );
            }) 
        }
      <Grid item xs={2} className={classes.borderCard}><Card className={classes.card}>Итого</Card></Grid>
    </Grid>
  );
}

export default TableHeader;

