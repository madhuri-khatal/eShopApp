import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import ProductItem from './ProductItem';
import {ProductApi} from '../../api/ProductApi';
import {useProductContext} from './../../context/ProductContext';

export default function ProductList() {
  const {data} = useProductContext();
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const {
        result: {data},
        err,
      } = await ProductApi.getProductList();

      if (err) {
      } else {
        setProducts(data); // Store fetched products in state
      }
    })();
  }, []);

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
          marginBottom: 12,
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
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16, backgroundColor: '#F7F7F7'}}>
        {rows}
      </View>
    </ScrollView>
  );
}
