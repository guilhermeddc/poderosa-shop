import {Stack, Typography} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {IProduct} from 'shared/services/api/product';

interface IProps {
  product: IProduct;
}

export const ProductCard: React.FC<IProps> = ({product}) => {
  return (
    <Link href={`/product/${product.id}`}>
      <Stack
        spacing={5}
        mb={5}
        sx={{
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          ':hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            opacity: 0.9,
          },
        }}>
        <Image
          src="/assets/teste.jpeg"
          alt={product.description}
          objectFit="cover"
          width="100%"
          height={500}
        />

        <Typography variant="subtitle1" align="center">
          {product.description}
        </Typography>
      </Stack>
    </Link>
  );
};
