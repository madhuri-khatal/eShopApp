import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useProductContext} from '../../context/ProductContext';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native';

export default function CouponList() {
  const {couponData} = useProductContext();
  const getRandomColor = () => {
    const colors = [
      '#007bff',
      '#17a2b8',
      '#28a745',
      '#e95d2a',
      '#dc3545',
      '#6c757d',
    ];
    for (let i = colors.length - 5; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: '#c8e6ca',
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
          paddingTop: 30,
          textAlign: 'center',
        }}>
        SPECIAL OFFERS
      </Text>
      <FlatList
        data={couponData}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={2}
        renderItem={({item}: any) => (
          <View
            style={{
              width: '49%',
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
                  // backgroundColor: '#000',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 18,
                    padding: 10,
                    paddingBottom: 0,
                    marginTop: 15,
                    textAlign: 'center',
                  }}>
                  {item.amount}₹ Off
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    paddingBottom: 15,
                    color: '#c2c2c2',
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
                fontSize: 14,
                padding: 10,
                marginTop: 5,
                borderTopColor: '#e0e0e0',
                borderTopWidth: 2,
                borderStyle: 'dotted',
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
