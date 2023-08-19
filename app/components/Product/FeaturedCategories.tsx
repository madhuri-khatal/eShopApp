import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      title: 'Category 1',
      image: require('../../../assets/images/book-keeping.png'),
    },
    {
      id: 2,
      title: 'Category 2',
      image: require('../../../assets/images/sell-products.png'),
    },
    {
      id: 3,
      title: 'Category 3',
      image: require('../../../assets/images/book-keeping.png'),
    },
    {
      id: 4,
      title: 'Category 4',
      image: require('../../../assets/images/buy-products.png'),
    },
  ];

  return (
    <View style={styles.container}>
      {categories.map(category => (
        <View key={category.id} style={styles.categoryItem}>
          <Image source={category.image} style={styles.categoryImage} />
          <Text style={styles.categoryTitle}>{category.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FeaturedCategories;
