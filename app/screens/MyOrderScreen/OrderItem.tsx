import {useCartContext} from '../../context/CartContext';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Title, Text, Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const OrderItem = ({item,lineItems,key}: any) => {
  const navigation: any = useNavigation();
  const {getOrderDetailById,  deleteOrder} = useCartContext();
  console.log("item?.line_items[0]?.payment_method_title",item);
  

  const handlePress = async () => {
    await getOrderDetailById(item.id);
              navigation.navigate('OrderDetailScreen', {orderId: item.id});
  };
  const orderDelete=async()=>{
    await deleteOrder(item.id)
  }

  const originalDateStr = item?.date_created;
const originalDate = new Date(originalDateStr);
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const monthName = monthNames[originalDate.getMonth()];
const formattedDate = `${monthName} ${originalDate.getDate()}, ${originalDate.getFullYear()}`;
console.log(formattedDate); 

  return (
    <> 

    <View >  
    <TouchableOpacity onPress={handlePress}>
           <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{uri: item?.line_items[0]?.image?.src}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text >Order Id : {item?.id}</Text>
            <Text>Payment Method : {item?.payment_method_title}</Text>
            <Text>Ordered on : {formattedDate}</Text>
            <Text>Total Items : {lineItems.length}</Text>
          </View>
          
        </View>
      </View>
          </TouchableOpacity>

      {/* <Button
       style={{marginTop:-40,zIndex:1000,width:"30%",alignSelf:"flex-end"}} 
           onPress={orderDelete}>
        <Text style={{fontSize:16 ,color:"#e95d2a"}}>Cancel </Text> 
        </Button> */}
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
