import {Head} from 'shared/infra/components/Head';
import type {NextPage} from 'next';
import Link from 'next/link';
import {Grid, Stack, Typography} from '@mui/material';
import {useBackground} from 'shared/hooks';
import {useEffect, useRef} from 'react';

const Home: NextPage = () => {
  const {setLayoutColors, setActiveZoom, setLeftClick, setRightClick} =
    useBackground();
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLayoutColors({
      navItem: '#23222a',
      bgLogo: '#23222a',
      logo: 'white',
      bgLeft: 'white',
      bgRight: 'white',
    });
    setActiveZoom(true);
    setRightClick(
      (state) =>
        (state = {
          ...state,
          active: true,
        }),
    );
    setLeftClick(
      (state) =>
        (state = {
          ...state,
          active: true,
        }),
    );
  }, []);

  return (
    <>
      <Head title="Home - A Poderosa SM" />

      <Grid container>
        <Grid item md={6} xs={12} order={1}>
          <Stack
            ref={stackRef}
            flex={1}
            height={stackRef.current?.clientWidth}
            sx={{
              backgroundImage: 'url(/assets/feminina.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Grid>

        <Grid item md={6} xs={12} order={2}>
          <Stack component={Link} href="/shop/feminino">
            <Stack
              flex={1}
              height={stackRef.current?.clientWidth}
              bgcolor="#23222a"
              justifyContent="center"
              alignItems="center"
              sx={{cursor: 'pointer'}}>
              <Typography
                variant="h1"
                letterSpacing={{md: 10, xs: 5}}
                color="white"
                fontSize={{lg: 96, md: 64, sm: 54, xs: 50}}>
                Feminino
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item md={6} xs={12} order={{md: 3, xs: 4}}>
          <Stack component={Link} href="/shop/masculino">
            <Stack
              flex={1}
              height={stackRef.current?.clientWidth}
              bgcolor="#23222a"
              justifyContent="center"
              alignItems="center"
              sx={{cursor: 'pointer'}}>
              <Typography
                variant="h1"
                letterSpacing={{md: 10, xs: 5}}
                color="white"
                fontSize={{lg: 96, md: 64, sm: 54, xs: 40}}>
                Masculino
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item md={6} xs={12} order={{md: 4, xs: 3}}>
          <Stack
            flex={1}
            height={stackRef.current?.clientWidth}
            sx={{
              backgroundImage: 'url(/assets/masculina.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Grid>

        <Grid item md={6} xs={12} order={5}>
          <Stack
            flex={1}
            height={stackRef.current?.clientWidth}
            sx={{
              backgroundImage: 'url(/assets/acessorios.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Grid>

        <Grid item md={6} xs={12} order={6}>
          <Stack component={Link} href="/shop/acessorios">
            <Stack
              flex={1}
              height={stackRef.current?.clientWidth}
              bgcolor="#23222a"
              justifyContent="center"
              alignItems="center"
              sx={{cursor: 'pointer'}}>
              <Typography
                variant="h1"
                letterSpacing={{md: 10, xs: 5}}
                color="white"
                fontSize={{lg: 96, md: 64, sm: 54, xs: 36}}>
                Acessórios
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
