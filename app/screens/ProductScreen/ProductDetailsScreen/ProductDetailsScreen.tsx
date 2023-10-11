import {Dimensions, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, Button} from 'react-native-paper';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import CurrencyComponent from '../../../components/ui/Currencycomponent';
import React, {useState, useRef, useEffect} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import ImageComponent from '../../../components/ui/Image';
import WeightList from '../../WeightListScreen/WeightList';
import QuantityComponent from '../../../components/Product/QuantityComponent';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useProductContext} from '../../../context/ProductContext';
import HTMLView from 'react-native-htmlview';
import {useCartContext} from '../../../context/CartContext';
import {Linking} from 'react-native';
export const ProductDetailsScreen = (props: any) => {
  const {navigation} = props;
  const [index, setIndex] = useState<number>(0);
  const width = Dimensions.get('window').width;
  const refWidth = useRef(0.6);
  const handleIndex = (index: number) => {
    setIndex(index);
  };
  const {addToCart, quantity, price, cartItems, getCartList} = useCartContext();
  useEffect(() => {
    (async () => {
      await getCartList();
    })();
  }, []);
  const badgeCount = cartItems?.items.length || 0;
  const {productById} = useProductContext();
  const addCart = async () => {
    const id = productById?.variations[0];
    addToCart(id, quantity);
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
    prices.push(parseFloat(match[1]));
  }

  if (prices.length === 2) {
    const firstPrice = prices[0];
    const secondPrice = prices[1];
  } else {
    console.log('Prices not found');
  }
  const firstPrice = prices[0];
  const secondPrice = prices[1];

  const handleWhatsAppLink = (
    id: number | string,
    message: string = '',
    img: any,
  ) => {
    const whatsappLink = `https://wa.me/${id}?text=${encodeURIComponent(
      message,
    )}`;
    Linking.openURL(whatsappLink);
  };

  const imageSrc = productById?.images[0]?.src;
  const shareProduct = async () => {
    const defaultMessage = ` ${productById?.permalink} \n \n ${productById?.name}`;
    await handleWhatsAppLink('', defaultMessage, imageSrc);
  };
  return (
    <>
      <HeaderBar
        title={productById?.name}
        titleStyle={{fontSize: 18, fontWeight: 'bold', color: '#506574'}}
        backAction={() => navigation.goBack()}
        right2Action={() => {
          navigation.navigate('CartStack', {
            screen: 'CartScreen',
            initial: false,
          });
        }}
        right1Action={() =>
          navigation.getParent('main').dispatch(DrawerActions.toggleDrawer())
        }
        icon1="menu"
        icon2="cart"
        badgeCount={badgeCount}
      />
      <ScrollView>
        <View style={{flex: 1}}>
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
                      onPressOut={() => (refWidth.current = 0.5)}>
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
              {/* <View
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
              </View> */}
            </View>
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              paddingLeft: 10,
              textTransform: 'capitalize',
              color: '#506574',
            }}>
            {productById?.name}
          </Text>
          <HTMLView value={shortDescriptionText} stylesheet={styles} />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 8}}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 15,
                      color: '#b1b1b1',
                      marginVertical: 5,
                    }}>
                    ₹ {firstPrice} - ₹ {secondPrice}
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      marginLeft: 15,
                      color: '#506574',
                    }}>
                    ₹ {price || productById?.price}
                  </Text>
                </View>

                <View style={{flex: 2}}>
                  <Button
                    onPress={shareProduct}
                    style={{
                      alignItems: 'flex-end',
                      // paddingRight: 10,
                      // marginTop: 1,
                    }}>
                    <FontAwesome
                      name="whatsapp"
                      color="green"
                      size={30}
                      style={{padding: 8}}
                    />
                  </Button>
                </View>
              </View>
            </View>
          </View>
          <WeightList />

          <Text
            style={{
              fontSize: 20,
              paddingLeft: 15,
              fontWeight: 'bold',
              textAlign: 'justify',
              color: '#506574',
            }}>
            Product Details
          </Text>
          <HTMLView value={descriptionText} stylesheet={styles} />
        </View>
      </ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 6,
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 15}}>
          <QuantityComponent />
        </View>
        <View style={{alignItems: 'center', marginRight: 10}}>
          <Button
            style={{
              width: 220,
              height: 45,
              backgroundColor: '#e95d2a',
              borderRadius: 0,
              justifyContent: 'center',
            }}
            mode="contained"
            onPress={addCart}>
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
    color: '#506574',
  },
};
