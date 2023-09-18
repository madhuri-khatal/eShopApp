import {CartApi} from '../api/CartApi';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useCartContext} from './CartContext';

import {checkoutObject} from '../screens/UserScreen/CheckoutScreen/checkoutobject';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OrderStackScreen from '../navigators/OrderStackScreen';
import { CustomerObject } from '../screens/UserScreen/CheckoutScreen/CustomerObject';
import { CustomerApi } from '../api/CustomerApi';
interface ICheckoutContext {
  onSubmitCheckout: Function;
  checkoutControl: any;
  checkoutHandleSubmit: Function;
  onCreateCustomer: (formData: any) => Promise<void>
  customerData: any
}
const CheckoutContext = createContext<ICheckoutContext | null>(null);
type CheckoutContextType = {children: ReactNode};

export const CheckoutContextProvider = ({children}: CheckoutContextType) => {
  const {control: checkoutControl, handleSubmit: checkoutHandleSubmit} =
    useForm();
  const {cartItems,getMyOrderData} = useCartContext();
  const [customerData,setCustomerData]=useState<any>()
const navigation:any=useNavigation();

  const onSubmitCheckout = async (formData: any) => {
    const linItem: any = cartItems?.items?.map((item: any) => ({
      product_id: item?.id,
      quantity: item?.quantity,
    }));
    const jsonData = {
      ...formData,
    };
   
    const {
      result: {data},
    } = await CartApi.onCreateOrderApi(checkoutObject(formData, linItem));
   
     Alert.alert("Order Sucessfully placed")
    getMyOrderData();
    };

// create customer
const onCreateCustomer = async (formData: any) => {
  const jsonData = {
    ...formData,
  };
 
  const {
    result
  } = await CustomerApi.onCreateCustomerApi(CustomerObject(formData));
    setCustomerData(result)
  
  
  };



  const value: ICheckoutContext = {
    onSubmitCheckout,
    checkoutControl,
    checkoutHandleSubmit,
    onCreateCustomer,
    customerData
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
