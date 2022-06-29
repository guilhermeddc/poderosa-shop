import type {NextApiRequest, NextApiResponse} from 'next';
import {createOrder} from './_methods';

export default async function getProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {body} = req;

    if (!body) {
      res.status(400).json({error: 'Missing body'});
      return;
    }

    const {products, userId, value} = body;

    if (!products || !userId || !value) {
      res.status(400).json({error: 'Missing products, userId or value'});
      return;
    }

    const order = await createOrder({products, userId, value});

    if (!order) {
      res.status(500).json({error: 'Error creating order'});
      return;
    }

    res.status(200).json(order);
  }
}
