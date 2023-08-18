import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import ProductItem from './ProductItem';
import {ProductApi} from '../../api/ProductApi';
import {useProductContext} from './../../context/ProductContext';
import { HeaderBar } from '../../components/ui/HeaderBar';
import {DrawerActions, useTheme} from '@react-navigation/native';


interface props{
  props:any;
}
export default function ProductList(props:any) {
  const {productByCategoryId} = useProductContext();

 

  const {navigation} = props;
  const {colors} = useTheme();

  const [products, setProducts] = useState<any>([]);
   useEffect(() => {
    (async () => {
      const {
        result: {data},
        err,
      } = await ProductApi.getProductList();

      if (err) {
      } else {
        setProducts(data); 
      }
    })();
  }, [productByCategoryId]);

  if (products.length > 0) {
    products.forEach((product: any) => {
      const imageSrcs = product.images[0];
      const img = imageSrcs.src;
    });
  }
  

  const rows = [];
  let rowIndex = 0;
  while (rowIndex < products.length) {
    const rowProducts = products.slice(rowIndex, rowIndex + 2);
    rows.push(
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 1,
        }}
        key={rowIndex}>
        {rowProducts.map((product: any) => (
          <ProductItem
            key={products.name}
            name={products.name}
            description={products.description}
            img={products.img}
            price={products.price}
            rating={products.rating}
            product={product}
          />
        ))}
      </View>,
    );
    rowIndex += 2;
  }

  return (
    <>
    {productByCategoryId.length !== 0 ? (
      <><HeaderBar
      title="Product List"
      titleStyle={{ color: colors.onSecondary }}             
      backAction={() => navigation.goBack()}
      right1Action={() =>
        navigation.getParent('main').dispatch(DrawerActions.toggleDrawer())
      }
      icon1="menu"
      />
      <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              padding: 3,
              paddingTop: 20,
              backgroundColor: '#F7F7F7',
            }}>
            {rows}
          </View>
        </ScrollView></>

    ):(
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          padding: 3,
          paddingTop: 20,
          backgroundColor: '#F7F7F7',
        }}>
        {rows}
      </View>
    </ScrollView>
    )}

    </>
  );

}
