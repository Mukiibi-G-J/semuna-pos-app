import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";
import { Action, State, StoreProviderProps } from "../dto";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Store = createContext();

// const getInitialState = async () => {
//   let cartProductsRaw = await AsyncStorage.getItem("cartProducts");
//   return {
//     cart: {
//       cartProducts: JSON.parse(cartProductsRaw ?? "[]"),
//     },
//     getProducts: {
//       products: [],
//     },
//   };
// };
const initialState = {
  isLoading: true,
  cart: {
    cartProducts: [],
  },
  getProducts: {
    products: [],
  },
};

// export const initialState = getInitialState();

function reducer(state, action) {
  switch (action.type) {
    case "SET_INITIAL_STATE": {
      return {
        ...state,
        isLoading: false,
        cart: {
          cartProducts: action.payload,
        },
      };
    }

    case "CART_ADD_PRODUCT": {
      const newProduct = action.payload;
      console.log(newProduct, "new product");
      const existProduct = state.cart?.cartProducts.find(
        (product) => product.id === newProduct.id
      );
      console.log(existProduct, "existproduct");
      const cartProducts = existProduct
        ? state.cart?.cartProducts.map((item) =>
            item.id === existProduct.id ? newProduct : item
          )
        : [...state.cart?.cartProducts, newProduct];

      console.log(cartProducts, "Affer adding");
      AsyncStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartProducts,
        },
      };
    }
    case "CART_REMOVE_ITEM": {
      const cartProducts = state.cart?.cartProducts.filter(
        (item) => item.id !== action.payload[0].id
      );
      AsyncStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      return { ...state, cart: { ...state.cart, cartProducts } };
    }
    case "REMOVE_ALL": {
      AsyncStorage.removeItem("cartProducts");
      return { ...state, cart: { ...state.cart, cartProducts: [] } };
    }

    case "GET_PRODUCTS": {
      return {
        ...state,
        getProducts: {
          ...state.getProducts,
          products: action.payload,
        },
      };
    }
    default:
      return state;
  }
}

// export const StoreProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const value = { state, dispatch };
//   return <Store.Provider value={value}>{children}</Store.Provider>;
// };
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getInitialState = async () => {
      try {
        let cartProductsRaw = await AsyncStorage.getItem("cartProducts");
        let initialCartProducts = JSON.parse(cartProductsRaw) ?? [];
        console.log(initialCartProducts, "initialCartProducts");
        dispatch({ type: "SET_INITIAL_STATE", payload: initialCartProducts });
      } catch (error) {
        console.error("Error loading initial state:", error);
      }
    };

    getInitialState();
  }, []); // Empty dependency array to run effect only once on mount

  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
