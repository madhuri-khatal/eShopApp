import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderBar} from '../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {Image, ToastAndroid, View} from 'react-native';
import React, {useRef, useMemo, useCallback} from 'react';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WishlistItem} from './WishlistItem';

export const WishlistScreen = (props: NativeStackScreenProps<any>) => {
  const {navigation}: any = props;

  return (
    <>
      <HeaderBar
        title="My Wishlist"
        titleStyle={{fontSize: 18, fontWeight: 'bold', color: '#506574'}}
        backAction={() => navigation.goBack()}
        right1Action={() =>
          navigation.getParent('main').dispatch(DrawerActions.toggleDrawer())
        }
        icon1="menu"
      />

      <ScrollView style={{backgroundColor: '#F7F7F7'}}>
        <View style={{flex: 1, padding: 10}}>
          <WishlistItem />
        </View>
      </ScrollView>
    </>
  );
};
