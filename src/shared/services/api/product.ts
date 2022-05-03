import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import {db} from 'shared/services/firebase';

export const productDB = collection(db, 'products');
export const productTypeDB = collection(db, 'productTypes');

export interface IProduct {
  id: string;
  code: string;
  image: string;
  description: string;
  quantity: number;
  saleValue: number;
  size: string;
  sold: boolean;
}

const getProducts = async (quantity: number): Promise<IProduct[]> => {
  try {
    const products = await getDocs(
      query(
        productDB,
        where('sold', '==', false),
        orderBy('createdAt', 'asc'),
        limit(quantity),
      ),
    );

    return products.docs.map((data) => {
      return {
        ...data.data(),
        id: data.id,
      };
    }) as IProduct[];
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

const getProductByGenre = async (
  genre: 'Fem' | 'Masc',
  quantity: number,
): Promise<IProduct[]> => {
  try {
    const products = await getDocs(
      query(
        productDB,
        where('genre', '==', genre),
        where('sold', '==', false),
        orderBy('createdAt', 'asc'),
        limit(quantity),
      ),
    );

    return products.docs.map((data) => {
      return {
        ...data.data(),
        id: data.id,
      };
    }) as IProduct[];
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

export interface IProductType {
  id: string;
  name: string;
  type: string;
}

const getProductTypes = async (type: string): Promise<IProductType[]> => {
  try {
    const products = await getDocs(
      query(
        productTypeDB,
        where(
          'type',
          type === 'accessories' ? '==' : 'in',
          type === 'accessories' ? type : [type, 'unisex'],
        ),
        orderBy('name', 'asc'),
      ),
    );

    return products.docs.map((data) => {
      return {
        ...data.data(),
        id: data.id,
      };
    }) as IProductType[];
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

const getProduct = async (id: string): Promise<IProduct> => {
  try {
    const product = await getDoc(doc(productDB, id));

    if (!product.exists) {
      throw new Error('Product not found');
    }

    const aux = await getDocs(
      query(productDB, where('code', '==', product.data()?.code)),
    );

    const size: Set<string> = new Set([]);
    const quantityToSize: Set<Map<number, string>> = new Set();

    const productDetail = aux.docs.map((data) => {
      size.add(data.data().size);
      quantityToSize.add(new Map([[data.data().quantity, data.data().size]]));
      return {
        ...data.data(),
        id: data.id,
      };
    }) as IProduct[];

    // eslint-disable-next-line
    console.log('*** quantityToSize', quantityToSize);

    return {
      ...product.data(),
      id: product.id,
      size: Array.from(size).join(', '),
      quantity: productDetail.length,
    } as IProduct;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

export const productService = {
  getProduct,
  getProducts,
  getProductTypes,
  getProductByGenre,
};
