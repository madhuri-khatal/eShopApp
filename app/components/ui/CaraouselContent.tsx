import React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';

export const CaraouselContent = (props: any) => {
  const {src} = props;

  return (
    <View
      style={{
        flex: 1,
        padding: '1%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
        }}>
        <Card>
          <Card.Cover
            resizeMode="cover"
            resizeMethod="resize"
            source={{uri: src}}
          />
        </Card>
      </View>
    </View>
  );
};
