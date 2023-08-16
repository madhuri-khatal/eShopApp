import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {DrawerActions} from '@react-navigation/native';
import {Appbar, Button} from 'react-native-paper';

export default function ProfileScreen(props: any) {
  const {navigation} = props;

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Title" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="menu" onPress={_handleMore} />
      </Appbar.Header>
      <Text>This is profile screen</Text>
      <Button
        style={{
          width: 200,
          height: 50,
          backgroundColor: '#f6d70e',
          borderRadius: 10,
          padding: 3,
        }}
        mode="contained"
        onPress={() => navigation.navigate('CartScreen')}>
        <Text
          style={{
            fontWeight: 'bold',
            justifyContent: 'center',
            fontSize: 17,
            textTransform: 'capitalize',
            color: '#595555',
          }}>
          My Cart
        </Text>
      </Button>
    </View>
  );
}
