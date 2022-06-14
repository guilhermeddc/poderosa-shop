import React, {useEffect} from 'react';

import {Box, Button, Stack, Typography} from '@mui/material';
import {useAuth, useBackground} from 'shared/hooks';
import {Head} from 'shared/infra/components/Head';
import google from 'shared/assets/google.jpeg';
import {Facebook} from '@mui/icons-material';
import Image from 'next/image';
import {Copyright} from 'shared/components';

const Login: React.FC = () => {
  const {signIn} = useAuth();
  const {setLayoutColors, setActiveZoom, setLeftClick, setRightClick} =
    useBackground();

  useEffect(() => {
    setLayoutColors({
      navItem: 'white',
      bgLogo: 'white',
      logo: '#23222a',
      bgLeft: '#23222a',
      bgRight: '#23222a',
    });
    setActiveZoom(true);
    setRightClick(
      (state) =>
        (state = {
          ...state,
          active: false,
        }),
    );
    setLeftClick(
      (state) =>
        (state = {
          ...state,
          active: false,
        }),
    );
  }, []);

  return (
    <>
      <Head title="Login - A Poderosa SM" />

      <Stack
        flex={1}
        paddingY={{md: 8, xs: 4}}
        paddingX={{md: 8, xs: 4}}
        justifyContent="center"
        alignItems="center">
        <Stack spacing={3} mt={5} maxWidth={320}>
          <Typography
            variant="h6"
            align="center"
            fontSize={{md: 28, xs: 24}}
            sx={{mb: 4}}>
            Entre com sua conta
          </Typography>

          <Button
            variant="contained"
            onClick={() => signIn('google')}
            style={{backgroundColor: 'white', color: 'black'}}>
            <Box display="flex" alignItems="center" gap={1}>
              <Image src={google} width={32} height={32} />
              <Typography>Entrar com o Google</Typography>
            </Box>
          </Button>

          <Button
            variant="contained"
            onClick={() => signIn('facebook')}
            style={{backgroundColor: '#5070a8', color: 'black'}}>
            <Box display="flex" alignItems="center" gap={1}>
              <Facebook htmlColor="whitesmoke" sx={{height: 32, width: 32}} />
              <Typography color="whitesmoke">Entrar com o Facebook</Typography>
            </Box>
          </Button>

          <Box sx={{mt: 5, mb: 5}}>
            <Copyright />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
