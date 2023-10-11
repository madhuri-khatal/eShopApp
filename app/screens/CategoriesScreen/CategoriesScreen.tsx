import {HeaderBar} from '../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

export const CategoriesScreen = (props: any) => {
  const {navigation} = props;

  return (
    <>
      <ScrollView style={{backgroundColor: '#e95d2a'}}>
        <View>
          <Text style={{color: '#ffffff'}}>TITLE OF categories screen</Text>
        </View>
      </ScrollView>
    </>
  );
};
