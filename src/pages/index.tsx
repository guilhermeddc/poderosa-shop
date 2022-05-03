import {Head} from 'shared/infra/components/Head';
import type {NextPage} from 'next';
import Link from 'next/link';
import {Grid, Stack, Typography} from '@mui/material';
import {useBackground} from 'shared/hooks';
import {useEffect} from 'react';

const Home: NextPage = () => {
  const {setLayoutColors, setActiveZoom} = useBackground();

  useEffect(() => {
    setLayoutColors({
      bgLayout: 'white',
      colorNavItem: 'black',
      bgContent: 'white',
      bgLogo: 'black',
      colorLogo: 'white',
    });
    setActiveZoom(true);
  }, []);

  return (
    <>
      <Head title="Home - A Poderosa SM" />

      <Grid container>
        <Grid item md={6} xs={12} order={1}>
          <Stack
            flex={1}
            height={{
              md: 'calc(100vh - 160px)',
              xs: 'calc((80vh - 160px) / 2)',
            }}
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
              height={{
                md: 'calc(100vh - 160px)',
                xs: 'calc((100vh - 160px) / 2)',
              }}
              bgcolor="black"
              justifyContent="center"
              alignItems="center"
              sx={{cursor: 'pointer'}}>
              <Typography
                variant="h1"
                letterSpacing={10}
                color="white"
                fontSize={{lg: 96, md: 64, sm: 54, xs: 48}}>
                Feminino
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item md={6} xs={12} order={{md: 3, xs: 4}}>
          <Stack component={Link} href="/shop/masculino">
            <Stack
              flex={1}
              height={{
                md: 'calc(100vh - 160px)',
                xs: 'calc((100vh - 160px) / 2)',
              }}
              bgcolor="black"
              justifyContent="center"
              alignItems="center"
              sx={{cursor: 'pointer'}}>
              <Typography
                variant="h1"
                letterSpacing={10}
                color="white"
                fontSize={{lg: 96, md: 64, sm: 54, xs: 48}}>
                Masculino
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item md={6} xs={12} order={{md: 4, xs: 3}}>
          <Stack
            flex={1}
            height={{
              md: 'calc(100vh - 160px)',
              xs: 'calc((100vh - 160px) / 2)',
            }}
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
            height={{
              md: 'calc(100vh - 160px)',
              xs: 'calc((100vh - 160px) / 2)',
            }}
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
              height={{
                md: 'calc(100vh - 160px)',
                xs: 'calc((100vh - 160px) / 2)',
              }}
              bgcolor="black"
              justifyContent="center"
              alignItems="center"
              sx={{cursor: 'pointer'}}>
              <Typography
                variant="h1"
                letterSpacing={10}
                color="white"
                fontSize={{lg: 96, md: 64, sm: 54, xs: 48}}>
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
