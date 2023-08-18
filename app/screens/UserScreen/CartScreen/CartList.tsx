import React from 'react';
import {View, ScrollView} from 'react-native';
import CartItem from './CartItem';



const CartList = ({cartItems, onCartItemRemove}: any) => {
  return (
    <ScrollView>
      {cartItems.map((item: any) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={() => onCartItemRemove(item.id)}
        />
      ))}

    </ScrollView>
  );
};

export default CartList;
