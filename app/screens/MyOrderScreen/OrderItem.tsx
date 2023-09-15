import {useCartContext} from '../../context/CartContext';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Title, Text} from 'react-native-paper';

const OrderItem = ({item,lineItems,key}: any) => {
  const navigation: any = useNavigation();
  const {getOrderDetailById} = useCartContext();
  

  const handlePress = async () => {
    await getOrderDetailById(item.id);
              navigation.navigate('OrderDetailScreen', {orderId: item.id});
  };
  return (
    <TouchableOpacity onPress={handlePress}>
           <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{uri: item?.line_items[0]?.image?.src}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={{fontSize: 19}}>{item?.line_items[0]?.name}</Text>
            <Text>Total: ₹{item?.line_items[0]?.subtotal}</Text>
            <Text>Quantity: {item?.line_items[0]?.quantity}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 13,

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
