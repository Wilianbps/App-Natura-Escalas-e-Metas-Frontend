import styled from '@emotion/styled'
import { DatePicker } from '@mui/x-date-pickers/'

export const StyledDatePicker = styled(DatePicker)`
  input {
    font-size: 13px;
    font-weight: 600;

    ::placeholder {
      font-size: 13px;
    }
  }

  /*  background-color: ${(props) => props.theme.yellowMedium};
  width: 9.375rem;
  border-radius: 0.3rem;

  input {
    font-size: 13px;
    height: 7px;
    font-weight: 600;
  }
  .MuiSelect-standard {
    color: red;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #ff9e00;
  }
  .MuiOutlinedInput-root {
    border-color: #ff9e00;
    border-radius: 0.625rem;
    border-radius: 5px;
  } */
`
