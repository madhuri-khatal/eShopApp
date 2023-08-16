import React from 'react';
import {Chip} from 'react-native-paper';
import {Image, View} from 'react-native';
import {Text} from 'react-native';

interface IProps {
  icon?: any;
  title: any;
}

export default function WeightItem({icon, title}: IProps) {
  return (
    <View
      style={{
        margin: 6,
        padding: 5,
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 0.5,
        borderTopWidth: 7,
        borderColor: '#59a30e',
        borderRadius: 5,
      }}>
      <Text>{title}</Text>
    </View>
  );
}
