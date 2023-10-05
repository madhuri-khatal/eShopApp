import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useProductContext} from '../../context/ProductContext';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native';

export default function CouponList() {
  const {couponData} = useProductContext();
  const isOddLength = couponData.length === 1;
  const itemWidth = isOddLength ? '99%' : '49%';

  return (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: '#fcf4d9',
        alignItems: 'center',
        padding: 5,
        marginVertical: 4,
        marginHorizontal: 4,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 28,
          paddingVertical: 20,
          textAlign: 'center',
          color: '#506574',
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
              marginVertical: 4,
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
                  {item.amount}% Off
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    paddingBottom: 15,
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
                padding: 20,
                marginTop: 5,
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
