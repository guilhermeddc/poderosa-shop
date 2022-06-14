import type {NextApiRequest, NextApiResponse} from 'next';
import {productService} from 'shared/services/api/product';

export default async function getProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {id} = req.query;

  if (!id) {
    res.status(400).json({error: 'Missing id'});
    return;
  }

  const product = await productService.getProduct(id as string);

  if (!product) {
    res.status(404).json({error: 'Product not found'});
    return;
  }

  res.status(200).json(product);
}
