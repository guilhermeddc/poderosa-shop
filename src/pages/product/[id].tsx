import {Button, MenuItem, Stack, TextField, Typography} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {NextPage} from 'next/types';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useBackground, useMediaQuery} from 'shared/hooks';
import {Head} from 'shared/infra/components/Head';
import {productService} from 'shared/services/api/product';
import {moneyMask} from 'shared/utils/masks';

const Product: NextPage = () => {
  const [countImages, setCountImages] = useState({total: 0, current: 0});

  const {setLayoutColors, setActiveZoom, setLeftClick, setRightClick} =
    useBackground();
  const {md} = useMediaQuery();
  const router = useRouter();

  useEffect(() => {
    setLayoutColors({
      navItem: 'white',
      bgLogo: 'white',
      logo: '#23222a',
      bgLeft: '#23222a',
      bgRight: '#23222a',
    });
    setActiveZoom(true);
  }, []);

  const {data} = useQuery(
    ['product', {id: router.query.id}],
    () => productService.getProduct(String(router.query.id)),
    {
      enabled: router.query.id !== undefined,
      onSuccess: (data) => {
        setCountImages({total: data.images.length - 1, current: 0});
      },
    },
  );

  useEffect(() => {
    setLeftClick(
      (state) =>
        (state = {
          ...state,
          click: () =>
            setCountImages(
              (state) => (state = {...state, current: state.current - 1}),
            ),
        }),
    );
    setRightClick(
      (state) =>
        (state = {
          ...state,
          click: () =>
            setCountImages(
              (state) => (state = {...state, current: state.current + 1}),
            ),
        }),
    );
  }, [countImages]);

  useEffect(() => {
    if (countImages.current === 0) {
      setLeftClick((state) => (state = {...state, active: false}));
      if (countImages.total > 0)
        setRightClick((state) => (state = {...state, active: true}));
      else setRightClick((state) => (state = {...state, active: false}));
    } else {
      setLeftClick((state) => (state = {...state, active: true}));
      if (countImages.current === countImages.total)
        setRightClick((state) => (state = {...state, active: false}));
    }
  }, [countImages]);

  return (
    <>
      <Head title={`${data?.description} - A Poderosa SM`} />

      <Stack
        spacing={4}
        direction={{md: 'row', xs: 'column-reverse'}}
        p={{md: 12, xs: 4}}>
        <Stack flex={2} justifyContent="flex-end" spacing={4}>
          <Typography variant={md ? 'h4' : 'h5'}>
            {data?.description}
          </Typography>

          <Stack spacing={1}>
            <Typography variant="h6">Quantidade: {data?.quantity}</Typography>
            <Typography variant="h6">Tamanhos: {data?.size}</Typography>
            <Typography variant="h6">
              Valor: {moneyMask(data?.saleValue)}
            </Typography>
          </Stack>

          <Stack
            spacing={{md: 4, xs: 2}}
            direction={{md: 'row', xs: 'column'}}
            maxWidth={600}>
            <TextField select fullWidth label="Selecione o tamanho">
              <MenuItem value="">Tamanho</MenuItem>
              {data?.size.split(', ').map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" fullWidth size="large">
              Adicionar ao carrinho
            </Button>
          </Stack>
        </Stack>

        {data?.image && (
          <Image
            src={data.images[countImages.current]}
            width={502.4}
            height={603.2}
            alt={data.description}
            loading="lazy"
            style={{
              borderRadius: '4px',
              paddingBottom: md ? 0 : '16px',
            }}
          />
        )}
      </Stack>
    </>
  );
};

export default Product;
