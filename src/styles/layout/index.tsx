import {Box, Stack, Typography, useMediaQuery, useTheme} from '@mui/material';
import {NavLink} from 'shared/components';
import Link from 'next/link';
import {useBackground} from 'shared/hooks';

export function Layout({children}: {children: React.ReactNode}) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const {layoutColors, activeZoom} = useBackground();

  return (
    <Box
      bgcolor={layoutColors.bgLayout}
      sx={{transition: 'all 0.3s ease-in-out'}}>
      <Link href="/">
        <Stack
          position="fixed"
          top={0}
          left={0}
          width={md ? 80 : 40}
          height={md ? 80 : 40}
          justifyContent="center"
          alignItems="center"
          bgcolor={layoutColors.bgLogo}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              opacity: 0.8,
            },
          }}>
          <Typography color={layoutColors.colorLogo} variant={md ? 'h4' : 'h6'}>
            AP
          </Typography>
        </Stack>
      </Link>

      {!md && (
        <Stack
          position="fixed"
          bottom={0}
          right={0}
          width={md ? 80 : 40}
          height={md ? 80 : 40}
          bgcolor="primary.main"></Stack>
      )}

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        height={md ? 80 : 40}
        flex={1}
        mr={{md: 10, xs: 5}}
        spacing={6}>
        {md && (
          <>
            <NavLink link="/collection" text="Coleções" />
            <NavLink link="/shop" text="Loja" />
            <NavLink link="/about" text="Sobre" />
          </>
        )}
      </Stack>

      <Stack
        ml={activeZoom ? {md: 0, xs: 0} : {md: 10, xs: 5}}
        mr={activeZoom ? {md: 0, xs: 0} : {md: 10, xs: 5}}
        sx={{transition: 'all 0.3s ease-in-out'}}
        minHeight={md ? 'calc(100vh - 160px)' : 'calc(100vh - 80px)'}
        bgcolor="white">
        {children}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        height={md ? 80 : 40}
        flex={1}
        ml={{md: 10, xs: 5}}
        spacing={4}>
        {md && (
          <>
            <NavLink link="/" text="Coleções" />
            <NavLink link="/" text="Loja" />
            <NavLink link="/" text="Sobre" />
          </>
        )}
      </Stack>
    </Box>
  );
}
