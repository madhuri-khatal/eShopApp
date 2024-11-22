// // import React from 'react';
// // import {Image, ScrollView, View, FlatList} from 'react-native';
// // import {ActivityIndicator, Text} from 'react-native-paper';
// // import ProductItem from '../ProductItem';
// // import { useProductContext } from '../../../context/ProductContext';

// // export default function listOFProducts() {
// //   const {productByCategoryId, isLoading, fetchMoreData, refThreshold} =
// //     useProductContext();
// //   const noMoreProducts = productByCategoryId.length === 0;

// // //   // Determine the data source for the FlatList
// // //   const dataToShow =
// // //     filteredProducts.length > 0 ? filteredProducts : productByCategoryId;

// //   return (
//     // <>
//     //   {productByCategoryId.length === 0 ? (
//     //     <>
//     //       <View
//     //         style={{
//     //           height: '100%',
//     //           justifyContent: 'center',
//     //           alignItems: 'center',
//     //         }}>
//     //         <ActivityIndicator
//     //           size="large"
//     //           color="#e95d2a"
//     //           style={{backgroundColor: 'white'}}
//     //         />
//     //       </View>
//     //     </>
//     //   ) : (
//     //     <FlatList
//     //       nestedScrollEnabled={true}
//     //       alwaysBounceVertical
//     //       numColumns={2}
//     //       ItemSeparatorComponent={() => (
//     //         <View
//     //           style={{
//     //             width: '100%',
//     //             backgroundColor: '#f7f7f7',
//     //           }}
//     //         />
//     //       )}
//     //       data={''} // Use dataToShow as the data source
//     //       onEndReached={async () => {
//     //         await fetchMoreData();
//     //       }}
//     //       ref={refThreshold}
//     //       onEndReachedThreshold={10}
//     //       ListFooterComponent={() =>
//     //         isLoading ? (
//     //           <ActivityIndicator
//     //             size="large"
//     //             color="#e95d2a"
//     //             style={{paddingBottom: 70}}
//     //           />
//     //         ) : (
//     //           noMoreProducts && (
//     //             <View
//     //               style={{
//     //                 height: '50%',
//     //                 justifyContent: 'center',
//     //                 alignItems: 'center',
//     //               }}>
//     //               <Text style={{color: '#b1b1b1'}}>Product end</Text>
//     //             </View>
//     //           )
//     //         )
//     //       }
//     //       renderItem={({item}) => <ProductItem product={item} />}
//     //       keyExtractor={(item, i) => i.toString()}
//     //       scrollEnabled
//     //     />
//     //   )}
//     // </>
// //   );
// // }

import React from 'react';
import {Image, ScrollView, View, FlatList} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import ProductItem from '../ProductItem';
import {useProductContext} from '../../../context/ProductContext';

export default function ListOFProducts() {
  const {productByCategoryId, isLoading, fetchMoreData, refThreshold} =
    useProductContext();
  const Product = [
    'Papiha Earring Hand Made(Bird shape)',
    'Laptop Sleeve Bag',
    'Cowdung Diwali Decor - Rangoli',
    'Flower Pattern Rangoli',
    'Resin Alphabet Initial Letter Keychain',
    'Solar Dried Red Gram',
    'Kamal Hangings Latkans Wall Decor',
    'Kitchen King Masala',
    'Handcraft Laptop Bag',
    'Jeera Powder',
    'Orange Butterfly Print Tote Bag With Pocket',
    // 'Resin Art Pooja Thali',
    'Masala Banana Chips',
    'Pudina Banana Chips',
    'Tomato Banana Chips',
    'Nagli/Ragi Biscuit',
    'Rajgira Ladoo',
    'Shevga/Moringa Powder',
    'Beet Powder',
    'Organic jaggery powder',
    'Kalna flour (कळणं पीठ)',
    'Batti Flour',
    'Moong Dal Chilla/Edani (मुगाची ऐडणी)',
    'Millet Flour',
    'Murmure',
  ];
  const filteredData = productByCategoryId.filter(item =>
    Product.includes(item.name),
  );
 console.log(productByCategoryId,"filteredData");
  return (
    <>
      <Text
        style={{
          color: '#506574',
          fontSize: 20,
          margin: 5,
          backgroundColor: '#fff',
        }}>
        Recommended for You :
      </Text>
      {filteredData.length === 0 ? (
        <>
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator
              size="large"
              color="#e95d2a"
              style={{backgroundColor: 'white'}}
            />
          </View>
        </>
      ) : (
        <FlatList
          nestedScrollEnabled={true}
          alwaysBounceVertical
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: '80%',
                padding: 5,
              }}
            />
          )}
          data={filteredData}
          onEndReached={async () => {
            await fetchMoreData();
          }}
          ref={refThreshold}
          onEndReachedThreshold={10}
          renderItem={({item}) => <ProductItem product={item} />}
          keyExtractor={(item, i) => i.toString()}
          scrollEnabled
        />
      )}
    </>
  );
}
