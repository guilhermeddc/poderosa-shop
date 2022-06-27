import {Stack, Typography} from '@mui/material';
import {NextPage} from 'next/types';
import {useEffect} from 'react';
import {useBackground} from 'shared/hooks';
import {Head} from 'shared/infra/components/Head';

const About: NextPage = () => {
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
      <Head title="Sobre - A Poderosa SM" />

      <Stack
        flex={1}
        paddingY={{md: 8, xs: 4}}
        paddingX={{md: 8, xs: 4}}
        direction={{md: 'row', sm: 'column', xs: 'column'}}
        justifyContent="center"
        spacing={{md: 10, sm: 4}}>
        <Stack flex={{md: 2, xs: 1}} spacing={{md: 4, xs: 2}}>
          <Typography variant="h4" fontSize={{md: 56, xs: 24}}>
            HISTÓRIA, MISSÃO E VISÃO
          </Typography>

          <Typography
            variant="body1"
            fontSize={{md: 28, xs: 18}}
            fontWeight={500}>
            A Poderosa Moda Feminina & Plus Size é uma empresa santa-mariense
            com destaque no mercado da moda, fundada em 30 de março de 2019,
            trazendo em seu portfólio as diversas tendências da moda atual. O
            comprometimento da Poderosa é proporcionar as suas clientes um
            ambiente agradável e satisfazer as necessidades para todos os
            padrões de beleza.
          </Typography>

          <Typography
            variant="body1"
            fontSize={{md: 28, xs: 18}}
            fontWeight={500}>
            Ser uma referência no ramo varejista e atacado, proporcionando a
            suas clientes qualidade e preço acessível.
          </Typography>
        </Stack>

        <Stack flex={1} spacing={{md: 4, xs: 2}} pt={{md: 0, xs: 4}}>
          <Typography variant="h4" fontSize={{md: 56, xs: 24}}>
            VALORES
          </Typography>

          <Typography
            variant="body1"
            fontSize={{md: 28, xs: 18}}
            fontWeight={500}>
            - Ética
          </Typography>
          <Typography
            variant="body1"
            fontSize={{md: 28, xs: 18}}
            fontWeight={500}>
            - Compromisso com o cliente
          </Typography>
          <Typography
            variant="body1"
            fontSize={{md: 28, xs: 18}}
            fontWeight={500}>
            - Qualidade
          </Typography>
          <Typography
            variant="body1"
            fontSize={{md: 28, xs: 18}}
            fontWeight={500}>
            - Modernidade
          </Typography>
          <Typography
            variant="body1"
            fontSize={{md: 28, xs: 18}}
            fontWeight={500}>
            - Satisfação
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default About;
