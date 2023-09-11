import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import CartItem from './CartItem';
import {useProductContext} from '../../../context/ProductContext';
import {useCartContext} from '../../../context/CartContext';

const CartList = () => {
  const {cartItems, getCartList} = useCartContext();

  // const {cartItems, getCartList} = useProductContext();
  useEffect(() => {
    (async () => {
      await getCartList();
    })();
  }, []);

  return (
    <ScrollView>
      {cartItems?.items.map((item: any) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default CartList;
