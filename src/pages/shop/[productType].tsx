import {NextPage} from 'next/types';
import {useRouter} from 'next/router';
import {Head} from 'shared/infra/components/Head';
import {productService} from 'shared/services/api/product';
import {useQuery} from 'react-query';
import {Grid} from '@mui/material';
import {ProductCard} from 'shared/components';
import {useBackground} from 'shared/hooks';
import {useEffect} from 'react';

const Shop: NextPage = () => {
  const router = useRouter();
  const {setLayoutColors, setRightClick, setLeftClick} = useBackground();

  useEffect(() => {
    setLayoutColors({
      bgLogo: 'white',
      logo: '#23222a',
      navItem: 'white',
      bgLeft: '#23222a',
      bgRight: '#ad8e9e',
    });
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

  const genre =
    typeof router.query?.productType === 'string'
      ? router.query.productType
      : '';

  const {data} = useQuery(
    ['productsByGenre', genre],
    () =>
      productService.getProductByGenre(
        genre === 'feminino' ? 'Fem' : 'Masc',
        12,
      ),
    {
      enabled: genre.length > 0,
    },
  );

  return (
    <>
      <Head title="Shop - A Poderosa SM" />

      <Grid container p={1} spacing={1}>
        {data?.map((product) => (
          <Grid item md={4} xl={3} xs={12} key={product.id} color="white">
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Shop;
