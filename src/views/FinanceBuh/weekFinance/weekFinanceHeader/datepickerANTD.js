import React, { useState } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { DatePicker } from 'antd';
import 'moment/locale/ru';
import moment from 'moment';
import { makeJSDateObject } from '../../../../helpers/helpers';
import { startOfWeek } from 'date-fns';

const StyledDatePicker = styled(DatePicker)`
  .ant-calendar-picker ant-calendar-picker-large {
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

const DatePickerANTD = (props) => {
  const { startDay, endDay, setStartDay, setEndDay, selectedWeekStart, setSelectedWeekStart, selectedDay, setSelectedDay } = props;
  const currentWeekStart = startOfWeek(makeJSDateObject(new Date()), { weekStartsOn: 1 });
  const handleThisDay = () => {new Date(); setSelectedWeekStart(new Date(), 1)};
  const handleSelectDay= () => new Date();
  const  [size, setSize] = useState('large');
  const handleThisWeek = () => setSelectedWeekStart(currentWeekStart, 1);

  const handleSizeChange = e => {
    setSize(e.target.value);
  };
  const handleDateChange = val => {
    setStartDay(val[0]);
    setEndDay(val[1]);
    return (
      [moment(startDay), moment(endDay)]
    );
  };
  function onChange(date, dateString) {
    if (startOfWeek(makeJSDateObject(new Date(date)), { weekStartsOn: 1 }) !== currentWeekStart) {
      setSelectedWeekStart(startOfWeek(makeJSDateObject(new Date(date)),  { weekStartsOn: 1 }));
    }
    setSelectedDay(makeJSDateObject(new Date(date)));
    console.log(date, dateString);
  }
  return (
    <div>
      <StyledDatePicker
        showToday
        onChange={onChange}
        size={size}
        format="DD-MM-YYYY"
        placeholder={['ДАТА']}
        defaultValue={startDay && [moment(selectedDay), moment(selectedDay)]} 
      />
    </div>
  );
}

export default DatePickerANTD;
