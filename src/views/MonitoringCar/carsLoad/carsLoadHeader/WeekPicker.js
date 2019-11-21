import React from 'react';
import { Grid, Card, Button } from '@material-ui/core';
import { addWeeks, format, endOfWeek, startOfWeek } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeJSDateObject } from '../../../../helpers/helpers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  //  "@global": {
  //   ".MuiTooltip-popper": {
  //     color: 'black',
  //   },
  // },
  card: {
    border:'1px solid #969696',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    color: 'black',
  },
  btn: {
    height: 56,
    background: 'white',
    color: 'black',
  },
  btnWeek: {
    background: 'white',
    color: 'black',
    border:'1px solid #969696',
    marginLeft:'20px',
  },
}));

const SelectWeek = (props) => {
  const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), { weekStartsOn: 1 });
  const classes = useStyles();
  const { selectedWeekStart, setSelectedWeekStart } = props;
  const handlePrevButtonClick = () => setSelectedWeekStart(addWeeks(selectedWeekStart, -1));
  const handleNextButtonClick = () => setSelectedWeekStart(addWeeks(selectedWeekStart, 1));
  const handleThisWeek = () => setSelectedWeekStart(currentWeekStart, 1);
  return (
    <Grid container >
      <Card className={classes.card}>
      <Button onClick={handlePrevButtonClick} className={classes.btn}><ChevronLeftIcon /></Button> 
          С {format(selectedWeekStart, ' dd MMM ', { locale: ruLocale })} 
          по {format(endOfWeek(selectedWeekStart, { weekStartsOn: 1 }), 'dd MMM', { locale: ruLocale })}
          {format(selectedWeekStart, ' yyyy', { locale: ruLocale })}
       <Button onClick={handleNextButtonClick} className={classes.btn}><ChevronRightIcon /></Button>
      </Card>
      <Button onClick={handleThisWeek} className={classes.btnWeek}>Текущая неделя</Button>
    </Grid>
  );
}

const WeekPicker = (props) => (
  <React.Fragment>
    <SelectWeek {...props} />
  </React.Fragment>
);

export default WeekPicker;
