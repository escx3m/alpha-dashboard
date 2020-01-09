import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Grid,
  Link,
  ExpansionPanel as Expansion,
  ExpansionPanelSummary as ExpansionHeader,
  ExpansionPanelDetails as ExpansionBody
} from '@material-ui/core';
import { cityShortNames as citiesName } from '../../../helpers/constants';

const useStyles = makeStyles(theme => ({
  gridCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paddingGrid: {
    paddingTop: '8px',
    paddingBottom: '8px'
  },
  backgroundName: {
    '&:nth-child(odd)': {
      background: 'rgb(244,249,253)'
    }
  }
}));

const ExpansionChild = props => {
  const classes = useStyles();
  const {
    correctPassengers,
    passengersCount,
    route,
    selectedDateSendSms,
    totalPassengers,
    routeDate,
    routeMonth,
    routeTime,
    routeIdTemplate
  } = props;

  return (
    <div>
      <Expansion TransitionProps={{ unmountOnExit: true }}>
        <ExpansionHeader expandIcon={<ExpandMoreIcon />}>
          <Grid
            item
            xs={3}
          >{`${citiesName[route.fromCityId]} - ${
              citiesName[route.toCityId]
            }`}</Grid>
          <Grid
            className={classes.gridCenter}
            item
            xs={3}
          >
            {routeDate +
              '.' +
              routeMonth +
              ' ' +
              `0${routeTime.getHours()}`.slice(-2) +
              ':' +
              `0${routeTime.getMinutes()}`.slice(-2)}
          </Grid>
          <Grid
            className={classes.gridCenter}
            item
            xs={3}
          >
            {passengersCount} / {totalPassengers}
          </Grid>
          <Grid
            className={classes.gridCenter}
            item
            xs={3}
          >
            <Link
              href={`${routeIdTemplate}${route.id}`}
              target="_blank"
            >
              Crmbus
            </Link>
          </Grid>
        </ExpansionHeader>
        <ExpansionBody>
          <Grid container>
            <Grid
              className={classes.borderGrid}
              container
            >
              <Grid
                item
                xs={4}
              >
                <strong>ФИО</strong>
              </Grid>
              <Grid
                className={classes.gridCenter}
                item
                xs={4}
              >
                <strong>Номер</strong>
              </Grid>
              <Grid
                className={classes.gridCenter}
                item
                xs={4}
              >
                <strong>Дата/Время</strong>
              </Grid>
            </Grid>
            {correctPassengers.map((p, k) => {
              const fromCrmbus = selectedDateSendSms.filter(
                sendSms =>
                  sendSms.phone === p.phone || sendSms.phone === p.phone_2
              );
              const sendTimeCrmBus =
                fromCrmbus.length > 0
                  ? `0${new Date(fromCrmbus[0].sendTime).getDate()}`.slice(-2) +
                    '.' +
                    `0${new Date(fromCrmbus[0].sendTime).getMonth() + 1}`.slice(
                      -2
                    ) +
                    ' ' +
                    `0${new Date(fromCrmbus[0].sendTime).getHours()}`.slice(
                      -2
                    ) +
                    ':' +
                    `0${new Date(fromCrmbus[0].sendTime).getMinutes()}`.slice(
                      -2
                    )
                  : '';
              return (
                <Grid
                  className={classes.backgroundName}
                  container
                  key={k}
                >
                  <Grid
                    className={classes.paddingGrid}
                    item
                    xs={4}
                  >
                    {p.surname + ' ' + p.name + ' ' + p.patronymic + ' '}
                  </Grid>
                  <Grid
                    className={classes.gridCenter}
                    container
                    direction="column"
                    item
                    xs={4}
                  >
                    <Grid
                      className={classes.gridCenter}
                      item
                    >
                      {p.phone}
                    </Grid>
                    <Grid
                      className={classes.gridCenter}
                      item
                    >
                      {p.phone_2 ? p.phone_2 : ''}
                    </Grid>
                  </Grid>
                  <Grid
                    className={classes.gridCenter}
                    item
                    xs={4}
                  >
                    {sendTimeCrmBus}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </ExpansionBody>
      </Expansion>
    </div>
  );
};

export default ExpansionChild;
