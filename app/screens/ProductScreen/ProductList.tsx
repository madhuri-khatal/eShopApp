import React from 'react';
import {Image, ScrollView, View, FlatList} from 'react-native';
import ProductItem from './ProductItem';
import {useProductContext} from './../../context/ProductContext';
import {ActivityIndicator, Text} from 'react-native-paper';

export default function ProductList() {
  const {productByCategoryId, isLoading, fetchMoreData, refThreshold} =useProductContext();
  const noMoreProducts =productByCategoryId.length === 0;
  return (
    <>
      {productByCategoryId.length === 0 ? (
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
                width: '100%',
                backgroundColor: '#f7f7f7',
              }}
            />
          )}
          data={productByCategoryId}
          onEndReached={async () => {
            await fetchMoreData();
          }}
          ref={refThreshold}
          onEndReachedThreshold={10}
      //     ListFooterComponent={() => (
      //       isLoading ? (
      //         <ActivityIndicator
      //           size="large"
      //           color="#e95d2a"
      //           style={{ paddingBottom: 70 }}
      //         />
      //       ) : (
      //         noMoreProducts && (
      //           <View
      //             style={{
      //               height: "50%",
      //               justifyContent: 'center',
      //               alignItems: 'center',
      //             }}>
      //             <Text style={{ backgroundColor: 'red' }}>Product end</Text>
      //           </View>
      //         )
      //     //   <>
      //     //     {isLoading && (
      //     //       <ActivityIndicator
      //     //         size="large"
      //     //         color="#e95d2a"
      //     //         style={{paddingBottom: 70, }}
      //     //       />
      //     //     )}
      //     //   </>
      //     // )}
          
      // )}
      ListFooterComponent={() => (
        isLoading ? (
          <ActivityIndicator
            size="large"
            color="#e95d2a"
            style={{ paddingBottom: 70 }}
          />
        ) : (
          noMoreProducts && (
            <View
              style={{
                height: "50%",
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color:"#b1b1b1"}}>Product end</Text>
            </View>
          )
        )
      )}
          renderItem={({item}) => <ProductItem product={item} />}
          keyExtractor={(item, i) => i.toString()}
          scrollEnabled
        />
      )}
    </>
  );
}
