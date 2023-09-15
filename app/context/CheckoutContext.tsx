import {CartApi} from '../api/CartApi';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useCartContext} from './CartContext';
interface ICheckoutContext {
  onSubmitCheckout: Function;
  checkoutControl: any;
  checkoutHandleSubmit: Function;
}
const CheckoutContext = createContext<ICheckoutContext | null>(null);
type CheckoutContextType = {children: ReactNode};
export const CheckoutContextProvider = ({children}: CheckoutContextType) => {
  // order checkout

  const {control: checkoutControl, handleSubmit: checkoutHandleSubmit} =
    useForm();
  const {cartItems} = useCartContext();
  const onSubmitCheckout = async (formData: any) => {
    const jsonData = {
      billing_country: cartItems?.billing_address?.country,
      ...formData,
    };
    const {
      result
    } = await CartApi.onCreateOrderApi(jsonData);
    console.log(result, 'res for order');
  };

  const value: ICheckoutContext = {
    onSubmitCheckout,
    checkoutControl,
    checkoutHandleSubmit,
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
