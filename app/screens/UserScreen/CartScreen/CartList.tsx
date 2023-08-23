import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import CartItem from './CartItem';
import {useProductContext} from '../../../context/ProductContext';

const CartList = () => {
  const {cartItems, getCartList} = useProductContext();
  
  useEffect(() => {
    (async () => {
      await getCartList();
    })();
  }, []);
 
  return (
    <ScrollView>
      {cartItems?.items.map((item: any) => (
        <CartItem
          key={item.id}
          item={item}
               />
      ))}
    </ScrollView>
  );
};


export default CartList;
