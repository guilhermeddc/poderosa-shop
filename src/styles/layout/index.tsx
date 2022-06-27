import {useState} from 'react';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {NavLink} from 'shared/components';
import Link from 'next/link';
import {useAuth, useBackground, useCart, useMediaQuery} from 'shared/hooks';
import {LeftSide, Menu, RightSide} from './components';
import {ShoppingCart, AccountCircleRounded} from '@mui/icons-material';
import {useRouter} from 'next/router';

export function Layout({children}: {children: React.ReactNode}) {
  const [menuActive, setMenuActive] = useState(false);

  const router = useRouter();
  const {md} = useMediaQuery();
  const {cartQuantity} = useCart();
  const {user} = useAuth();
  const {layoutColors, activeZoom} = useBackground();

  return (
    <Box sx={{transition: 'all 0.3s ease-in-out'}}>
      <Link href="/">
        <Stack
          component={Paper}
          borderRadius={0}
          elevation={1}
          position="fixed"
          top={0}
          left={0}
          width={md ? 80 : 40}
          height={md ? 80 : 40}
          justifyContent="center"
          alignItems="center"
          zIndex={9}
          bgcolor={menuActive ? 'white' : layoutColors.bgLogo}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            ':hover': {
              opacity: 0.8,
            },
          }}>
          <Typography
            color={menuActive ? '#23222a' : layoutColors.logo}
            variant={md ? 'h4' : 'h5'}>
            AP
          </Typography>
        </Stack>
      </Link>

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        height={md ? 80 : 40}
        flex={1}
        mr={{md: 10, xs: 5}}
        zIndex={10}
        bgcolor={layoutColors.bgRight}
        spacing={4}>
        {md && (
          <>
            <NavLink link="/" text="Coleções" />
            <NavLink link="/shop" text="Loja" />
            <NavLink link="/about" text="Sobre" />
            <NavLink link="/contact" text="Contato" />
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center">
              <IconButton color="success" onClick={() => router.push('/cart')}>
                <Badge badgeContent={cartQuantity} color="secondary">
                  <ShoppingCart sx={{color: layoutColors.navItem}} />
                </Badge>
              </IconButton>
              {user && (
                <IconButton>
                  {user.imageUrl ? (
                    <Avatar src={user.imageUrl} alt={user.name} />
                  ) : (
                    <AccountCircleRounded />
                  )}
                </IconButton>
              )}
            </Stack>
          </>
        )}
      </Stack>

      <LeftSide />

      <Menu menuActive={menuActive} setMenuActive={setMenuActive} />

      <RightSide />

      <Stack
        component={Paper}
        elevation={0}
        borderRadius={0}
        ml={{md: 10, xs: 5}}
        mr={{md: 10, xs: 5}}
        sx={{
          transform: activeZoom ? 'scale(0.99)' : 'scale(1)',
          transition: 'all 0.3s ease-in-out',
        }}
        minHeight={md ? 'calc(100vh - 160px)' : 'calc(100vh - 80px)'}>
        {children}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        height={md ? 80 : 40}
        flex={1}
        bgcolor={layoutColors.bgLeft}
        ml={{md: 10, xs: 5}}
        spacing={4}>
        {md && (
          <>
            <NavLink link="/" text="Contato" />
            <NavLink
              link="https://www.instagram.com/poderosa374/"
              text="Instagram"
            />
            <NavLink
              link="https://www.facebook.com/profile.php?id=100057579422135"
              text="Facebook"
            />
          </>
        )}
      </Stack>
    </Box>
  );
}
