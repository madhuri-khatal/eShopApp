import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';

export const CaraouselContent = ({item}: any) => {
  console.log(item);
  return (
    <View
      style={{
        flex: 1,
        padding: '4%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          borderWidth: 0.3,
          justifyContent: 'center',
          backgroundColor: '#eecacb',
        }}>
        <Text style={{textAlign: 'center', fontSize: 24}}>{item?.index}</Text>
      </View>
    </View>
  );
};
