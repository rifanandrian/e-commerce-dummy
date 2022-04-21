import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
  historyOrder: Cookies.get('historyOrder')
    ? JSON.parse(Cookies.get('historyOrder'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) =>
          item.id === newItem.id &&
          item.product_size === newItem.product_size &&
          item.product_color === newItem.product_color
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.id === newItem.id &&
            item.product_size === newItem.product_size &&
            item.product_color === newItem.product_color
              ? newItem
              : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM':
      const cartItems = state.cart.cartItems.filter(
        (item) =>
          item.product_size !== action.payload.product_size &&
          item.product_color !== action.payload.product_color
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return { ...state, userInfo: null };
    case 'HISTORY_ADD_ITEM':
      Cookies.set('historyOrder', JSON.stringify(action.payload));
      return { ...state, historyOrder: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
