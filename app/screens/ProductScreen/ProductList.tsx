import React from 'react';
import {Image, ScrollView, View, FlatList} from 'react-native';
import ProductItem from './ProductItem';
import {useProductContext} from './../../context/ProductContext';
import {ActivityIndicator, Text} from 'react-native-paper';

interface props {
  props: any;
}
export default function ProductList(props: any) {
  const {productByCategoryId, isLoading, fetchMoreData, refThreshold} =
    useProductContext();
  return (
    <>
      {productByCategoryId.length === 0 ? (
        <Image
          style={{
            width: 400,
            height: 400,
          }}
          source={{
            uri: 'https://stores.maxfashion.in/VendorpageTheme/Enterprise/EThemeForMax/images/product-not-found.jpg',
          }}
        />
      ) : (
        <FlatList
          nestedScrollEnabled={true}
          alwaysBounceVertical
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 10,
                width: '100%',
                backgroundColor: '#f7f7f7',
              }}
            />
          )}
          data={productByCategoryId}
          onEndReached={async () => {
            console.log('to end reach');
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
