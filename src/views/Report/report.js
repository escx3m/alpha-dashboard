import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Paper
} from '@material-ui/core';

import CachedIcon from '@material-ui/icons/Cached';

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
}));

const Report = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
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
                <Grid style={{ background: 'rgb(244,249,253)', width: '100%', padding: '12px' }}><text style={{ fontSize: '20px', marginLeft: '10px' }}>Рейсы</text><text style={{ fontSize: '20px', float: 'right', marginRight: '10px' }}>Количество</text></Grid>
                <div >
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Элиста - Волгоград
        </Grid>
                    <Grid item xs={2}>
                      256
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Элиста - Астрахань
        </Grid>
                    <Grid item xs={2}>
                      250
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Элиста - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      230
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Ростов-на-Дону - Астрахань
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Астрахань - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Волгоград - Элиста
        </Grid>
                    <Grid item xs={2}>
                      256
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Астрахань - Элиста
        </Grid>
                    <Grid item xs={2}>
                      250
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
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
              <Grid style={{ background: 'rgb(244,249,253)', width: '100%', padding: '12px' }}><text style={{ fontSize: '20px', marginLeft: '10px' }}>Рейсы</text><text style={{ fontSize: '20px', float: 'right', marginRight: '10px' }}>Количество</text></Grid>
              <div >
                <Grid container spacing={1} style={{ marginTop: '5px' }}>
                  <Grid item xs={10}>
                    Элиста - Волгоград
        </Grid>
                  <Grid item xs={2}>
                    256
        </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: '5px' }}>
                  <Grid item xs={10}>
                    Элиста - Астрахань
        </Grid>
                  <Grid item xs={2}>
                    250
        </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: '5px' }}>
                  <Grid item xs={10}>
                    Элиста - Ростов-на-Дону
        </Grid>
                  <Grid item xs={2}>
                    230
        </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: '5px' }}>
                  <Grid item xs={10}>
                    Ростов-на-Дону - Астрахань
        </Grid>
                  <Grid item xs={2}>
                    220
        </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Астрахань - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                <Grid container spacing={1} style={{ marginTop: '5px' }}>
                  <Grid item xs={10}>
                    Волгоград - Элиста
        </Grid>
                  <Grid item xs={2}>
                    256
        </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: '5px' }}>
                  <Grid item xs={10}>
                    Астрахань - Элиста
        </Grid>
                  <Grid item xs={2}>
                    250
        </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: '5px' }}>
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
                <Grid style={{ background: 'rgb(244,249,253)', width: '100%', padding: '12px' }}><text style={{ fontSize: '20px', marginLeft: '10px' }}>Рейсы</text><text style={{ fontSize: '20px', float: 'right', marginRight: '10px' }}>Количество</text></Grid>
                <div >
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Элиста - Волгоград
        </Grid>
                    <Grid item xs={2}>
                      256
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Элиста - Астрахань
        </Grid>
                    <Grid item xs={2}>
                      250
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Элиста - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      230
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Ростов-на-Дону - Астрахань
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Астрахань - Ростов-на-Дону
        </Grid>
                    <Grid item xs={2}>
                      220
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Волгоград - Элиста
        </Grid>
                    <Grid item xs={2}>
                      256
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
                    <Grid item xs={10}>
                      Астрахань - Элиста
        </Grid>
                    <Grid item xs={2}>
                      250
        </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: '5px' }}>
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
