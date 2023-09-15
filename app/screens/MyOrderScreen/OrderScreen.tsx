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
      <OrderList />
    </ScrollView>
  );
};
