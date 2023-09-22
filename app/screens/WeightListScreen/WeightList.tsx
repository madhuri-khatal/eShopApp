import React, {useEffect, useState} from 'react';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import WeightItem from './WeightItem';
import {useProductContext} from '../../context/ProductContext';
import {useCartContext} from '../../context/CartContext';
import {ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';

export default function WeightList({options2}: any) {
  const {productById} = useProductContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const options1 = productById?.attributes;
  let resolvedOptions2 = options2;
  if (options1 && options1.length > 0) {
    resolvedOptions2 = options1[0].options;
  }

  const {setVariationWisePrice, variationPrice} = useCartContext();

  useEffect(() => {
    (async () => {
      // setIsLoading(true)
      await setVariationWisePrice(productById?.id);
      setIsLoading(false);
    })();
  }, []);

  const variationWisePriceAndId = variationPrice
    ?.map((item: any) => ({
      price: item?.price,
      id: item?.id,
      regular_price: item?.regular_price,
    }))
    ?.reverse();

  if (isLoading) {
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          // justifyContent: 'center',
          position: 'absolute',

          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <ActivityIndicator
          size="large"
          color="#e95d2a"
          style={{marginTop: '90%'}}
        />
      </View>
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={true}
      style={{flex: 1, flexDirection: 'column'}}>
      <FlatList
        style={{width: '100%'}}
        horizontal
        data={resolvedOptions2}
        renderItem={({item, index}) => (
          <WeightItem
            options2={item}
            id={variationWisePriceAndId[index]?.id}
            price={variationWisePriceAndId[index]?.price}
            regularPrice={variationWisePriceAndId[index]?.regular_price}
            onWeightItemClick={price => {
              setVariationWisePrice(productById?.id);
            }}
          />
        )}
        keyExtractor={(item, index) => String(item.id)}
      />
    </ScrollView>
  );
}
