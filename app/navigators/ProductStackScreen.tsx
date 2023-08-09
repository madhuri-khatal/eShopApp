import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductList from '../screens/ProductScreen/ProductList';
import ProductItem from '../screens/ProductScreen/ProductItem';
import { Appbar } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import CategoryList from '../screens/CategoryListScreen/CategoryList';
import { ProductsScreen } from '../screens/ProductScreen/ProductsScreen';
import { ProductDetailsScreen } from '../screens/ProductScreen/ProductDetailsScreen/ProductDetailsScreen';


const Stack= createStackNavigator();
export default function ProductStackScreen({navigation}: any) {
  return (
    <>  
   <Stack.Navigator  screenOptions={{
    headerShown:false
   }} initialRouteName='ProductScreen'>
  <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
  <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
  
</Stack.Navigator>
</>
  )
}