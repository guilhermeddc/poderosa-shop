import {NextPage} from 'next/types';
import {useRouter} from 'next/router';
import {Head} from 'shared/infra/components/Head';
import {productService} from 'shared/services/api/product';
import {useQuery} from 'react-query';
import {Grid} from '@mui/material';
import {ProductCard} from 'shared/components';

const Shop: NextPage = () => {
  const router = useRouter();

  const {productType} = router.query;

  const genre =
    typeof router.query?.productType === 'string'
      ? router.query.productType
      : '';

  const {isSuccess, data, isLoading, isError} = useQuery(
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

  // eslint-disable-next-line
  console.log('*** data', data);

  return (
    <>
      <Head title="Shop - A Poderosa SM" />

      <Grid container spacing={5}>
        {data?.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Shop;
