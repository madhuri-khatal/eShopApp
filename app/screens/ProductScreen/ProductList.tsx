import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import ProductItem from './ProductItem';
import {ProductApi} from '../../api/ProductApi';

export default function ProductList() {
  const [products, setProducts] = useState<any>([]); 
  useEffect(() => {
    (async () => {
      const {
        result: {data},
        err,
      } = await ProductApi.getProductList();
      console.log('ddddddddd', err, data);

      if (err) {
      } else {
        setProducts(data); // Store fetched products in state
      }
    })();
  }, []);

  if (products.length > 0) {
    products.forEach((product: any) => {
      console.log('productproductproduct', product.images[0].src);

      const imageSrcs = product.images[0];
      console.log('Image Srcs:', imageSrcs);
      const img = imageSrcs.src;
      console.log('imag========', img);
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
