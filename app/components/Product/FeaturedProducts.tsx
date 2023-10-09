import { useProductContext } from '../../context/ProductContext';
import React,{useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const FeaturedProducts = ({products}: any) => {
  const {getProductByFeatureCategory}:any=useProductContext();
  useEffect(() => {
    (async () => {
      await getProductByFeatureCategory();
    })();
  }, []);
  const renderProductItem = ({item}: any) => (
    <TouchableOpacity style={styles.productContainer}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        // numColumns={2}
        horizontal
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
  },
  productList: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '45%',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
});

export default FeaturedProducts;
