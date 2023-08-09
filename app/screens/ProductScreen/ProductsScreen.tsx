import {ScrollView} from 'react-native-gesture-handler';
import ProductList from './ProductList';
import { HeaderBar } from '../../components/ui/HeaderBar';
import { DrawerActions } from '@react-navigation/native';
import { View } from 'react-native';
import CategoryList from '../CategoryListScreen/CategoryList';
import React from 'react';

export const ProductsScreen = (props: any) => {
    const{navigation}=props
  return (
    <ScrollView>
        <HeaderBar title='Product Screen' right1Action={()=>navigation.dispatch(DrawerActions.toggleDrawer())} icon1='menu' />
        <View style={{flex: 1}}>
        <CategoryList />
      </View>
      <ProductList />
    </ScrollView>
  );
};
