// import React from 'react';
// import {ScrollView, View} from 'react-native';
// import ProductItem from './ProductItem';
// import {useProductContext} from './../../context/ProductContext';

// interface props {
//   props: any;
// }
// export default function ProductList(props: any) {
//   const {productByCategoryId} = useProductContext();

//   return (
//     <>
//       <ScrollView style={{flex: 1}}>
//         <View
//           style={{
//             flex: 1,
//             paddingTop: 20,
//             backgroundColor: '#F7F7F7',
//             height: '100%',
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               width: '100%',
//               height: '100%',
//               flexWrap: 'wrap',
//               padding: 3,
//             }}>
//             {productByCategoryId.map((product: any, i: number) => (
//               <View style={{width: '50%', padding: 3}}>
//                 <ProductItem key={i} product={product} />
//               </View>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </>
//   );
// }





import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import ProductItem from './ProductItem';
import { useProductContext } from './../../context/ProductContext';

export default function ProductList(props: any) {
  const { productByCategoryId, fetchMoreData, hasMoreData } = useProductContext();
  const onEndReachedThreshold = 0.1;

  useEffect(() => {
    if (hasMoreData) {
      fetchMoreData();
    }
  }, [hasMoreData, fetchMoreData]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      onEndReached={fetchMoreData}
      onEndReachedThreshold={onEndReachedThreshold}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          backgroundColor: '#F7F7F7',
          height: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            flexWrap: 'wrap',
            padding: 3,
          }}
        >
          {productByCategoryId.map((product: any, i: number) => (
            <View style={{ width: '50%', padding: 3 }} key={i}>
              <ProductItem product={product} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

