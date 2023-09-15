import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import OrderItem from './OrderItem';
import { useCartContext } from '../../context/CartContext';

const OrderList = () => {
  const { myOrderItems, getMyOrderData } = useCartContext();

  useEffect(() => {
    (async () => {
      await getMyOrderData();
    })();
  }, []);

  return (
    <ScrollView>
      {myOrderItems?.map((item: any, key: any) => (
        <OrderItem
          key={item?.id}
          lineItems={item?.line_items}
          orderId={item?.id}
          item={item}
        />
      ))}
    </ScrollView>
  );
};

export default OrderList;
