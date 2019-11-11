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
import { textAlign } from '@material-ui/system';

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
  },
  profit1: {
    background: 'rgb(244,249,253)',
    width: '100%',
    fontSize: '36px',
    textAlign: 'center',
  },
  paper: {
    background: 'rgb(244,249,253)',
    textAlign: 'center',
    padding: '24px',
  },
  paper1: {
    background: 'rgb(244,249,253)',
    textAlign: 'center',
    padding: '12px',
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
            <Grid className={classes.profit}><p style={{ padding: '24px' }}>1 433 523 Р</p></Grid>
            <div style={{ marginTop: '50px' }}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><p style={{ fontSize: '24px' }}>Наличные</p> <p style={{ marginTop: '20px',fontSize:'20px' }}>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><p style={{ fontSize: '24px' }}>Безналичный</p> <p style={{ marginTop: '20px',fontSize:'20px' }}>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><p style={{ fontSize: '24px' }}>Возврат</p> <p style={{ marginTop: '20px',fontSize:'20px' }}>695 321</p></Paper>
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
            <Grid className={classes.profit1}><p>1 433 523 Р</p></Grid>
            <div style={{ marginTop: '25px' }}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Возврат</p> <p>695 321</p></Paper>
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
            <Grid className={classes.profit1}><p>1 433 523 Р</p></Grid>
            <div style={{ marginTop: '25px' }}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Возврат</p> <p>695 321</p></Paper>
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
            <Grid className={classes.profit1}><p>1 433 523 Р</p></Grid>
            <div style={{ marginTop: '25px' }}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Возврат</p> <p>695 321</p></Paper>
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
            <Grid className={classes.profit1}><p>1 433 523 Р</p></Grid>
            <div style={{ marginTop: '25px' }}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Возврат</p> <p>695 321</p></Paper>
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
            <Grid className={classes.profit1}><p>1 433 523 Р</p></Grid>
            <div style={{ marginTop: '25px' }}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Возврат</p> <p>695 321</p></Paper>
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
            <Grid className={classes.profit1}><p>1 433 523 Р</p></Grid>
            <div style={{ marginTop: '25px' }}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Возврат</p> <p>695 321</p></Paper>
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
            <Grid className={classes.profit1}><p>1 433 523 Р</p></Grid>
            <div style={{ marginTop: '25px' }}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Возврат</p> <p>695 321</p></Paper>
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
            <Grid className={classes.profit1}><p>1 433 523 Р</p></Grid>
            <div style={{ marginTop: '25px' }}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Наличные</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Безнал</p> <p>695 321</p></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper1}><p>Возврат</p> <p>695 321</p></Paper>
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
