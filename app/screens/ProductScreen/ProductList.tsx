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
     
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          backgroundColor: '#F7F7F7',
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            flexWrap: 'wrap',
          }}>
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{flex: 1}}
            style={{flex: 1}}
            numColumns={2}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: '#C8C8C8',
                }}
              />
            )}
            data={productByCategoryId}
            onEndReached={() => {
              console.log('to end reach');
              fetchMoreData();
            }}
            ref={refThreshold}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => (
              <View style={{flex: 1}}>
                {isLoading && <ActivityIndicator size="small" />}
              </View>
            )}
            renderItem={({item}) => (
              <View style={{width: '50%', padding: 3}}>
                <ProductItem product={item} />
              </View>
            )}
            keyExtractor={(item, i) => i.toString()}
          />
        </View>
      </View>
    </>
  );
}
