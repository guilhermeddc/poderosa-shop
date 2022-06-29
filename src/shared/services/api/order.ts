import axios from 'axios';
import {IProductCart} from 'shared/context/cart';
import {IRequestResult} from 'shared/interfaces';

export interface ICreateOrder {
  products: IProductCart[];
  userId: string;
  value: number;
  createdAt?: Date;
}

const createOrder = async (payload: ICreateOrder): Promise<IRequestResult> => {
  try {
    await axios.post('api/orders', payload);

    return {success: true};
  } catch (error: any) {
    throw new Error(`${error.code} ${error.message}`);
  }
};

export interface IOrder {
  id: string;
  products: IProductCart[];
  value: number;
  createdAt: Date;
}

const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
  try {
    const orders = await axios.get(`api/orders/${userId}`);

    return orders.data;
  } catch (error: any) {
    throw new Error(`${error.code} ${error.message}`);
  }
};

export const orderService = {createOrder, getOrdersByUserId};
