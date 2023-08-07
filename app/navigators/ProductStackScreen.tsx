import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductList from '../screens/ProductScreen/ProductList';
import ProductItem from '../screens/ProductScreen/ProductItem';
import { Appbar } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';


const Stack= createStackNavigator();
export default function ProductStackScreen({navigation}: any) {

  const _handleMore = () => navigation .dispatch(DrawerActions.toggleDrawer());
  return (
    <>  
<View>
<Appbar.Header>
          <Appbar.Content title="ProductList" />
          <Appbar.Action icon="menu" onPress={_handleMore} />
   </Appbar.Header>
</View>

   <Stack.Navigator initialRouteName='ProductList'>
  <Stack.Screen name=" " component={ProductList} />
    <Stack.Screen name='ProductItem' component={ProductItem} />
</Stack.Navigator>
</>
  )
}