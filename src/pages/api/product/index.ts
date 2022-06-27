import type {NextApiRequest, NextApiResponse} from 'next';
import {productService} from 'shared/services/api/product';

export default async function getProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const products = await productService.getProducts(12);

  if (!products) {
    res.status(404).json({error: 'Product not found'});
    return;
  }

  res.status(200).json(products);
}
