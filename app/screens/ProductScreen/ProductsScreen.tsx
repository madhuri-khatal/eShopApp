import {ScrollView} from 'react-native-gesture-handler';
import ProductList from './ProductList';
import {HeaderBar} from '../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';
import CategoryList from '../WeightListScreen/WeightList';
import React from 'react';
import FilterMenu from '../FilterScreen/FilterMenu';
import MainCategory from '../FilterScreen/FiltersMenu';
import FilterMenu1 from '../../screens/FilterScreen/FilterMenu1';

export const ProductsScreen = (props: any) => {
  const {navigation} = props;
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <HeaderBar
        title="Product Screen"
        right1Action={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        icon1="menu"
      />
      <View
        style={{
          position: 'absolute',
          top: 55,
          left: 0,
          zIndex: 9000,
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust the alpha value as needed
          borderRadius: 10,
          width: '50%',
          paddingBottom: 10,
        }}>
        {/* <CategoryList /> */}

        <FilterMenu1 />
      </View>
      <View style={{marginTop: 20}}>
        <ProductList />
      </View>
    </ScrollView>
  );
};
