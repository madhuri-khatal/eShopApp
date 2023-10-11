import {ScrollView} from 'react-native-gesture-handler';
import {HeaderBar} from '../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import OrderList from './OrderList';

export const OrderScreen = (props: any) => {
  const {navigation} = props;
  return (
    <ScrollView style={{backgroundColor: '#F7F7F7'}}>
      <HeaderBar
        title="My Orders"
        titleStyle={{fontSize: 18, fontWeight: 'bold', color: '#506574'}}
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
