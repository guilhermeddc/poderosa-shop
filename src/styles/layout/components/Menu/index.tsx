import React, {Dispatch} from 'react';

import {Box, Stack} from '@mui/material';
import {NavLink} from 'shared/components';
import {useBackground, useMediaQuery} from 'shared/hooks';

interface IProps {
  menuActive: boolean;
  setMenuActive: Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: React.FC<IProps> = ({menuActive, setMenuActive}) => {
  const {layoutColors} = useBackground();
  const {md} = useMediaQuery();

  return (
    <>
      <Stack
        position="fixed"
        display={menuActive ? 'block' : 'none'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgcolor="#23222a"
        zIndex={7}
      />

      <Stack
        position="fixed"
        top={40}
        left={40}
        right={40}
        bottom={40}
        display={menuActive ? 'block' : 'none'}
        flex={1}
        zIndex={8}
        p={8}
        spacing={2}
        bgcolor="white"
        justifyContent="center"
        alignItems="center">
        <NavLink link="/" text="Coleções" align="center" color="#23222a" />
        <NavLink link="/shop" text="Loja" align="center" color="#23222a" />
        <NavLink link="/about" text="Sobre" align="center" color="#23222a" />
      </Stack>

      {!md && (
        <Stack
          position="fixed"
          onClick={() => setMenuActive((state) => !state)}
          sx={{cursor: 'pointer'}}
          bottom={0}
          right={0}
          width={md ? 80 : 40}
          height={md ? 80 : 40}
          justifyContent="center"
          zIndex={9}
          alignItems="center"
          bgcolor={layoutColors.bgLogo}>
          <Box
            sx={{
              width: '20px',
              height: '1px',
              backgroundColor: layoutColors.logo,
              m: 0.4,
              transition: '0.3s',
              transform: menuActive
                ? 'rotate(-45deg) translate(-4px, 6px)'
                : 'none',
            }}
          />
          <Box
            sx={{
              width: '20px',
              height: '1px',
              backgroundColor: layoutColors.logo,
              m: 0.4,
              transition: '0.3s',
              opacity: menuActive ? 0 : 1,
            }}
          />
          <Box
            sx={{
              width: '20px',
              height: '1px',
              backgroundColor: layoutColors.logo,
              m: 0.4,
              transition: '0.3s',
              transform: menuActive
                ? 'rotate(45deg) translate(-4.5px, -7px)'
                : 'none',
            }}
          />
        </Stack>
      )}
    </>
  );
};
