import React from "react";
import 'antd/dist/antd.css';
import styled from 'styled-components'
import { DatePicker } from 'antd';
import 'moment/locale/ru';


const {  RangePicker } = DatePicker;

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
`

class RangePickerANTD extends React.Component {
  state = {
    size: 'large',
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
        <StyledRangePicker
            size={size} 
            format="DD-MM-YYYY"
            placeholder={['НАЧАЛО', 'КОНЕЦ']}
        />
      </div>
    );
  }
}
export default RangePickerANTD;