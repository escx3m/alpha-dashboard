import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem 
} from '@material-ui/core';

import CachedIcon from '@material-ui/icons/Cached';
import RangePickerANTD from '../DatePicker/rangepickerANTD';

const useStyles = makeStyles(theme => ({
  //  "@global": {
  //   ".mnoButton-button": {
  //     backgroundColor: "#2196f3"
  //   },
  //   ".mnoButton-buttonDark": {
  //     backgroundColor: "#880e4f"
  //   },
  //   ".mnoButton-buttonLight": {
  //     backgroundColor: "#e1bee7"
  //   }
  // },
  root: {
    padding: theme.spacing(4)
  },
  card: {
    maxWidth: 'auto',
    width: '100%',
  },
  profit: {
    background: 'rgb(244,249,253)',
    width: '100%',
    fontSize: '42px',
    textAlign: 'center',
    padding: '24px',
  },
  profitTrip: {
    background: 'rgb(244,249,253)',
    width: '100%',
    fontSize: '42px',
    textAlign: 'center',
    padding: '24px',
    marginTop: '50px'
  },
  paper: {
    background: 'rgb(244,249,253)',
    textAlign: 'center',
    padding: '24px',
  },
  allBlockPay: {
    marginTop: '50px',
  },
  p1: {
    fontSize: '24px',
  },
  p2: {
    marginTop: '20px',
    fontSize:'20px',
  },
  btn: {
    width: '150px',
    height: '50px',
    border: '1px solid #3f51b5',
    background: 'white',
    color:'black',
    fontSize: '18px',
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
}));

const Report = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setAge(event.target.value);
  };
  return (
    <div>
    <div className={classes.root}>
    <Grid container spacing={3}>
<Grid item xs={2}>
<Button className={classes.btn}>Сегодня</Button>
</Grid>
<Grid item xs={2}>
<Button className={classes.btn}>Неделя</Button>
</Grid>
<Grid item xs={2}>
<Button className={classes.btn}>Месяц</Button>
</Grid>
<Grid item xs={2}>
<Button className={classes.btn}>Год</Button>
</Grid>
<Grid item xs={4}>
<RangePickerANTD />
</Grid>
</Grid>
      
      <Grid style={{marginTop:'50px'}}>
        <Card className={classes.card}>
          <CardHeader
            title="Прибыль по всем рейсам"
            action={
              <IconButton aria-label="settings">
                <CachedIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid className={classes.profit}>1 433 523 Р</Grid>
            <div className={classes.allBlockPay}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><p className={classes.p1}>Наличные</p> <p className={classes.p2}>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><p className={classes.p1}>Безналичный</p> <p className={classes.p2}>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><p className={classes.p1}>Возврат</p> <p className={classes.p2}>695 321</p></Paper>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid style={{marginTop:'50px'}}>
        <Card className={classes.card}>
          <CardHeader
            title="Прибыль по направлениям"
            action={
              <IconButton aria-label="settings">
                <CachedIcon />
              </IconButton>
            }
          />
          <CardContent style={{textAlign:'center'}}>
          <div>
          <Grid container spacing={3}>
<Grid item xs={4}>
<FormControl variant="outlined" className={classes.formControl} > 
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Откуда
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Элиста</MenuItem>
          <MenuItem value={20}>Волгоград</MenuItem>
          <MenuItem value={30}>Ростов-на-Дону</MenuItem>
          <MenuItem value={40}>Астрахань</MenuItem>
        </Select>
      </FormControl>
</Grid>
<Grid item xs={4}>
<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Куда
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Элиста</MenuItem>
          <MenuItem value={20}>Волгоград</MenuItem>
          <MenuItem value={30}>Ростов-на-Дону</MenuItem>
          <MenuItem value={40}>Астрахань</MenuItem>
        </Select>
      </FormControl> 
</Grid>
<Grid item xs={4}>
<RangePickerANTD />
</Grid>
</Grid>
</div>
            <Grid className={classes.profitTrip}>1 433 523 Р</Grid>
            <div className={classes.allBlockPay}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><p className={classes.p1}>Наличные</p> <p className={classes.p2}>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><p className={classes.p1}>Безналичный</p> <p className={classes.p2}>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><p className={classes.p1}>Возврат</p> <p className={classes.p2}>695 321</p></Paper>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
    </div>
  );
};

export default Report;
