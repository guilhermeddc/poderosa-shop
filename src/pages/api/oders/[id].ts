import type {NextApiRequest, NextApiResponse} from 'next';
import {orderService} from 'shared/services/api/order';

export default async function getProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {id} = req.query;

  if (!id) {
    res.status(400).json({error: 'Missing id'});
    return;
  }

  const orders = await orderService.getOrdersByUserId(id as string);

  if (!orders) {
    res.status(404).json({error: 'Product not found'});
    return;
  }

  res.status(200).json(orders);
}
