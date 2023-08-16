import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface ICarousel {
  Component: React.FC | any;
  data?: any[];
  autoPlay?: boolean;
  scrollAnimationDuration?: number;
  width?: number;
  height?: number;
  onSnapToItem?: Function;
}
export const Caraousel = ({
  Component,
  data = [],
  autoPlay,
  scrollAnimationDuration = 2000,
  width = Dimensions.get('screen').width,
  height = width / 2,
  onSnapToItem,
}: ICarousel) => {
  return (
    <View style={{width: '100%', alignContent: 'center'}}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={autoPlay}
        data={data}
        scrollAnimationDuration={scrollAnimationDuration}
        // onSnapToItem={index => onSnapToItem(index)}
        renderItem={(item: any) => <Component key={item.index} item={item} />}
      />
    </View>
  );
};
