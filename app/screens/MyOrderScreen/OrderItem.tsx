import {useCartContext} from '../../context/CartContext';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity,Linking } from 'react-native';
import {Title, Text, Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const OrderItem = ({item,lineItems,key}: any) => {
  const navigation: any = useNavigation();
  const {getOrderDetailById} = useCartContext();
  
  const handleWhatsAppLink = (id: number | string, message: string = "") => {
    const whatsappLink = `https://wa.me/${id}?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappLink);
  };
  const orderDelete = async () => {
    const defaultMessage = `Order ID: ${item?.id} - Hey,ShgeShop I Want To Cancel My Order.`;
    await handleWhatsAppLink('7558566436', defaultMessage);
  };
  
  const handlePress = async () => {
    await getOrderDetailById(item.id);
              navigation.navigate('OrderDetailScreen', {orderId: item.id});
  };

  const originalDateStr = item?.date_created;
const originalDate = new Date(originalDateStr);
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const monthName = monthNames[originalDate.getMonth()];
const formattedDate = `${monthName} ${originalDate.getDate()}, ${originalDate.getFullYear()}`;


  return (
    <> 

    <View >  
    <TouchableOpacity onPress={handlePress}>
           <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{uri: item?.line_items[0]?.image?.src}} style={styles.image} />
          <View style={styles.textContainer}>
            <View style={{flexDirection:'row'}}>
              <Text style={{width:"50%",padding:2}}>Order Id : {item?.id}</Text> 
              <Text>Total Items : {lineItems.length}</Text> 
            </View>
            <View>
                        <Text style={{padding:2}}>Payment Method : {item?.payment_method_title}</Text>
            <Text style={{padding:2}}>Ordered on : {formattedDate}</Text>
            </View>
          </View>
          
        </View>
               <Button onPress={orderDelete } style={{width:"40%",marginTop:-25,marginLeft:"60%"}}>Cancel Order</Button>
          </View>
               </TouchableOpacity>
         </View>
     
    
    </>
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
