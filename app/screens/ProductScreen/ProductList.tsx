import React from 'react';
import {Image, ScrollView, View, FlatList} from 'react-native';
import ProductItem from './ProductItem';
import {useProductContext} from './../../context/ProductContext';
import {ActivityIndicator, Text} from 'react-native-paper';

export default function ProductList({filteredProducts}: any) {
  const {productByCategoryId, isLoading, fetchMoreData, refThreshold} =
    useProductContext();
  const noMoreProducts = productByCategoryId.length === 0;

  // Determine the data source for the FlatList
  const dataToShow =
    filteredProducts.length > 0 ? filteredProducts : productByCategoryId;

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
<Text style={{fontSize:29,color:"#506574",marginTop:-90,fontWeight:'bold'}}>Product's Yet Not Available</Text>
            {/* <ActivityIndicator
              size="large"
              color="#e95d2a"
              style={{backgroundColor: 'white'}}
            /> */}
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
          data={dataToShow} // Use dataToShow as the data source
          onEndReached={async () => {
            await fetchMoreData();
          }}
          ref={refThreshold}
          onEndReachedThreshold={10}
          ListFooterComponent={() =>
            isLoading ? (
              <ActivityIndicator
                size="large"
                color="#e95d2a"
                style={{paddingBottom: 70}}
              />
            ) : (
              noMoreProducts && (
                <View
                  style={{
                    height: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#b1b1b1'}}>Product end</Text>
                </View>
              )
            )
          }
          renderItem={({item}) => <ProductItem product={item} />}
          keyExtractor={(item, i) => i.toString()}
          scrollEnabled
        />
      )}
    </>
  );
}
