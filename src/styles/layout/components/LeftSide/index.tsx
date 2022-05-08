import {ArrowBackIosNew} from '@mui/icons-material';
import {Stack} from '@mui/material';
import React from 'react';
import {useBackground, useMediaQuery} from 'shared/hooks';

interface IProps {}

export const LeftSide: React.FC<IProps> = ({}) => {
  const {layoutColors, leftClick} = useBackground();
  const {md} = useMediaQuery();

  return (
    <Stack
      width={{md: 80, xs: 40}}
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      justifyContent="center"
      alignItems="center"
      bgcolor={layoutColors.bgLeft}>
      {leftClick.active && (
        <Stack
          onClick={() => leftClick.click()}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              opacity: 0.9,
            },
          }}
          width={{md: 80, xs: 40}}
          justifyContent="center"
          p={{md: 2.5, xs: 1.5}}
          bgcolor="white"
          alignItems="center">
          <ArrowBackIosNew
            sx={{color: layoutColors.bgLeft}}
            fontSize={md ? 'large' : 'small'}
          />
        </Stack>
      )}
    </Stack>
  );
};
