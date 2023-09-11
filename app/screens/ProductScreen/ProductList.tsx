import React from 'react';
import {Image, ScrollView, View, FlatList} from 'react-native';
import ProductItem from './ProductItem';
import {useProductContext} from './../../context/ProductContext';
import {ActivityIndicator, Text} from 'react-native-paper';

export default function ProductList() {
  const {productByCategoryId, isLoading, fetchMoreData, refThreshold} =
    useProductContext();
  return (
    <>
      {productByCategoryId.length === 0 ? (
        <>
          {/* <Image
            style={{
              width: 400,
              height: 400,
            }}
            source={{
              uri: 'https://stores.maxfashion.in/VendorpageTheme/Enterprise/EThemeForMax/images/product-not-found.jpg',
            }}
          /> */}
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
          ListFooterComponent={() => (
            <>{isLoading && <ActivityIndicator size="small" />}</>
          )}
          renderItem={({item}) => <ProductItem product={item} />}
          keyExtractor={(item, i) => i.toString()}
          scrollEnabled
        />
      )}
    </>
  );
}
