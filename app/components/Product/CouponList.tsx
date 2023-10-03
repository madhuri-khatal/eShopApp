// import {useProductContext} from '../../context/ProductContext';
// import React, {useEffect} from 'react';
// import {View, FlatList, Text, StyleSheet} from 'react-native';

// const CouponList = () => {
//   const {couponData} = useProductContext();
//   const couponCodes = couponData?.map((coupon) => {coupon.code});
// //   [0]?.amount
// //   .map(coupon => coupon.code);
//   console.log(couponCodes);
//   //   useEffect(() => {
//   //     // Log only the coupon codes
//   //     const couponCodes = couponData.map(coupon => coupon.code);
//   //     console.log(couponCodes);
//   //   }, [coupons]);
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={couponData}
//         keyExtractor={}
//         numColumns={2}
//         renderItem={({item}) => (
//           <View style={styles.couponItem}>
//             <Text style={styles.couponTitle}>{couponCodes}</Text>
//             {/* <Text style={styles.couponDescription}>{item.description}</Text> */}
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   couponItem: {
//     backgroundColor: 'white',
//     marginBottom: 16,
//     padding: 16,
//     borderRadius: 8,
//     elevation: 2,
//     flex: 1, // Make each coupon item take half the space horizontally
//     margin: 8, // Add margin between items
//   },
//   couponTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   couponDescription: {
//     fontSize: 16,
//     marginTop: 8,
//   },
// });

// export default CouponList;

// import {View, Text} from 'react-native';
// import React from 'react';
// import {useProductContext} from '../../context/ProductContext';

// export default function CouponList() {
//   const {couponData} = useProductContext();
//   // console.log(couponData[0].code);

//   return (
//     <>
//       {couponData?.map(item => {
//         // console.log(item?.code);

//         <View style={{flex: 1, flexDirection: 'row'}}>
//           <View style={{width: '50%'}}>
//             <Text style={{color: 'red', backgroundColor: 'black'}}>
//               item?.code
//             </Text>
//           </View>
//         </View>;
//       })}
//     </>
//   );
// }

import {View, Text} from 'react-native';
import React from 'react';
import {useProductContext} from '../../context/ProductContext';
import {FlatList} from 'react-native-gesture-handler';

export default function CouponList() {
  const {couponData} = useProductContext();
  console.log(couponData);
  const getRandomColor = () => {
    const colors = [
      '#e3174b',
      '#e83838',
      '#a19999',
      '#1f251e',
      '#6f30cf',
      '#467712',
      '#000080',
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  return (
    <View
      style={{
        borderRadius: 10,
        marginVertical: 16,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
      }}>
      <FlatList
        data={couponData}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={2}
        renderItem={({item}: any) => (
          <View
            style={{
              // borderRadius: 20,
              marginBottom: 5,
              width: '50%',
              padding: 8,
              marginRight: 4,
              backgroundColor: getRandomColor(),
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: '#ffffff',
                textAlign: 'center',
                margin: 5,
              }}>
              {item.code}
            </Text>
            <Text style={{fontSize: 16, color: 'black'}}>
              {item.description}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
