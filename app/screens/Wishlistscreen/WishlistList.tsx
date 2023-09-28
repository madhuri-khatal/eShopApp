import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {WishlistItem} from './WishlistItem';

const WishlistList = () => {
  //   const {cartItems, getWishlistList} = useCartContext();
  //   useEffect(() => {
  //     (async () => {
  //       await getWishlistList();
  //     })();
  //   }, []);

  return (
    <ScrollView>
      {/* {cartItems?.items.map((item: any) => ( */}
      {/* <WishlistItem key={item.id} item={item} /> */}
      {/* ))} */}
      
    </ScrollView>
  );
};

export default WishlistList;
