import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Button
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
    maxWidth: 400,
    width: '100%',
  },
  headInfo: {
    background: 'rgb(244,249,253)',
    width: '100%',
    padding: '12px',
    fontSize: '20px',
  },
  trip: {
    marginLeft: '10px',
  },
  textSumm: {
    float: 'right',
    marginRight: '10px',
  },
  gridMarginTop: {
    marginTop: '5px',
  },
  gridCardPas: {
    marginTop: '50px',
  },
  btn: {
    width: '150px',
    height: '50px',
    border: '1px solid #3f51b5',
    background: 'white',
    color:'black',
    fontSize: '18px',
  },
}));

const Report = () => {
  const classes = useStyles();

  return (
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

      <Grid container spacing={3} className={classes.gridCardPas}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Card className={classes.card}>
              <CardHeader
                title="Перевезено пассажиров"
                action={
                  <IconButton aria-label="settings">
                    <CachedIcon />
                  </IconButton> 
                }
              />
              <CardContent>
                <Grid className={classes.headInfo}><text className={classes.trip}>Рейсы</text><text className={classes.textSumm}>Количество</text></Grid>
                <div >
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Элиста - Волгоград
        </Grid>
                    <Grid item xs={2}>
                      256
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Элиста - Астрахань
        </Grid>
                    <Grid item xs={2}>
                      250
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Элиста - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      230
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Ростов-на-Дону - Астрахань
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Астрахань - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Волгоград - Элиста
        </Grid>
                    <Grid item xs={2}>
                      256
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Астрахань - Элиста
        </Grid>
                    <Grid item xs={2}>
                      250
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Ростов-на-Дону - Элиста
        </Grid>
                    <Grid item xs={2}>
                      230
        </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><Card className={classes.card}>
            <CardHeader
              title="Количество записанных пассажиров"
              action={
                <IconButton aria-label="settings">
                  <CachedIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Grid className={classes.headInfo}><text className={classes.trip}>Рейсы</text><text className={classes.textSumm}>Количество</text></Grid>
              <div >
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Элиста - Волгоград
        </Grid>
                  <Grid item xs={2}>
                    256
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Элиста - Астрахань
        </Grid>
                  <Grid item xs={2}>
                    250
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Элиста - Ростов-на-Дону
        </Grid>
                  <Grid item xs={2}>
                    230
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Ростов-на-Дону - Астрахань
        </Grid>
                  <Grid item xs={2}>
                    220
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Астрахань - Ростов-на-Дону
        </Grid>
                  <Grid item xs={2}>
                    220
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Волгоград - Элиста
        </Grid>
                  <Grid item xs={2}>
                    256
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Астрахань - Элиста
        </Grid>
                  <Grid item xs={2}>
                    250
        </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.gridMarginTop}>
                  <Grid item xs={10}>
                    Ростов-на-Дону - Элиста
        </Grid>
                  <Grid item xs={2}>
                    230
        </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Card className={classes.card}>
              <CardHeader
                title="Количество купивших онлайн"
                action={
                  <IconButton aria-label="settings">
                    <CachedIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Grid className={classes.headInfo}><text className={classes.trip}>Рейсы</text><text className={classes.textSumm}>Количество</text></Grid>
                <div >
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Элиста - Волгоград
        </Grid>
                    <Grid item xs={2}>
                      256
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Элиста - Астрахань
        </Grid>
                    <Grid item xs={2}>
                      250
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Элиста - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      230
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Ростов-на-Дону - Астрахань
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Астрахань - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Волгоград - Элиста
        </Grid>
                    <Grid item xs={2}>
                      256
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Астрахань - Элиста
        </Grid>
                    <Grid item xs={2}>
                      250
        </Grid>
                  </Grid>
                  <Grid container spacing={1} className={classes.gridMarginTop}>
                    <Grid item xs={10}>
                      Ростов-на-Дону - Элиста
        </Grid>
                    <Grid item xs={2}>
                      230
        </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Report;