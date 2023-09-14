import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import OrderItem from './OrderItem';
import {useCartContext} from '../../context/CartContext';

const OrderList = ({orderItems, onCartItemRemove}: any) => {
  const {myOrderItems, getMyOrderData} = useCartContext();
  useEffect(() => {
    (async () => {
      await getMyOrderData();
    })();
  }, []);
  console.log(
    myOrderItems?.map((item: any) => ({name: item?.line_items[0]?.name})),
    'ORDERITEm-=-=-_dasd+',
  );
  return (
    <ScrollView>
      {orderItems.map((item: any) => (
        <OrderItem
          key={item.id}
          item={item}
          //   onRemove={() => onCartItemRemove(item.id)}
        />
      ))}
    </ScrollView>
  );
};

export default OrderList;
