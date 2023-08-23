import {ScrollView} from 'react-native-gesture-handler';
import ProductList from './ProductList';
import {HeaderBar} from '../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';
import React from 'react';
import FilterMenu from '../../screens/FilterScreen/FilterMenu';
import {useTheme} from 'react-native-paper';
export const ProductsScreen = (props: any) => {
  const {navigation} = props;
  const {colors} = useTheme();
  return (
    <>
      <HeaderBar
        title="Product Screen"
        titleStyle={{color: colors.onSecondary}}
        backAction={() => navigation.goBack()}
        right2Action={() => {
          navigation.getParent('main').navigate('BottomTab', {
            screen: 'CartStack',
            initial: false,
          });
        }}
        right1Action={() =>
          navigation.getParent('main').dispatch(DrawerActions.toggleDrawer())
        }
        icon1="menu"
        icon2="cart"
      />
      <View
        style={{
          position: 'absolute',
          top: 55,
          left: 0,
          zIndex: 9000,
          borderRadius: 10,
          paddingBottom: 5,
          backgroundColor: 'white',
          width: '100%',
        }}>
        <FilterMenu />
      </View>
      <View style={{marginTop: 20}}>
        <ProductList  />
      </View>
    </>
  );
};
