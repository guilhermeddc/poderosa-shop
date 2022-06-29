import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import {IRequestResult} from 'shared/interfaces';
import {ICreateOrder, IOrder} from 'shared/services/api/order';
import {db} from 'shared/services/firebase';

export const orderDB = collection(db, 'orders');

export const createOrder = async (
  order: ICreateOrder,
): Promise<IRequestResult> => {
  try {
    await setDoc(doc(orderDB), {...order, createdAt: new Date()});

    return {success: true};
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

export const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
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
