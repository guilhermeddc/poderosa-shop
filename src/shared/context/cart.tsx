import React, {createContext, useCallback, useMemo, useState} from 'react';
import {IProduct} from 'shared/services/api/product';

export interface IAddToCart {
  product: {
    id: string;
    title: string;
    image: string;
  };
  quantity: number;
  value: number;
}

export interface IContextCart {
  products: IAddToCart[];
  cartQuantity: number;
  cartTotalPrice: number;
  addNewProduct(product: IProduct): void;
  addProduct(id: string): void;
  removeProduct(id: string): void;
  deleteProduct(id: string): void;
}

export const CartContext = createContext<IContextCart>({} as IContextCart);

interface IProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<IProps> = ({children}) => {
  const [products, setProducts] = useState<IAddToCart[]>([]);

  const cartQuantity = useMemo(() => {
    let quantity = 0;

    products.map((product) => {
      quantity += product.quantity;
    });

    return quantity;
  }, [products]);

  const cartTotalPrice = useMemo(() => {
    let value = 0;

    products.map((product) => {
      value += product.value * product.quantity;
    });

    return value;
  }, [products]);

  const handleAddNewProduct = useCallback(
    (product: IProduct) => {
      setProducts((state) => [
        ...state,
        {
          product: {
            id: product.id,
            title: product.description,
            image: product.image,
          },
          quantity: 1,
          value: product.saleValue,
        },
      ]);
    },
    [products],
  );

  const handleAddProduct = useCallback(
    (id: string) => {
      setProducts(
        products.map((p) =>
          p.product.id === id ? {...p, quantity: p.quantity + 1} : p,
        ),
      );
    },
    [products],
  );

  const handleRemoveProduct = useCallback(
    (id: string) => {
      setProducts(
        products.map((p) =>
          p.product.id === id ? {...p, quantity: p.quantity - 1} : p,
        ),
      );
    },
    [products],
  );

  const handleDeleteProduct = useCallback(
    (id: string) => {
      setProducts(products.filter((p) => p.product.id !== id));
    },
    [products],
  );

  return (
    <CartContext.Provider
      value={{
        products,
        cartQuantity,
        cartTotalPrice,
        addProduct: handleAddProduct,
        removeProduct: handleRemoveProduct,
        deleteProduct: handleDeleteProduct,
        addNewProduct: handleAddNewProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
};
