import styled from '@emotion/styled'
import Slider from '@mui/material/Slider'

import rangeImage from '../Slider/assets/range-image.png'

export const CustomSlider = styled(Slider)`
  z-index: -10;
  .MuiSlider-rail {
    background-color: ${(props) => props.theme.gray};
  }

  .MuiSlider-thumb {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    padding: 0;
    box-shadow: none;
    cursor: pointer;

    &:focus {
      box-shadow: none;
    }

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-image: url(${rangeImage});
      background-size: cover;
      border-radius: 50%;
    }
  }

  &.MuiSlider-disabled.Mui-disabled {
    &.MuiSlider-thumb {
      background-color: orange;
    }

    &.MuiSlider-rail {
      background-color: orange;
    }

    &.MuiSlider-track {
      background-color: orange;
    }
  }
`
