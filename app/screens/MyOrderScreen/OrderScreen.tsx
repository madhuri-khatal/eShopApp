import {ScrollView} from 'react-native-gesture-handler';
import {HeaderBar} from '../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';
import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';
import OrderList from './OrderList';
import OrderItem from './OrderItem';
import {useCartContext} from '../../context/CartContext';

export const OrderScreen = (props: any) => {
  const {navigation} = props;
  const orderItems = [
    {
      id: 1,
      title: 'Tomato powder',
      status: 'Dispatched',
      total: 49.99,
      imageSrc:
        'https://shgeshop.com/wp-content/uploads/2023/05/tomato-powder.png',
    },
    {
      id: 2,
      title: 'Beet Root Powder',
      status: 'Delivered 3 June',
      total: 29.99,
      imageSrc:
        'https://shgeshop.com/wp-content/uploads/2023/05/beet-root-powder-1.png',
    },
    {
      id: 3,
      title: 'Tomato powder',
      status: `We've received your return. your replacement is complete.`,
      total: 49.99,
      imageSrc:
        'https://shgeshop.com/wp-content/uploads/2023/05/tomato-powder.png',
    },
  ];
  return (
    <ScrollView style={{backgroundColor: '#F7F7F7'}}>
      <HeaderBar
        title="My Orders" titleStyle={{fontSize:18}}
        backAction={() => navigation.goBack()}
        right1Action={() =>
          navigation.getParent('main').dispatch(DrawerActions.toggleDrawer())
        }
        icon1="menu"
      />
      <OrderList orderItems={orderItems} />
    </ScrollView>
  );
};
