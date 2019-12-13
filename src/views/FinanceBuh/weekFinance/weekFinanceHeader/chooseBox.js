import React from 'react';
import { Checkbox, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DirectionsCar,
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
  AssignmentTurnedIn } from '@material-ui/icons';


  const useStyles = makeStyles(theme => ({
    verticalIcon: {
      verticalAlign: 'middle',
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
        checked={checkState.checked1}
        onChange={handleChange('checked1')}
        value="checked1"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><DirectionsCar className={classes.verticalIcon}/></span>

      <Tooltip title="Владелец">
      <Checkbox
        checked={checkState.checked2}
        onChange={handleChange('checked2')}
        value="checked2"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><AccountBox className={classes.verticalIcon}/></span> 

      <Tooltip title="Водитель">
      <Checkbox
        checked={checkState.checked3}
        onChange={handleChange('checked3')}
        value="checked3"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><AirlineSeatReclineExtra className={classes.verticalIcon}/></span>

      <Tooltip title="Направление">
      <Checkbox
        checked={checkState.checked4}
        onChange={handleChange('checked4')}
        value="checked4"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><CompareArrows className={classes.verticalIcon}/></span>
      
      <Tooltip title="Пассажиров">
      <Checkbox
        checked={checkState.checked5}
        onChange={handleChange('checked5')}
        value="checked5"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><AirlineSeatReclineNormal className={classes.verticalIcon}/></span>

      <Tooltip title="Картой">
      <Checkbox
        checked={checkState.checked6}
        onChange={handleChange('checked6')}
        value="checked6"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><Payment className={classes.verticalIcon}/></span>

      <Tooltip title="Наличные">
      <Checkbox
        checked={checkState.checked7}
        onChange={handleChange('checked7')}
        value="checked7"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><Money className={classes.verticalIcon}/></span>

      <Tooltip title="Офис">
      <Checkbox
        checked={checkState.checked8}
        onChange={handleChange('checked8')}
        value="checked8"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><Business className={classes.verticalIcon}/></span>

      <Tooltip title="Корректировка">
      <Checkbox
        checked={checkState.checked9}
        onChange={handleChange('checked9')}
        value="checked9"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><Edit className={classes.verticalIcon}/></span>
      
      <Tooltip title="Всего">
      <Checkbox
        checked={checkState.checked10}
        onChange={handleChange('checked10')}
        value="checked10"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><Poll className={classes.verticalIcon}/></span>

      <Tooltip title="Начислено">
      <Checkbox
        checked={checkState.checked11}
        onChange={handleChange('checked11')}
        value="checked11"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><AssignmentTurnedIn className={classes.verticalIcon}/></span>

      <Tooltip title="Выдача">
      <Checkbox
        checked={checkState.checked12}
        onChange={handleChange('checked12')}
        value="checked12"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><AssignmentReturned className={classes.verticalIcon}/></span>

      <Tooltip title="Фирма">
      <Checkbox
        checked={checkState.checked13}
        onChange={handleChange('checked13')}
        value="checked13"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      </Tooltip>
      <span><AccountBalance className={classes.verticalIcon}/></span>

      <span></span> 
      <Checkbox
        checked={checkState.checkedAll}
        onChange={handleChange('checkedAll')}
        value="checkedAll"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      <span>Вcе</span>
    </div>
  );
};

export default ChooseBox;
