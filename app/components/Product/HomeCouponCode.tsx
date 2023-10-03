// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {Text} from 'react-native-paper';
// import {useProductContext} from '../../context/ProductContext';
// import CouponBanner from './CouponBanner';
// import CouponList from './CouponList';
// const CouponCode = () => {
//   const {couponData} = useProductContext();
//   const couponCodes = couponData.map(coupon => coupon.code);

//   return (
//     // <View
//     //   style={{
//     //     backgroundColor: '#fce8e7',
//     //     // borderTopLeftRadius: 60,
//     //     // borderBottomRightRadius: 60,
//     //     borderRadius: 60,
//     //     marginVertical: 30,
//     //   }}>
//     //   <View
//     //     style={{
//     //       padding: 15,
//     //       borderRadius: 8,
//     //     }}>
//     //     <Text
//     //       style={{
//     //         textAlign: 'center',
//     //         fontSize: 16,
//     //       }}>
//     //       Super discount for your purchase
//     //     </Text>
//     //   </View>
//     //   <View>
//     //     <Text
//     //       style={{
//     //         textAlign: 'center',
//     //         fontSize: 22,
//     //         fontWeight: 'bold',
//     //       }}>
//     //       {couponCodes[3]}
//     //     </Text>
//     //   </View>
//     //   <View
//     //     style={{
//     //       padding: 20,
//     //     }}>
//     //     <Text
//     //       style={{
//     //         textAlign: 'center',
//     //         fontSize: 16,
//     //       }}>
//     //       Use discount code in checkout!
//     //     </Text>
//     //   </View>
//     // </View>
//     <>
//       <CouponBanner coupon={{
//         title: '',
//         description: ''
//       }} />
//         {/* coupon={coupons[0]} /> */}
//       <CouponList />
//       {/* coupons={coupons} /> */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     elevation: 2,
//   },
//   input: {
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: '#F57C00',
//     paddingVertical: 8,
//   },
//   buttonLabel: {
//     color: 'white',
//   },
// });

// export default CouponCode;


import { View, Text, ScrollView } from 'react-native'
import React from 'react'

export default function HomeCouponCode({item}:any) {
console.log("item=============",item)

  
  return (
    <ScrollView>
    {/* <View style={{flexDirection:'row',padding:2}}> */}
     <View style={{width:'100%',flexDirection:'row',padding:6}}> 
     <View style={{width:'70%',backgroundColor:'red'}}> 
     <Text style={{fontWeight:'bold',fontSize:20}}>{item?.code}</Text>
     </View>
     <View style={{width:'30%'}}> 
     <Text  style={{fontWeight:'normal',fontSize:18}}>{item?.amount} % OFF</Text>
     </View>
     </View>
         {/* </View> */}
         </ScrollView>
  )
}