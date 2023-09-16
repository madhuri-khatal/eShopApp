import {CartApi} from '../api/CartApi';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useCartContext} from './CartContext';

import { checkoutObject } from '../screens/UserScreen/CheckoutScreen/checkoutObject';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderStackScreen from '../navigators/OrderStackScreen';
interface ICheckoutContext {
  onSubmitCheckout: Function;
  checkoutControl: any;
  checkoutHandleSubmit: Function;
}
const CheckoutContext = createContext<ICheckoutContext | null>(null);
type CheckoutContextType = {children: ReactNode};

export const CheckoutContextProvider = ({children}: CheckoutContextType) => {


  const {control: checkoutControl, handleSubmit: checkoutHandleSubmit} =
    useForm();
  const {cartItems,getMyOrderData} = useCartContext();
const navigation:any=useNavigation();

  const onSubmitCheckout = async (formData: any) => {
    const linItem: any = cartItems?.items?.map((item: any) => ({
      product_id: item?.id,
      quantity: item?.quantity,
    }));
    const jsonData = {
      ...formData,
    };
    console.log(JSON.stringify(checkoutObject(formData, linItem)));

    const {
      result: {data},
    } = await CartApi.onCreateOrderApi(checkoutObject(formData, linItem));
    Alert.alert("Order Sucessfully placed")
    getMyOrderData();
    // navigation.getParent('main').navigate('OrderScreenStack', {
    //   screen: 'OrderScreen',
    //   initial: false,
    // });
    // console.log(data, 'res for order');
    // linItem.length = 0;
    // console.log(linItem)
    
    
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
