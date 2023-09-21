  import React, { useEffect } from 'react';
  import { View, ScrollView } from 'react-native';
  import OrderItem from './OrderItem';
  import { useCartContext } from '../../context/CartContext';
  import { Text } from 'react-native-paper';
import { useCheckoutContext } from '../../context/CheckoutContext';

  const OrderList = () => {
    const { myOrderItems, getMyOrderData,getMyOrders,myOrderItemsByid,Login } = useCartContext();
   
const loginId=Login?.data?.ID
 
useEffect(() => {
           (async () => {
             await getMyOrders(loginId);
      })();
    }, [loginId]);
    
   
    
    return (
      <View >
        {myOrderItemsByid?.orders==undefined ?(
  <Text style={{fontSize:20,fontWeight:'bold',alignSelf:'center',color:'#b1b1b1',margin:10}}> Your Order List Is Empty </Text>
        ):(
          <ScrollView>
          {myOrderItemsByid?.orders?.map((item: any, key: any) => (
            <OrderItem
              key={item?.id}
              lineItems={item?.line_items}
              orderId={item?.id}
              item={item}
            />
          ))}
            </ScrollView>
        )}
      
      </View>
    );
  };

  export default OrderList;
