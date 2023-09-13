import React, {createContext, ReactNode, useContext, useState} from 'react';
import {CartApi} from '../api/CartApi';
import {ToastAndroid} from 'react-native';
import {useProductContext} from './ProductContext';
interface ICheckoutContext {
  onSubmitCheckout: Function;
}
const CheckoutContext = createContext<ICheckoutContext | null>(null);
type CheckoutContextType = {children: ReactNode};
export const CheckoutContextProvider = ({children}: CheckoutContextType) => {
  // order checkout
  const onSubmitCheckout = () => {
    console.log('hello i am checkout');
  };

  const value: ICheckoutContext = {
    onSubmitCheckout,
  };
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (!context)
    throw new Error('Please cart context wrap in to cart context provider!');

  return context;
};
