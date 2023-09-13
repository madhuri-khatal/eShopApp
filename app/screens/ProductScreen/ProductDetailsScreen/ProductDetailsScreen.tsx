import {Dimensions, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, Button, Divider, Card} from 'react-native-paper';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {DrawerActions, useRoute} from '@react-navigation/native';
import CurrencyComponent from '../../../components/ui/Currencycomponent';
import Rating from '../../../components/ui/RatingComponent';
import React, {useState, useRef, useEffect} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import ImageComponent from '../../../components/ui/Image';
import WishlistComponent from '../../../components/Product/WishlistComponent';
import WeightList from '../../WeightListScreen/WeightList';
import QuantityComponent from '../../../components/Product/QuantityComponent';
import ReviewComponent from '../../../components/Product/ReviewComponent';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useProductContext} from '../../../context/ProductContext';
import HTMLView from 'react-native-htmlview';
import {useCartContext} from '../../../context/CartContext';
import {CartApi} from '../../../api/CartApi';

export const ProductDetailsScreen = (props: any) => {
  const {navigation} = props;
  const [index, setIndex] = useState<number>(0);
  const width = Dimensions.get('window').width;
  const refWidth = useRef(0.6);
  const handleIndex = (index: number) => {
    setIndex(index);
  };

  const {addToCart, quantity, variationPrice, setVariationWisePrice} =
    useCartContext();

  const {productById} = useProductContext();
  // useEffect(() => {
  //   (async () => {
  //     await setVariationWisePrice(productById?.id);
  //   })();
  // }, []);
  // const Data= JSON.parse(variationPrice)
  // const [first] = variationPrice;
  // console.log('variationPricevariationPrice', variationPrice);

  const addCart = async () => {
    const id = productById?.variations[0];
    addToCart(id, quantity);
    navigation.navigate('CartScreen');
  };

  // CODE FOR REMOVE <P>DESCRIPTION</P> TAG
  const [descriptionText, setDescriptionText] = useState<string>('');
  const [shortDescriptionText, setShortDescriptionText] = useState<string>('');
  useEffect(() => {
    if (productById?.description || productById?.short_description) {
      setDescriptionText(productById.description);
      setShortDescriptionText(productById?.short_description);
    }
  }, [productById?.description || productById?.short_description]);

  const priceHtml = productById?.price_html;
  const regex =
    /<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#8377;<\/span>([\d.]+)<\/bdi><\/span>/g;

  const prices = [];
  let match;

  while ((match = regex.exec(priceHtml)) !== null) {
    // Extract the numeric price value from each match and add it to the 'prices' array
    prices.push(parseFloat(match[1]));
  }

  if (prices.length === 2) {
    // Now, 'prices' contains both numeric price values
    const firstPrice = prices[0];
    const secondPrice = prices[1];
    console.log('First Price:', firstPrice);
    console.log('Second Price:', secondPrice);
  } else {
    console.log('Prices not found');
  }
  const firstPrice = prices[0];
  const secondPrice = prices[1];
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
                  style={{alignItems: 'flex-start'}}
                  onPress={() => (refWidth.current = 0.4)}>
                  <AntDesign name="close" style={{fontSize: 24}} />
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
                data={productById?.images ?? []}
                scrollAnimationDuration={1000}
                renderItem={({item}: any) => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                    }}>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => (refWidth.current = 1)}
                      onPressOut={() => (refWidth.current = 0.6)}>
                      <ImageComponent
                        src={{uri: item.src}}
                        alt={item.alt}
                        width={width}
                        height={Dimensions.get('window').height * 0.5}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />

              <View
                style={{
                  position: 'absolute',
                  bottom: 80,
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
                    bottom: responsiveWidth(0),
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
              color: '#595555',
            }}>
            {productById?.name}
          </Text>

          <HTMLView value={shortDescriptionText} stylesheet={styles} />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 22,
                  paddingTop: 13,
                  marginLeft: 15,
                  color: '#b1b1b1',
                }}>
                ₹{firstPrice} - ₹{secondPrice}
              </Text>
              <CurrencyComponent
                value={productById?.price}
                style={{
                  alignSelf: 'flex-bottom',
                  fontSize: 28,
                  fontWeight: 'bold',
                  paddingTop: 13,
                  marginLeft: 15,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                marginRight: 5,
              }}>
              <TouchableOpacity>
                <Rating
                  rating={5}
                  maxRating={productById?.rating_count}
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
              </TouchableOpacity>
            </View>
          </View>
          <WeightList />

          <Text
            style={{
              fontSize: 20,
              paddingLeft: 15,
              fontWeight: 'bold',
              textAlign: 'justify',
              color: '#595555',
            }}>
            Product Details
          </Text>
          <HTMLView value={descriptionText} stylesheet={styles} />
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
              backgroundColor: '#e95d2a',
              borderRadius: 10,
            }}
            mode="contained"
            onPress={addCart}
            // onPress={() => {addCart
            //    console.log('Pressed')}}
          >
            <Text
              style={{
                fontWeight: 'bold',
                justifyContent: 'center',
                fontSize: 17,
                textTransform: 'capitalize',
                color: '#ffffff',
              }}>
              Add To Cart
            </Text>
          </Button>
        </View>
      </View>
    </>
  );
};
const styles = {
  p: {
    fontSize: 16,
    margin: 8,
    textAlign: 'justify',
    color: '#595555',
  },
};
