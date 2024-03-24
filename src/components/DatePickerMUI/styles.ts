import styled from '@emotion/styled'
import { DatePicker } from '@mui/x-date-pickers/'

export const StyledDatePicker = styled(DatePicker)`
  border-radius: 0px;
  input {
    font-size: 13px;
    height: 7px;
  }
  width: 9.375rem;
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #f28344;
    border-radius: 0.625rem;
  }
  .MuiOutlinedInput-root {
    border-radius: 0.625rem;
    border-radius: 5px;
  }
`
