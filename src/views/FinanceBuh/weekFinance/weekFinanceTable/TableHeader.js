import React from 'react';
import { Grid, Card, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  DirectionsCar,
  AirlineSeatReclineExtra,
  CompareArrows,
  AirlineSeatReclineNormal,
  Payment,
  Money,
  Business,
  Edit,
  AccountBalance,
  AccountBox,
  Poll,
  AssignmentReturned,
  AssignmentTurnedIn
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  borderCard: {
    border: '1px solid #969696'
  },
  gridMarginBot: {
    marginBottom: '4px',
    fontSize: '20px',
    marginLeft: '1px'
  },
  card: {
    background: '#C8C8C8',
    color: 'black',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px'
  }
}));

function TableHeader(props) {
  const { checkState } = props;
  const classes = useStyles();

  return (
    <Grid
      className={classes.gridMarginBot}
      container
      direction="row"
      item
      spacing={1}
      wrap="nowrap"
      xs="auto"
    >
      {(checkState.checkedAll || checkState.checkedCar) && (
        <Grid
          className={classes.borderCard}
          item
          xs={1}
        >
          {' '}
          <Card className={classes.card}>
            <Tooltip title="Авт, г/н">
              <DirectionsCar />
            </Tooltip>
          </Card>
        </Grid>
      )}
      {(checkState.checkedAll || checkState.checkedOwner) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Владелец">
            <AccountBox />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedDriver) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Водитель">
            <AirlineSeatReclineExtra />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedDirection) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Направление">
            <CompareArrows />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedPassengers) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Пассажиров">
            <AirlineSeatReclineNormal />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedCard) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Картой">
            <Payment />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedCash) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Наличные">
            <Money />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedOffice) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Офис">
            <Business />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedCorrection) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Корректировка">
            <Edit />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedSum) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Всего">
            <Poll />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedAccrued) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Начислено">
            <AssignmentTurnedIn />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedPayment) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Выдача">
            <AssignmentReturned />
          </Tooltip>
        </Card>
      </Grid>)}
      {(checkState.checkedAll || checkState.checkedProfit) && (<Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card}>
          <Tooltip title="Фирма">
            <AccountBalance />
          </Tooltip>
        </Card>
      </Grid>)}
      <Grid
        className={classes.borderCard}
        item
        xs={1}
      >
        <Card className={classes.card} />
      </Grid>
    </Grid>
  );
}

export default TableHeader;
