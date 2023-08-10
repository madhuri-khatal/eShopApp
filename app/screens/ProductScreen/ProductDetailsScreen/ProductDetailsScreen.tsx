import {Dimensions, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, Button} from 'react-native-paper';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import CurrencyComponent from '../../../components/ui/Currencycomponent';
import Rating from '../../../components/ui/RatingComponent';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import ImageComponent from '../../../components/ui/Image';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const ProductDetailsScreen = (props: any) => {
  const {navigation} = props;
  const width = Dimensions.get('window').width;

  const img =
    'https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg';
  return (
    <ScrollView>
      <HeaderBar
        title="product detail screen"
        backAction={() => navigation.goBack()}
        icon1="menu"
        right1Action={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <View style={{flex: 1, padding: 3}}>
        <View style={{flex: 1}}>
          <Carousel
            loop
            mode="parallax"
            width={width}
            height={Dimensions.get('window').height * 0.4}
            autoPlay={false}
            data={[...new Array(3).keys()]}
            scrollAnimationDuration={1000}
            onSnapToItem={index => console.log('current index:', index)}
            renderItem={({index}) => (
              <View
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  justifyContent: 'center',
                }}>
                <ImageComponent
                  src={{
                    uri: 'https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg',
                  }}
                  alt={'image'}
                  width={400}
                  height={300}
                />
              </View>
            )}
          />
          <View style={{alignItems:'flex-end',paddingRight:18}}>
            <AntDesign name="hearto" color="#E03F1F" size={22} />
          </View>
        </View>

        <Text style={{fontSize: 30, fontWeight: 'bold', paddingLeft: 10,textTransform:'capitalize',marginBottom:13}}>
          papad
        </Text>

        <View>
          <ScrollView></ScrollView>
        </View>
        <Text style={{fontSize: 20, padding: 5, margin:8, textAlign:'justify'}}>
          {' '}
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
          <View style={{marginLeft: 70}}>
            <Rating
              rating={5}
              maxRating={5}
              iconFilled={
                <View style={{marginRight: 5}}>
                  <Text style={{color: 'gold', fontSize: 40}}>★</Text>
                </View>
              }
              iconEmpty={
                <View style={{marginRight: 5}}>
                  <Text style={{color: 'gold', fontSize: 20}}>☆</Text>
                </View>
              }
              iconSize={50}
            />
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop:80,}}>
          <View>
            <Button
              style={{
                width: 170,
                height: 50,
                backgroundColor: 'red',
                borderRadius: 10,
                
              }}
              mode="contained"
              onPress={() => console.log('Pressed')}>
              <Text style={{color: 'white', fontWeight: 'bold', justifyContent:'center', fontSize:16}}>
                Add To Cart
              </Text>
            </Button>
          </View>
          <View style={{marginLeft: 30}}>
            <Button
              style={{
                width: 180,
                height: 50,
                borderRadius: 10,
                backgroundColor: '#76A713',
              }}
              mode="contained"
              onPress={() => console.log('Pressed')}>
              <Text style={{color: 'white', fontWeight: 'bold' , fontSize:16}}>Buy Now</Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
