import styled from '@emotion/styled'
import { DatePicker } from '@mui/x-date-pickers/'

export const StyledDatePicker = styled(DatePicker)`
  width: 280px;
  input {
    font-size: 13px;
    font-weight: 600;
    color: ${(props) => props.theme.orangeDark};

    ::placeholder {
      font-size: 13px;
    }
  }
`
