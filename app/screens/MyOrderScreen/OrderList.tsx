import React from 'react';
import {View, ScrollView} from 'react-native';
import OrderItem from './OrderItem';

const OrderList = ({orderItems, onCartItemRemove}: any) => {
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
