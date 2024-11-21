import * as React from 'react';
import {Dimensions, Image, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';

interface ICarousel {
  autoPlay?: boolean;
  scrollAnimationDuration?: number;
  width?: number;
  height?: number;
  onSnapToItem?: (index: number) => void;
}

const images = [
  'https://kitintellect.tech/bmccompetition/banner%20img%20ES-2.1.jpg_20241121074722',
    'https://kitintellect.tech/bmccompetition/banner%20img%20ES-1.jpg_20241121075034',
    'https://kitintellect.tech/bmccompetition/banner%20img%20ES-3.jpg_20241121075101',
 
  // 'https://kitintellect.tech/bmccompetition/banner-1.jpg_20241108064914',
  // 'https://kitintellect.tech/bmccompetition/banner-2.jpg_20241108065525',
  // 'https://kitintellect.tech/bmccompetition/banner-3.jpg_20241108065546',
  // 'https://kitintellect.tech/bmccompetition/banner-4.jpg_20241108065626',
  // 'https://kitintellect.tech/bmccompetition/banner-5.jpg_20241108065652',
];

export const Caraousel = ({
  autoPlay = true,
  scrollAnimationDuration = 3000,
  width = Dimensions.get('screen').width,
  height = Dimensions.get('screen').width / 1.6,
  onSnapToItem,
}: ICarousel) => {
  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <GestureHandlerRootView>
        <Carousel
          loop
          autoPlay={autoPlay}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          width={width}
          height={height}
          data={images}
          scrollAnimationDuration={scrollAnimationDuration}
          onSnapToItem={index => onSnapToItem && onSnapToItem(index)}
          renderItem={({index, item}: {index: number; item: string}) => (
            <Image
              key={index}
              source={{uri: item}}
              style={{width, height, resizeMode: 'cover', borderRadius: 10}}
            />
          )}
        />
      </GestureHandlerRootView>
    </View>
  );
};

// import * as React from 'react';
// import {Dimensions, Text, View} from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import Carousel from 'react-native-reanimated-carousel';

// interface ICarousel {
//   Component: React.FC | any;
//   data: any[];
//   autoPlay?: boolean;
//   scrollAnimationDuration?: number;
//   width?: number;
//   height?: number;
//   onSnapToItem: Function;
// }
// export const Caraousel = ({
//   Component,
//   data,
//   autoPlay,
//   scrollAnimationDuration = 500,
//   width = Dimensions.get('screen').width,
//   height = Dimensions.get('screen').width / 2.8,
//   onSnapToItem,
// }: ICarousel) => {
//   return (
//     <View style={{width: '100%', alignContent: 'center'}}>

//       <GestureHandlerRootView>
//         <Carousel
//           loop={true}
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//             alignContent: 'center',
//           }}
//           width={width}
//           height={height}
//           autoPlay={autoPlay}
//           data={data}
//           scrollAnimationDuration={scrollAnimationDuration}
//           onSnapToItem={index => onSnapToItem(index)}
//           renderItem={({index, item}: any) => {
//             return <Component key={index} item={item} src={item} />;
//           }}
//         />
//       </GestureHandlerRootView>
//     </View>
//   );
// };

// {
//   /* <Carousel
//   loop
//   style={{
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignContent: 'center',
//   }}
//   width={width}
//   height={height}
//   autoPlay={autoPlay}
//   data={data}
//   scrollAnimationDuration={scrollAnimationDuration}
//   onSnapToItem={index => onSnapToItem(index)}
//   renderItem={(item: any) => {
//     console.log('item', item);

//     return <Component key={item.index} item={item} src={item.item.src} />;
//   }}
// /> */
// }
