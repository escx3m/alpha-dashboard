import React from 'react';
import { Checkbox, Tooltip } from '@material-ui/core';
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
  verticalIcon: {
    verticalAlign: 'middle'
  }
}));

const ChooseBox = props => {
  const { checkState, setCheckState } = props;
  const classes = useStyles();
  const handleChange = name => event => {
    setCheckState({ ...checkState, [name]: event.target.checked });
  };
  return (
    <div>
      <Tooltip title="Авт, г/н">
        <Checkbox
          checked={checkState.checkedCar}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedCar')}
          value="checkedCar"
        />
      </Tooltip>
      <span>
        <DirectionsCar className={classes.verticalIcon} />
      </span>

      <Tooltip title="Владелец">
        <Checkbox
          checked={checkState.checkedOwner}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedOwner')}
          value="checkedOwner"
        />
      </Tooltip>
      <span>
        <AccountBox className={classes.verticalIcon} />
      </span>

      <Tooltip title="Водитель">
        <Checkbox
          checked={checkState.checkedDriver}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedDriver')}
          value="checkedDriver"
        />
      </Tooltip>
      <span>
        <AirlineSeatReclineExtra className={classes.verticalIcon} />
      </span>

      <Tooltip title="Направление">
        <Checkbox
          checked={checkState.checkedDirection}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedDirection')}
          value="checkedDirection"
        />
      </Tooltip>
      <span>
        <CompareArrows className={classes.verticalIcon} />
      </span>

      <Tooltip title="Пассажиров">
        <Checkbox
          checked={checkState.checkedPassengers}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedPassengers')}
          value="checkedPassengers"
        />
      </Tooltip>
      <span>
        <AirlineSeatReclineNormal className={classes.verticalIcon} />
      </span>

      <Tooltip title="Картой">
        <Checkbox
          checked={checkState.checkedCard}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedCard')}
          value="checkedCard"
        />
      </Tooltip>
      <span>
        <Payment className={classes.verticalIcon} />
      </span>

      <Tooltip title="Наличные">
        <Checkbox
          checked={checkState.checkedCash}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedCash')}
          value="checkedCash"
        />
      </Tooltip>
      <span>
        <Money className={classes.verticalIcon} />
      </span>

      <Tooltip title="Офис">
        <Checkbox
          checked={checkState.checkedOffice}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedOffice')}
          value="checkedOffice"
        />
      </Tooltip>
      <span>
        <Business className={classes.verticalIcon} />
      </span>

      <Tooltip title="Корректировка">
        <Checkbox
          checked={checkState.checkedCorrection}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedCorrection')}
          value="checkedCorrection"
        />
      </Tooltip>
      <span>
        <Edit className={classes.verticalIcon} />
      </span>

      <Tooltip title="Всего">
        <Checkbox
          checked={checkState.checkedSum}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedSum')}
          value="checkedSum"
        />
      </Tooltip>
      <span>
        <Poll className={classes.verticalIcon} />
      </span>

      <Tooltip title="Начислено">
        <Checkbox
          checked={checkState.checkedAccrued}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedAccrued')}
          value="checkedAccrued"
        />
      </Tooltip>
      <span>
        <AssignmentTurnedIn className={classes.verticalIcon} />
      </span>

      <Tooltip title="Выдача">
        <Checkbox
          checked={checkState.checkedPayment}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedPayment')}
          value="checkedPayment"
        />
      </Tooltip>
      <span>
        <AssignmentReturned className={classes.verticalIcon} />
      </span>

      <Tooltip title="Фирма">
        <Checkbox
          checked={checkState.checkedProfit}
          color="primary"
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
          onChange={handleChange('checkedProfit')}
          value="checkedProfit"
        />
      </Tooltip>
      <span>
        <AccountBalance className={classes.verticalIcon} />
      </span>

      <span />
      <Checkbox
        checked={checkState.checkedAll}
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
        onChange={handleChange('checkedAll')}
        value="checkedAll"
      />
      <span>Вcе</span>
    </div>
  );
};

export default ChooseBox;
