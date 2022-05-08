import {ArrowForwardIos} from '@mui/icons-material';
import {Stack} from '@mui/material';
import React from 'react';
import {useBackground, useMediaQuery} from 'shared/hooks';

interface IProps {}

export const RightSide: React.FC<IProps> = ({}) => {
  const {layoutColors, rightClick} = useBackground();
  const {md} = useMediaQuery();

  return (
    <Stack
      width={{md: 80, xs: 40}}
      position="fixed"
      right={0}
      top={0}
      bottom={0}
      justifyContent="center"
      alignItems="center"
      bgcolor={layoutColors.bgRight}>
      {rightClick.active && (
        <Stack
          onClick={() => rightClick.click()}
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
          <ArrowForwardIos
            sx={{color: layoutColors.bgRight}}
            fontSize={md ? 'large' : 'small'}
          />
        </Stack>
      )}
    </Stack>
  );
};
