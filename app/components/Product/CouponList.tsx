import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {useProductContext} from '../../context/ProductContext';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native';

export default function CouponList() {
  const {couponData} = useProductContext();
  const isOddLength = couponData.length === 1;
  const itemWidth = isOddLength ? '99%' : '49%';

  return (
    <ImageBackground
      source={require('../../../assets/image/couponBg.jpg')}
      style={{
        flex: 1,
        paddingVertical: 20,
        // resizeMode: 'cover',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: 10,

            alignItems: 'center',
            padding: 5,
            marginVertical: 4,
            marginHorizontal: 4,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              lineHeight: 20,
              paddingVertical: 13,
              textAlign: 'center',
              color: '#fff',
              borderRadius: 10,
              paddingHorizontal: 15,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}>
            Special Offers
          </Text>
          <FlatList
            data={couponData}
            keyExtractor={(item: any) => item.id.toString()}
            numColumns={2}
            renderItem={({item}: any) => (
              <View
                style={{
                  width: itemWidth,
                  marginVertical: 20,
                  marginRight: 4,
                  elevation: 5,
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '60%',
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 18,
                        padding: 10,
                        paddingBottom: 0,
                        marginTop: 15,
                        textAlign: 'center',
                        color: '#506574',
                      }}>
                      {item.amount % 100}% Off
                    </Text>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 16,
                        color: '#506574',
                        opacity: 0.5,
                        textAlign: 'center',
                      }}>
                      {item.code}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                    }}>
                    <Image
                      source={require('../../../assets/image/offer.png')}
                      style={{
                        width: 65,
                        height: 65,
                        justifyContent: 'center',
                      }}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 13,
                    padding: 7,
                    marginTop: 15,
                    borderTopColor: '#e0e0e0',
                    borderTopWidth: 2,
                    borderStyle: 'dotted',
                    textAlign: 'center',
                    color: '#506574',
                  }}>
                  {item.description}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  dWrapper: {
    backgroundColor: '#fff',
  },

  zigZagTop: {
    marginVertical: 32,
    backgroundColor: '#1ba1e2',
    paddingVertical: 32,
  },

  zigZagBottom: {
    marginVertical: 32,
    backgroundColor: '#1ba1e2',
    paddingVertical: 32,
  },

  zigZagTopGradient: {
    height: 32,
    width: '100%',
    position: 'relative',
    bottom: 64,
    left: 0,
  },

  zigZagBottomGradient: {
    height: 32,
    width: '100%',
    position: 'relative',
    top: 64,
    left: 0,
  },
});
