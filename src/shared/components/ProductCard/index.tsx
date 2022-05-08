import {Paper, Stack, Typography} from '@mui/material';
import Link from 'next/link';
import React, {useRef} from 'react';
import {IProduct} from 'shared/services/api/product';

interface IProps {
  product: IProduct;
}

export const ProductCard: React.FC<IProps> = ({product}) => {
  const stackRef = useRef<HTMLDivElement>(null);

  return (
    <Stack ref={stackRef} width="100%" component={Paper} borderRadius={0}>
      <Link href={`/product/${product.id}`}>
        <Stack
          spacing={4}
          minHeight={400}
          height="100%"
          justifyContent="flex-end"
          p={2}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            backgroundImage: `url(${product.image || '/assets/teste.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            ':hover': {
              opacity: 0.9,
            },
          }}>
          <Stack p={2} bgcolor="#23222a66">
            <Typography variant="h5" align="center" fontSize={20} color="white">
              {product.description}
            </Typography>
          </Stack>
        </Stack>
      </Link>
    </Stack>
  );
};
