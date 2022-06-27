import {
  collection,
  setDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import {IProductCart} from 'shared/context/cart';
import {IRequestResult} from 'shared/interfaces';
import {db} from '../firebase';

export interface ICreateOrder {
  products: IProductCart[];
  userId: string;
  value: number;
  createdAt?: Date;
}

export const orderDB = collection(db, 'orders');

const createOrder = async (order: ICreateOrder): Promise<IRequestResult> => {
  try {
    await setDoc(doc(orderDB), {...order, createdAt: new Date()});

    return {success: true};
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

export interface IOrder {
  id: string;
  products: IProductCart[];
  value: number;
}

const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
  try {
    const orders = await getDocs(
      query(
        orderDB,
        where('userId', '==', userId),
        orderBy('createdAt', 'asc'),
        limit(10),
      ),
    );

    return orders.docs.map((data) => {
      return {
        ...data.data(),
        id: data.id,
      };
    }) as IOrder[];
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

export const orderService = {createOrder, getOrdersByUserId};
