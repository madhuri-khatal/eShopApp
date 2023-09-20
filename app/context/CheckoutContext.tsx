import {CartApi} from '../api/CartApi';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useCartContext} from './CartContext';
import {checkoutObject} from '../screens/UserScreen/CheckoutScreen/checkoutObject';
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
  customerId: string | number | undefined;
}

const CheckoutContext = createContext<ICheckoutContext | null>(null);

type CheckoutContextType = {children: ReactNode};

export const CheckoutContextProvider = ({children}: CheckoutContextType) => {
  const {control: checkoutControl, handleSubmit: checkoutHandleSubmit} =
    useForm();

  const {cartItems, getMyOrderData, deleteCartItem} = useCartContext();
  const [customerData, setCustomerData] = useState<any>();
  const [customerId, setCustomerId] = useState<number | string>();
  const navigation: any = useNavigation();

  // create customer
  const onCreateCustomer = async (formData: any) => {
    const jsonData = {
      ...formData,
    };
    const {result} = await CustomerApi.onCreateCustomerApi(
      CustomerObject(formData),
    );
    // console.log('result?.data?.customer?.id======', result?.data?.customer?.id);
    // if (result?.data?.customer?.role === 'customer') {
      // const customerId = result?.data?.customer?.id;
      setCustomerId(result?.data?.customer?.id);
      // onSubmitCheckout(formData, result?.data?.customer?.id);
    // }
    onSubmitCheckout(formData, result?.data?.customer?.id);
    setCustomerData(result);
  };
  

  const onCallToTheCustomerAndCheckout = async(formData: any) => {
    if (customerData?.data?.customer?.role === 'customer') {
     await onSubmitCheckout(formData, customerId);
    } else {
      onCreateCustomer(formData);
      onSubmitCheckout(formData, customerId);
    }
  };

  // place order
  const onSubmitCheckout = async (
    formData: any,
    customerId?: number | string,
  ) => {
    const linItem: any = cartItems?.items?.map((item: any) => ({
      product_id: item?.id,
      quantity: item?.quantity,
    }));
    const jsonData = {
      ...formData,
    };
    const {
      result: {data: responseData},
    } = await CartApi.onCreateOrderApi(
      checkoutObject(jsonData, linItem, {}, customerId),
    );
    const responseCustomerId = responseData?.customer_id;
    responseData.responseCustomerId = responseCustomerId;
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
    customerId,
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
