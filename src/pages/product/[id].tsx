import {Button, MenuItem, Stack, TextField, Typography} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {NextPage} from 'next/types';
import {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useBackground, useCart, useMediaQuery} from 'shared/hooks';
import {Head} from 'shared/infra/components/Head';
import {productService} from 'shared/services/api/product';
import {moneyMask} from 'shared/utils/masks';

const Product: NextPage = () => {
  const [countImages, setCountImages] = useState({total: 0, current: 0});
  const [size, setSize] = useState('');

  const {setLayoutColors, setActiveZoom, setLeftClick, setRightClick} =
    useBackground();
  const {md} = useMediaQuery();
  const router = useRouter();
  const {addNewProduct, addProduct, products} = useCart();

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

  const {data: product} = useQuery(
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

  const handleAddToCart = useCallback(() => {
    if (
      product &&
      products.filter((p) => p.product.id === product.id).length > 0
    ) {
      addProduct(product.id);
    } else if (product) {
      addNewProduct(product, size);
    }
  }, [addNewProduct, addProduct, product?.id, product, products]);

  return (
    <>
      <Head title={`${product?.description} - A Poderosa SM`} />

      <Stack
        spacing={4}
        direction={{md: 'row', xs: 'column-reverse'}}
        p={{md: 12, xs: 4}}>
        <Stack flex={2} justifyContent="flex-end" spacing={4}>
          <Typography variant={md ? 'h4' : 'h5'}>
            {product?.description}
          </Typography>

          <Stack spacing={1}>
            <Typography variant="h6">
              Quantidade: {product?.quantity}
            </Typography>
            <Typography variant="h6">Tamanhos: {product?.size}</Typography>
            <Typography variant="h6">
              Valor: {moneyMask(product?.saleValue)}
            </Typography>
          </Stack>

          <Stack
            spacing={{md: 4, xs: 2}}
            direction={{md: 'row', xs: 'column'}}
            maxWidth={600}>
            <TextField
              select
              fullWidth
              label="Selecione o tamanho"
              value={size}
              onChange={({target}) => setSize(target.value)}>
              <MenuItem value="">Tamanho</MenuItem>
              {product?.size.split(', ').map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              fullWidth
              disabled={!size}
              size="large"
              onClick={handleAddToCart}>
              Adicionar ao carrinho
            </Button>
          </Stack>
        </Stack>

        {product?.image && (
          <Image
            src={product.images[countImages.current]}
            width={502.4}
            height={603.2}
            alt={product.description}
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
