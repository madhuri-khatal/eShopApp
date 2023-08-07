import React from 'react';
import {ScrollView, View} from 'react-native';
import ProductItem from './ProductItem';

const Products = [
  {
    title: 'Pizza',
    description: 'product info',
    img: 'https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg',
    price: 404,
    rating: 3,
  },
  {
    title: 'Momos',
    description: 'product info',
    img: 'https://1.bp.blogspot.com/-hCGGuFvXTLE/XigrScfUq5I/AAAAAAAAAwA/pBoBiGByyYgCLqJgI_gIJO_5SuGt7jJ1wCEwYBhgL/s1600/momos-chutney-recipe-in-hindi.jpg',
    price: 80,
    rating: 1,
  },
  {
    title: 'Sandwich',
    description: 'product info',
    img: 'https://insanelygoodrecipes.com/wp-content/uploads/2021/03/Homemade-Grilled-Cheese-Sandwich-with-Tomatoes-500x375.png',
    price: 40,
    rating: 5,
  },
  {
    title: 'Sandwich',
    description: 'product info',
    img: 'https://insanelygoodrecipes.com/wp-content/uploads/2021/03/Homemade-Grilled-Cheese-Sandwich-with-Tomatoes-500x375.png',
    price: 40,
    rating: 5,
  },
  {
    title: 'Pizza',
    description: 'product info',
    img: 'https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg',
    price: 404,
    rating: 3,
  },
  {
    title: 'Momos',
    description: 'product info',
    img: 'https://1.bp.blogspot.com/-hCGGuFvXTLE/XigrScfUq5I/AAAAAAAAAwA/pBoBiGByyYgCLqJgI_gIJO_5SuGt7jJ1wCEwYBhgL/s1600/momos-chutney-recipe-in-hindi.jpg',
    price: 80,
    rating: 1,
  },
];
export default function ProductList() {
  const rows = [];
  let rowIndex = 0;

  while (rowIndex < Products.length) {
    const rowProducts = Products.slice(rowIndex, rowIndex + 2);

    rows.push(
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
        key={rowIndex}>
        {rowProducts.map(product => (
          <ProductItem
            key={product.title}
            title={product.title}
            description={product.description}
            img={product.img}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </View>,
    );

    rowIndex += 2;
  }

  return (
    <ScrollView>
      <View style={{flex: 1, padding: 16, backgroundColor: '#F7F7F7'}}>
        {rows}
      </View>
    </ScrollView>
  );
}
