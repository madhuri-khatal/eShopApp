import {useCartContext} from '../../context/CartContext';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Title, Text} from 'react-native-paper';

const OrderItem = ({item}: any) => {
  const navigation: any = useNavigation();
  const {cartItems, getCartList} = useCartContext();
  useEffect(() => {
    (async () => {
      await getCartList();
    })();
  }, []);

  
  // console.log(cartItems);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetailScreen', {data: item})}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{uri: item.imageSrc}} style={styles.image} />
          <View style={styles.textContainer}>
            <Title>{item.name}</Title>
            <Text>Total: ${item.total}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 13,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
});

export default OrderItem;
