import React, {createContext, useCallback, useMemo, useState} from 'react';
import {IProduct} from 'shared/services/api/product';
import Cookie from 'js-cookie';

export interface IProductCart {
  product: {
    id: string;
    title: string;
    image: string;
    size: string;
  };
  quantity: number;
  value: number;
}

export interface IContextCart {
  products: IProductCart[];
  cartQuantity: number;
  cartTotalPrice: number;
  addNewProduct(product: IProduct, size: string): void;
  addProduct(id: string): void;
  removeProduct(id: string): void;
  deleteProduct(id: string): void;
  clearCart(): void;
}

export const CartContext = createContext<IContextCart>({} as IContextCart);

interface IProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<IProps> = ({children}) => {
  const [products, setProducts] = useState<IProductCart[]>(() => {
    const cartProducts = Cookie.get('cartProducts');

    if (cartProducts) {
      return JSON.parse(cartProducts);
    }

    return [];
  });

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

  const handleAddNewProduct = useCallback((product: IProduct, size: string) => {
    setProducts((state) => {
      const aux = [
        ...state,
        {
          product: {
            id: product.id,
            title: product.description,
            image: product.image,
            size,
          },
          quantity: 1,
          value: product.saleValue,
        },
      ];
      Cookie.set('cartProducts', JSON.stringify(aux));
      return aux;
    });
  }, []);

  const handleAddProduct = useCallback((id: string) => {
    setProducts((state) => {
      const aux = state.map((p) =>
        p.product.id === id ? {...p, quantity: p.quantity + 1} : p,
      );
      Cookie.set('cartProducts', JSON.stringify(aux));
      return aux;
    });
  }, []);

  const handleRemoveProduct = useCallback((id: string) => {
    setProducts((state) => {
      const aux = state.map((p) =>
        p.product.id === id ? {...p, quantity: p.quantity - 1} : p,
      );
      Cookie.set('cartProducts', JSON.stringify(aux));
      return aux;
    });
  }, []);

  const handleDeleteProduct = useCallback((id: string) => {
    setProducts((state) => {
      const aux = state.filter((p) => p.product.id !== id);
      Cookie.set('cartProducts', JSON.stringify(aux));
      return aux;
    });
  }, []);

  const handleClearCart = useCallback(() => {
    Cookie.remove('cartProducts');
    setProducts([]);
  }, []);

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
        clearCart: handleClearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
