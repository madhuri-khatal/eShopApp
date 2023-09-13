import React, {useEffect,useState} from 'react';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import WeightItem from './WeightItem';
import {useProductContext} from '../../context/ProductContext';
import {useCartContext} from '../../context/CartContext';

export default function WeightList({options2}: any) {
  const {productById} = useProductContext();
const [Price,setPrice]=useState<number | null>(null);
  const options1 = productById?.attributes;
  let resolvedOptions2 = options2;
  if (options1 && options1.length > 0) {
    resolvedOptions2 = options1[0].options;
  }

  const {setVariationWisePrice,variationPrice} = useCartContext();
  
  useEffect(() => {
    (async () => {
      await setVariationWisePrice(productById?.id);
    })();
  }, []);
 
  // regular_price

  const variationWisePrice= variationPrice?.map((item: any) => item?.price)?.reverse()
 const variationWiseregularPrice= variationPrice?.map((item: any) => item?.regular_price)?.reverse()

  function onWeightItemClick(price: any) {
    // setPrice(price)
    console.log('Selected Price:', price);
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={true}
      style={{flex: 1, flexDirection: 'column'}}>
      {/* <FlatList
        horizontal
        data={resolvedOptions2}
        renderItem={({item, index}) => (
          <WeightItem options2={item} id={variationPrice[index]} />
        )}
        keyExtractor={(item, index) => String(item.id)}
      /> */}
      <FlatList
  horizontal
  data={resolvedOptions2}
  renderItem={({ item, index }) => (
    <WeightItem
      options2={item}
      id={variationWisePrice[index] }
      price={variationWisePrice[index]}
      regularPrice={variationWiseregularPrice[index]}
      onWeightItemClick={(price) => {
        setVariationWisePrice(productById?.id); // You may need to update this function as needed
        onWeightItemClick(price); // Call the parent function to update the selected price
      }}
    />
  )}
  keyExtractor={(item, index) => String(item.id)}
/>
    </ScrollView>
  );
}
