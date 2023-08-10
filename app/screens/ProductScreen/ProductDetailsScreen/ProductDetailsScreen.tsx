import {Dimensions, Pressable, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, Button, Divider} from 'react-native-paper';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import CurrencyComponent from '../../../components/ui/Currencycomponent';
import Rating from '../../../components/ui/RatingComponent';
import React, {useState, useRef} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import ImageComponent from '../../../components/ui/Image';
import WishlistComponent from '../../../components/Product/WishlistComponent';
import WeightList from '../../WeightListScreen/WeightList';
import QuantityComponent from '../../../components/Product/QuantityComponent';
import ReviewComponent from '../../../components/Product/ReviewComponent';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import {responsiveWidth} from 'react-native-responsive-dimensions';
export const ProductDetailsScreen = (props: any) => {
  const {navigation} = props;
  const [index, setIndex] = useState<number>(0);
  const width = Dimensions.get('window').width;
  const refWidth = useRef(0.6);
  const handleIndex = (index: number) => {
    setIndex(index);
  };
  return (
    <>
      <ScrollView>
        <HeaderBar
          title="product detail screen"
          backAction={() => navigation.goBack()}
          icon1="menu"
          right1Action={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
        <View style={{flex: 1, padding: 3}}>
          <View style={{flex: 1}}>
            <View style={{flex: 1, position: 'relative'}}>
              {refWidth.current == 1 && (
                <Button
                  onPress={() => (refWidth.current = 0.4)}
                  icon={{
                    source: {
                      uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
                    },
                    direction: 'rtl',
                  }}>
                  Press me
                </Button>
              )}
              <Carousel
                loop
                mode="parallax"
                onProgressChange={(_, absoluteProgress) => {
                  handleIndex(Math.round(absoluteProgress));
                }}
                width={width}
                height={Dimensions.get('window').height * refWidth.current}
                autoPlay={true}
                data={[...new Array(3).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={index => console.log('current index:', index)}
                renderItem={({index}) => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => (refWidth.current = 1)}
                      onPressOut={() => (refWidth.current = 0.4)}>
                      <ImageComponent
                        src={{
                          uri: 'https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg',
                        }}
                        alt={'image'}
                        width={width}
                        height={Dimensions.get('window').height}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 50,
                  left: 20,
                  width: '100%',
                  height: 25,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    position: 'absolute',
                    bottom: responsiveWidth(-8),
                    left: responsiveWidth(35),
                  }}>
                  <AnimatedDotsCarousel
                    length={3}
                    currentIndex={index}
                    maxIndicators={3}
                    interpolateOpacityAndColor={false}
                    activeIndicatorConfig={{
                      color: '#EC3C4C',
                      margin: 3,
                      opacity: 1,
                      size: 8,
                    }}
                    inactiveIndicatorConfig={{
                      color: '#F96B2B',
                      margin: 3,
                      opacity: 0.5,
                      size: 8,
                    }}
                    decreasingDots={[
                      {
                        config: {
                          color: '#F96B2B',
                          margin: 3,
                          opacity: 0.5,
                          size: 6,
                        },
                        quantity: 1,
                      },
                      {
                        config: {
                          color: '#F96B2B',
                          margin: 3,
                          opacity: 0.5,
                          size: 4,
                        },
                        quantity: 1,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={{alignItems: 'flex-end', paddingRight: 18}}>
              <WishlistComponent />
            </View>
          </View>

          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              paddingLeft: 10,
              textTransform: 'capitalize',
              marginBottom: 5,
            }}>
            papad
          </Text>

          <View>
            <ScrollView></ScrollView>
          </View>
          <Text
            style={{fontSize: 16, padding: 5, margin: 8, textAlign: 'justify'}}>
            Delight in the crispy and savory goodness of our papad product. Made
            from a blend of carefully selected lentil flours
          </Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
              <CurrencyComponent
                value={100}
                style={{
                  alignSelf: 'flex-bottom',
                  fontSize: 28,
                  fontWeight: 'bold',
                  paddingTop: 13,
                  marginLeft: 15,
                }}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', marginRight: 5}}>
              <Rating
                rating={5}
                maxRating={5}
                iconFilled={
                  <View style={{marginRight: 5}}>
                    <Text style={{color: 'gold', fontSize: 30}}>★</Text>
                  </View>
                }
                iconEmpty={
                  <View style={{marginRight: 5}}>
                    <Text style={{color: 'gold', fontSize: 30}}>☆</Text>
                  </View>
                }
                iconSize={50}
              />
            </View>
          </View>

          <WeightList />

          <Text
            style={{
              fontSize: 20,
              paddingLeft: 15,
              fontWeight: 'bold',
              textAlign: 'justify',
            }}>
            Product Details
          </Text>
          <Text
            style={{fontSize: 16, padding: 5, margin: 8, textAlign: 'justify'}}>
            Delight in the crispy and savory goodness of our papad product. Made
            from a blend of carefully selected lentil flours Delight in the
            crispy and savory goodness of our papad product. Made from a blend
            of carefully selected lentil flours Delight in the crispy and savory
            goodness of our papad product. Made from a blend of carefully
            selected lentil flours Delight in the crispy and savory goodness of
            our papad product. Made from a blend of carefully selected lentil
            flours
          </Text>
        </View>

        <View style={{flex: 1}}>
          <ReviewComponent />
        </View>
      </ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 15,
          marginBottom: 10,
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 15}}>
          <QuantityComponent />
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', marginRight: 20}}>
          <Button
            style={{
              width: 220,
              height: 50,
              backgroundColor: '#f6d70e',
              borderRadius: 10,
            }}
            mode="contained"
            onPress={() => console.log('Pressed')}>
            <Text
              style={{
                fontWeight: 'bold',
                justifyContent: 'center',
                fontSize: 16,
                textTransform: 'capitalize',
                color: '#595555',
              }}>
              Add To Cart
            </Text>
          </Button>
        </View>
      </View>
    </>
  );
};
