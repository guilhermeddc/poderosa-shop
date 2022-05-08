import {useContext} from 'react';

import {CartProvider, CartContext, IContextCart} from 'shared/context/cart';

function useCart(): IContextCart {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an TitleProvider');
  }

  return context;
}

export {CartProvider, useCart};
