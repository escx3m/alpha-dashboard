import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  cityShortNames as citiesName,
  isPassenger,
  canceledState
} from '../../../helpers/constants';
import {
  Grid,
  ExpansionPanel as Expansion,
  ExpansionPanelSummary as ExpansionHeader,
  ExpansionPanelDetails as ExpansionBody
} from '@material-ui/core';
import ExpansionChild from './expansionChild';

const useStyles = makeStyles(theme => ({
  gridCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const ExpansionParent = props => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const {
    smsTime,
    smsCount,
    currentRoutes,
    routeIdTemplate,
    selectedDateSendSms,
    passengersIdsAtTime,
    i
  } = props;
  return (
    <div>
      <Expansion
        expanded={open}
        onChange={() => setOpen(open ? false : !open)}
        TransitionProps={{ unmountOnExit: true }}>
        <ExpansionHeader expandIcon={<ExpandMoreIcon />}>
          <Grid container>
            <Grid
              container
              direction="row"
              item
              style={{ paddingBottom: 10 }}
              xs={12}
            >
              <Grid
                item
                xs={2}
              >
                <strong>{smsTime}</strong>
              </Grid>
              <Grid
                className={classes.gridCenter}
                item
                xs={2}
              >
                <strong>Отправлено: {smsCount}</strong>
              </Grid>
            </Grid>
            {open === `panel${i}` ? (
              <Grid
                container
                direction="row"
                item
                xs={12}
              >
                <Grid
                  item
                  xs={3}
                >
                  Направление
                </Grid>
                <Grid
                  className={classes.gridCenter}
                  item
                  xs={3}
                >
                  Время рейса
                </Grid>
                <Grid
                  className={classes.gridCenter}
                  item
                  xs={3}
                >
                  СМС/Пассажиры
                </Grid>
                <Grid
                  item
                  xs={3}
                />
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </ExpansionHeader>
        <ExpansionBody>
          <Grid container>
            {currentRoutes.map((route, j) => {
              const routeDate = `0${new Date(route.fromTime).getDate()}`.slice(
                -2
              );
              const routeMonth = `0${new Date(route.fromTime).getMonth() +
                1}`.slice(-2);
              const routeTime = new Date(route.fromTime);
              const totalPassengers = route.passengers.filter(
                passenger =>
                  passenger.state !== canceledState &&
                  passenger.type === isPassenger
              ).length;
              const correctPassengers = route.passengers.filter(
                passenger =>
                  passenger.state !== canceledState &&
                  passengersIdsAtTime.includes(passenger.id) &&
                  passenger.type === isPassenger
              );
              const routePassengers = route.passengers.filter(
                passenger =>
                  passenger.state !== canceledState &&
                  passenger.type === isPassenger
              );
              const passengersCount = correctPassengers.length;
              return passengersCount ? (
                <Grid
                  item
                  key={j}
                  xs={12}
                >
                  <ExpansionChild
                    correctPassengers={correctPassengers}
                    j={j}
                    passengersCount={passengersCount}
                    passengersIdsAtTime={passengersIdsAtTime}
                    route={route}
                    routeDate={routeDate}
                    routeIdTemplate={routeIdTemplate}
                    routeMonth={routeMonth}
                    routeTime={routeTime}
                    selectedDateSendSms={selectedDateSendSms}
                    totalPassengers={totalPassengers}
                  />
                </Grid>
              ) : (
                ''
              );
            })}
          </Grid>
        </ExpansionBody>
      </Expansion>
    </div>
  );
};

export default ExpansionParent;
