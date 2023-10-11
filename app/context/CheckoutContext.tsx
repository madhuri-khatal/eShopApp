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
import { useProductContext } from './ProductContext';

interface ICheckoutContext {
  // onSubmitCheckout: (formData: any, customer_id?: string) => Promise<void>;
  checkoutControl: any;
  checkoutHandleSubmit: Function;
  //  onCreateCustomer: (formData: any, selectedMethod: string) => Promise<void>
  // onCreateCustomer: (formData: any, selectedMethod: string, discountedTotalAmount: number | string) => Promise<void>
  customerData: any;
  // onCallToTheCustomerAndCheckout: (formData: any) => void;
  // onCallToTheCustomerAndCheckout: (formData: any, selectedMethod: string
  // ,discountedTotalAmount: number | string
  // ) => Promise<void>
  customerId: string | number | undefined;
  
  // applycoupon_lines: () => void
  checkoutData: any;
  onSubmitCheckout: (
    formData: any,
    customerId?: number | string,
    selectedMethod?: string,
    discountedTotalAmount?: number | string,
    coupon_lines?: any,
  ) => Promise<void>;
  onCreateCustomer: (
    formData: any,
    selectedMethod: string,
    coupon_lines: any,
  ) => Promise<void>;
  onCallToTheCustomerAndCheckout: (
    formData: any,
    selectedMethod: string,
    coupon_lines: any,
    
  ) => Promise<void>;
}

const CheckoutContext = createContext<ICheckoutContext | null>(null);

type CheckoutContextType = {children: ReactNode};

export const CheckoutContextProvider = ({children}: CheckoutContextType) => {
  const {control: checkoutControl, handleSubmit: checkoutHandleSubmit} =
    useForm();
  
  const {
    cartItems,
    getMyOrderData,
    deleteCartItem,
    myOrderItemsByid,
    getMyOrders,
  } = useCartContext();
  const [customerData, setCustomerData] = useState<any>();
  const [customerId, setCustomerId] = useState<number | string>();
  const [checkoutData, setCheckoutData] = useState<any>();
  const navigation: any = useNavigation();

  // create customer
  const onCreateCustomer = async (
    formData: any,
    selectedMethod: string,
    coupon_lines: string,
  ) => {
    const jsonData = {
      ...formData,
    };
    
    const {result} = await CustomerApi.onCreateCustomerApi(
      CustomerObject(formData
        // ,coupon_lines
        ),
    );
        if (result?.data?.customer?.role === 'customer') {
      const customerId = result?.data?.customer?.id;
      setCustomerId(result?.data?.customer?.id);
      // onSubmitCheckout(formData, result?.data?.customer?.id);
    }
    onSubmitCheckout(formData, result?.data?.customer?.id,selectedMethod,coupon_lines)
    // ,discountedTotalAmount);
    setCustomerData(result);
  };

  const onCallToTheCustomerAndCheckout = async (
    formData: any,
    selectedMethod: string,
    coupon_lines: string,
  ) => {
    // if (customerData?.data?.customer?.role === 'customer') {
    //  await onSubmitCheckout(formData, customerId);
    // } else {
    onCreateCustomer(formData, selectedMethod, coupon_lines);
    // ,discountedTotalAmount);
    //   onSubmitCheckout(formData, customerId);
    // }
  };

  // place order
  const onSubmitCheckout = async (
    formData: any,
    customerId?: number | string,
    selectedMethod?: string,
    coupon_lines?: any,
  ) => {
    const linItem: any = cartItems?.items?.map((item: any) => ({
      product_id: item?.id,
      quantity: item?.quantity,
    }));
   
    const shippingRate: any = cartItems?.totals?.total_shipping / 100;
    const shippinglines: any = [
      {
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: shippingRate.toFixed(2),
      },
    ];

    const jsonData = {
      ...formData,
    };
       const {
      result: {data: responseData},
    } = await CartApi.onCreateOrderApi(
      checkoutObject(
        jsonData,
        linItem,
        shippinglines,
        customerId,
        selectedMethod,
        coupon_lines,
      ),
      // ,discountedTotalAmount),
    );
   
    setCheckoutData(responseData);
    console.log(responseData, 'responseDataresponseData');

    const responseCustomerId = responseData?.customer_id;
    responseData.responseCustomerId = responseCustomerId;
    Alert.alert('Order Successfully placed');

    getMyOrders(responseCustomerId);
  };

  const value: ICheckoutContext = {
    onSubmitCheckout,
    checkoutControl,
    checkoutHandleSubmit,
    onCreateCustomer,
    customerData,
    onCallToTheCustomerAndCheckout,
    customerId,
    checkoutData,
    // applycoupon_lines
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
