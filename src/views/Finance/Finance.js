import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
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
  profitSmall: {
    background: 'rgb(244,249,253)',
    width: '100%',
    fontSize: '36px',
    textAlign: 'center',
    padding: '12px',
  },
  paper: {
    background: 'rgb(244,249,253)',
    textAlign: 'center',
    padding: '24px',
  },
  paperSmall: {
    background: 'rgb(244,249,253)',
    textAlign: 'center',
    padding: '12px',
  },
  allBlockPay: {
    marginTop: '50px',
  },
  cityBlockPay: {
    marginTop: '50px',
  },
  p1: {
    fontSize: '24px',
  },
  p2: {
    marginTop: '20px',
    fontSize:'20px',
  },
}));

const Report = () => {
  const classes = useStyles();

  return (
    <div>
    <div className={classes.root}>
      <Grid>
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
    </div>
    <div className={classes.root}>
    <Grid container spacing={3}>
        <Grid item xs={4}>
        <Card>
          <CardHeader
            title="Элиста - Волгоград"
            action={
              <IconButton aria-label="settings">
                <CachedIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid className={classes.profitSmall}><p>1 433 523 Р</p></Grid>
            <div className={classes.cityBlockPay}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Возврат</p> <p>695 321</p></Paper>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={4}>
        <Card>
          <CardHeader
            title="Элиста - Астрахань"
            action={
              <IconButton aria-label="settings">
                <CachedIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid className={classes.profitSmall}><p>1 433 523 Р</p></Grid>
            <div className={classes.cityBlockPay}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Возврат</p> <p>695 321</p></Paper>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={4}>
        <Card>
          <CardHeader
            title="Элиста - Ростов-на-Дону"
            action={
              <IconButton aria-label="settings">
                <CachedIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid className={classes.profitSmall}><p>1 433 523 Р</p></Grid>
            <div className={classes.cityBlockPay}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Возврат</p> <p>695 321</p></Paper>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
        </Grid>
      </Grid>
    </div>
    <div className={classes.root}>
    <Grid container spacing={3}>
        <Grid item xs={4}>
        <Card>
          <CardHeader
            title="Волгоград - Элиста"
            action={
              <IconButton aria-label="settings">
                <CachedIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid className={classes.profitSmall}><p>1 433 523 Р</p></Grid>
            <div className={classes.cityBlockPay}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Возврат</p> <p>695 321</p></Paper>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={4}>
        <Card>
          <CardHeader
            title="Астрахань - Элиста"
            action={
              <IconButton aria-label="settings">
                <CachedIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid className={classes.profitSmall}><p>1 433 523 Р</p></Grid>
            <div className={classes.cityBlockPay}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Возврат</p> <p>695 321</p></Paper>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={4}>
        <Card>
          <CardHeader
            title="Ростов-на-Дону - Элиста"
            action={
              <IconButton aria-label="settings">
                <CachedIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid className={classes.profitSmall}><p>1 433 523 Р</p></Grid>
            <div className={classes.cityBlockPay}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Возврат</p> <p>695 321</p></Paper>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
        </Grid>
      </Grid>
    </div>
    <div className={classes.root}>
    <Grid container spacing={3}>
        <Grid item xs={4}>
        <Card>
          <CardHeader
            title="Ростов-на-Дону - Астрахань"
            action={
              <IconButton aria-label="settings">
                <CachedIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid className={classes.profitSmall}><p>1 433 523 Р</p></Grid>
            <div className={classes.cityBlockPay}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Возврат</p> <p>695 321</p></Paper>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={4}>
        <Card>
          <CardHeader
            title="Астрахань - Ростов-на-Дону"
            action={
              <IconButton aria-label="settings">
                <CachedIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid className={classes.profitSmall}><p>1 433 523 Р</p></Grid>
            <div className={classes.cityBlockPay}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paperSmall}><p>Возврат</p> <p>695 321</p></Paper>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
        </Grid>
      </Grid>
    </div>
    </div>
  );
};

export default Report;
