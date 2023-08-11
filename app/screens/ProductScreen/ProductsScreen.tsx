import {ScrollView} from 'react-native-gesture-handler';
import ProductList from './ProductList';
import {HeaderBar} from '../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';
import React from 'react';

import FilterMenu from '../../screens/FilterScreen/FilterMenu';

export const ProductsScreen = (props: any) => {
  const {navigation} = props;

  return (
    <ScrollView style={{backgroundColor: '#F7F7F7'}}>
      <HeaderBar
        title="Product Screen"
        right1Action={() =>
          navigation.getParent('main').dispatch(DrawerActions.toggleDrawer())
        }
        icon1="menu"
      />
      <View
        style={{
          position: 'absolute',
          top: 55,
          left: 0,
          zIndex: 9000,
                 borderRadius: 10,
                   paddingBottom: 5,
        }}>
        <FilterMenu />
      </View>
      <View style={{marginTop: 20}}>
        <ProductList />
      </View>
    </ScrollView>
  );
};
