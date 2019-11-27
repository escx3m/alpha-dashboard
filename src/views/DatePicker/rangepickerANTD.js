import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { DatePicker } from 'antd';
import 'moment/locale/ru';
import moment from 'moment';
import { makeJSDateObject } from '../../helpers/helpers';

const { RangePicker } = DatePicker;

const StyledRangePicker = styled(RangePicker)`
  .ant-input-lg {
    height: 50px;
    padding: 12px 11px;
    font-size: 16px;
    border-color: #3f51b5;
    color: black;
    background: white;
  }
  i.anticon.anticon-calendar.ant-calendar-picker-icon {
    color: #3f51b5;
  }
  span.ant-calendar-range-picker-separator {
    color: black;
  }
  .ant-calendar-range-picker-input:placeholder-shown {
    font-size: 18px;
  }
`;

const RangePickerANTD = (props) => {
  const { startDay, endDay, setStartDay, setEndDay } = props;
  const  [size, setSize] = useState('large');

  const handleSizeChange = e => {
    setSize(e.target.value);
  };
  const handleDateChange = val => {
    setStartDay(makeJSDateObject(val[0]));
    setEndDay(makeJSDateObject(val[1]));
    console.log(val[0], val[1])
    return (
      [moment(startDay), moment(endDay)]
    );
  };

  return (
    <div>
      <StyledRangePicker
        size={size}
        format="DD-MM-YYYY"
        placeholder={['НАЧАЛО', 'КОНЕЦ']}
        onChange={handleDateChange}
        defaultValue={startDay && [moment(startDay), moment(endDay)]}
      />
    </div>
  );
}

export default RangePickerANTD;
