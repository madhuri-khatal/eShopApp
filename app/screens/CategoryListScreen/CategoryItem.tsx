import { View, Text } from 'react-native';
import React from 'react';
import {  Chip } from 'react-native-paper';
import { Image } from 'react-native';

interface IProps {
  icon: any;
  title: any;
}


export default function CategoryItem({ icon, title }: IProps) {
   
  return (
    <View style={{ flexDirection: 'row',display:'flex'}}>

    <Chip
      icon={() => <Image source={{ uri: icon }} style={{ width: 24, height: 24 }} />} // Render the image as icon
      onPress={() => console.log('Pressed')}
      mode='flat'
    >
      {title}
    </Chip>
  </View>
  );
}
