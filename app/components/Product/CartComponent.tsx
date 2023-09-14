// import React, {useState,useEffect} from 'react';
// import {Button} from 'react-native-paper';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { useCartContext } from '../../context/CartContext';
// import { useProductContext } from '../../context/ProductContext';
// export default function CartComponent() {
//   const [isAddedToCart, setIsAddedToCart] = useState(false);

//   const {cartItems,getCartList}=useCartContext();
//   const {productById,productByCategoryId}=useProductContext();
//   // const[first]=productByCategoryId;
//   useEffect(() => {
//     (async () => {
//       await getCartList();
//     })();
//   }, []);
//   const productVariationId = productByCategoryId
//   ?.map((item: any) => ({id: item?.variations}));
//   console.log("cart on productItem==============",productVariationId);
//   const cartId=cartItems?.items.map((item:any)=>({id:item?.id}));
// console.log("cartItem========================",cartId);

//   const toggleCart = () => {
//     setIsAddedToCart(!isAddedToCart);
//   };
//   return (
//     <Button onPress={toggleCart} style={{position: 'absolute', zIndex: 10}}>
//       <MaterialCommunityIcons
//         name={isAddedToCart ? 'cart' : 'cart-outline'}
//         color={isAddedToCart ? 'gray' : 'gray'}
//         size={24}
//       />
//     </Button>
//   );
// }

import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useCartContext} from '../../context/CartContext';
import {useProductContext} from '../../context/ProductContext';

export default function CartComponent() {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const {cartItems, getCartList} = useCartContext();
  const {productByCategoryId} = useProductContext();

  useEffect(() => {
    (async () => {
      await getCartList();
    })();
  }, []);

  const productVariationId = productByCategoryId?.map((item: any) => ({
    id: item?.variations,
  }));

  const cartId = cartItems?.items.map((item: any) => ({id: item?.id}));

   return (
    <>
        <MaterialCommunityIcons
          name={isAddedToCart ? 'cart' : 'cart-outline'}
          color={isAddedToCart ? 'gray' : 'gray'}
          size={24}
        />
     
    </>

   
 
  );
}
