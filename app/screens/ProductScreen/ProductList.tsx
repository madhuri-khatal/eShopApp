import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import ProductItem from './ProductItem';
import {useProductContext} from './../../context/ProductContext';
import {Text} from 'react-native-paper';

interface props {
  props: any;
}
export default function ProductList(props: any) {
  const {productByCategoryId} = useProductContext();
  return (
    <>
      {productByCategoryId.length === 0 ? (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              padding: 15,
                          }}>
            <Image
              style={{
                width: 400,
                height: 400,
                              }}
              source={{
                uri: 'https://stores.maxfashion.in/VendorpageTheme/Enterprise/EThemeForMax/images/product-not-found.jpg',
              }}
            />
          </View>
        </>
      ) : (
        <ScrollView style={{flex: 1}}>
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
              {productByCategoryId.map((product: any, i: number) => (
                <View style={{width: '50%', padding: 3}}>
                  <ProductItem key={i} product={product} />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}
