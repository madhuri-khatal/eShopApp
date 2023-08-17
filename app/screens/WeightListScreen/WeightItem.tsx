import React from 'react';
import { View, Text } from 'react-native';

interface IProps {
  icon?: any;
  title?: any;
  options2: string;
}

export default function WeightItem({ icon, title, options2 }: IProps) {
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
      <Text>{options2}</Text>
    </View>
  );
}
