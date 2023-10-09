import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';

interface ICarousel {
  Component: React.FC | any;
  data: any[];
  autoPlay?: boolean;
  scrollAnimationDuration?: number;
  width?: number;
  height?: number;
  onSnapToItem: Function;
}
export const Caraousel = ({
  Component,
  data,
  autoPlay,
  scrollAnimationDuration = 500,
  width = Dimensions.get('screen').width,
  height = Dimensions.get('screen').width / 2.8,
  onSnapToItem,
}: ICarousel) => {
  return (
    <View style={{width: '100%', alignContent: 'center'}}>
      <GestureHandlerRootView>
        <Carousel
          loop={true}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          width={width}
          height={height}
          autoPlay={autoPlay}
          data={data}
          scrollAnimationDuration={scrollAnimationDuration}
          onSnapToItem={index => onSnapToItem(index)}
          renderItem={({index, item}: any) => {
            return <Component key={index} item={item} src={item} />;
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

{
  /* <Carousel
  loop
  style={{
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  }}
  width={width}
  height={height}
  autoPlay={autoPlay}
  data={data}
  scrollAnimationDuration={scrollAnimationDuration}
  onSnapToItem={index => onSnapToItem(index)}
  renderItem={(item: any) => {
    console.log('item', item);

    return <Component key={item.index} item={item} src={item.item.src} />;
  }}
/> */
}
