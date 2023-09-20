import {CartApi} from '../api/CartApi';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useCartContext} from './CartContext';
import {checkoutObject} from '../screens/UserScreen/CheckoutScreen/checkoutobject';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OrderStackScreen from '../navigators/OrderStackScreen';
import {CustomerObject} from '../screens/UserScreen/CheckoutScreen/CustomerObject';
import {CustomerApi} from '../api/CustomerApi';

interface ICheckoutContext {
  onSubmitCheckout: (formData: any, customer_id?: string) => Promise<void>;
  checkoutControl: any;
  checkoutHandleSubmit: Function;
  onCreateCustomer: (formData: any) => Promise<void>;
  customerData: any;
  onCallToTheCustomerAndCheckout: (formData: any) => void;
}

const CheckoutContext = createContext<ICheckoutContext | null>(null);

type CheckoutContextType = {children: ReactNode};

export const CheckoutContextProvider = ({children}: CheckoutContextType) => {
  const {control: checkoutControl, handleSubmit: checkoutHandleSubmit} =
    useForm();

  const {cartItems, getMyOrderData, deleteCartItem} = useCartContext();
  const [customerData, setCustomerData] = useState<any>();
  const [customerId, setCustomerId] = useState<string | undefined>(); 
  const navigation: any = useNavigation();

  // create customer
  const onCreateCustomer = async (formData: any) => {
    const jsonData = {
      ...formData,
    };
 
    const {result} = await CustomerApi.onCreateCustomerApi(CustomerObject(formData));
    console.log('result?.data?.customer?.id======',result?.data?.customer?.id);

    if (result?.data?.customer?.role === 'customer') {
      setCustomerId(result?.data?.customer?.id); 
      console.log(' customer  DATA========================', result);
    }
    onSubmitCheckout(formData,result?.data?.customer?.id);
    setCustomerData(result);
  };

  const onCallToTheCustomerAndCheckout = (formData: any) => {
    onSubmitCheckout(formData, customerId); 
  };

  // place order
  const onSubmitCheckout = async (formData: any, customerId?: string) => {
    const linItem: any = cartItems?.items?.map((item: any) => ({
      product_id: item?.id,
      quantity: item?.quantity,
    }));
    console.log(' onCheckout =====================', customerId);
      const jsonData = {
      customer_id: customerId, 
      ...formData,
    };

    const {
      result: {data},
    } = await CartApi.onCreateOrderApi(checkoutObject(jsonData, linItem));
    console.log(' ORDER DATA========================', data);
console.log("data===============",data?.customer_id);

    Alert.alert('Order Successfully placed');
    deleteCartItem();
    getMyOrderData();
  };

  const value: ICheckoutContext = {
    onSubmitCheckout,
    checkoutControl,
    checkoutHandleSubmit,
    onCreateCustomer,
    customerData,
    onCallToTheCustomerAndCheckout,
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
