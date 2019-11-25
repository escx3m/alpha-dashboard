import React from 'react';
import { Checkbox } from '@material-ui/core';

const ChooseSchema = props => {
  const { checkState, setCheckState } = props;

  const handleChange = name => event => {
    setCheckState({ ...checkState, [name]: event.target.checked });
  };
  return (
    <div>
      <Checkbox
        checked={checkState.checked8}
        onChange={handleChange('checked8')}
        value="checked8"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      <span>8</span>
      <Checkbox
        checked={checkState.checked7}
        onChange={handleChange('checked7')}
        value="checked7"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      <span>7</span>
      <Checkbox
        checked={checkState.checked6}
        onChange={handleChange('checked6')}
        value="checked6"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      <span>6</span>
      <Checkbox
        checked={checkState.checked5}
        onChange={handleChange('checked5')}
        value="checked5"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      <span>5</span>
      <Checkbox
        checked={checkState.checked4}
        onChange={handleChange('checked4')}
        value="checked4"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox'
        }}
      />
      <span>4</span>
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

export default ChooseSchema;
