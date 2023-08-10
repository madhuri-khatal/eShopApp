import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CartComponent() {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const toggleCart = () => {
    setIsAddedToCart(!isAddedToCart);
  };
  return (
    <Button onPress={toggleCart} style={{position: 'absolute', zIndex: 10}}>
      <MaterialCommunityIcons
        name={isAddedToCart ? 'cart' : 'cart-outline'}
        color={isAddedToCart ? 'gray' : 'gray'}
        size={24}
      />
    </Button>
  );
}
