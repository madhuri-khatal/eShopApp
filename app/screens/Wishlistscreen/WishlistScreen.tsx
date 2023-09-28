import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderBar} from '../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {Image, ToastAndroid, View} from 'react-native';
import React, {useRef, useMemo, useCallback} from 'react';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';


export const WishlistScreen = (props: NativeStackScreenProps<any>) => {
  const {navigation}: any = props;

  // console.log('cartItems', cartItems?.items);
  // const regular_price = cartItems?.prices?.regular_price.substring(0, cartItems?.prices?.regular_price.length - 2);
  // const regular_price1 = cartItems
  // const regular_price = cartItems?.items?.prices?. regular_price
  //  console.log(regular_price1);
  //  console.log(regular_price);


    return (
    <>
      <HeaderBar
        title="My Cart"
        titleStyle={{fontSize: 18}}
        backAction={() => navigation.goBack()}
        right1Action={() =>
          navigation.getParent('main').dispatch(DrawerActions.toggleDrawer())
        }
        icon1="menu"
      />

          <ScrollView style={{backgroundColor: '#F7F7F7'}}>
            <View style={{flex: 1, padding: 10}}>
              {/* <WishlistItem /> */}

              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: '#ddd',
                  paddingTop: 16,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      Shipping Price:
                    </Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      ₹ 
                    </Text>
                  </View>
               
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <Text style={{fontSize: 16, color: '#888'}}>Discount:</Text>

                    <CurrencyComponent
                      value={cartItems?.totals?.total_discount}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <Text style={{fontSize: 16, color: '#888'}}>
                      Delivery Charges:
                    </Text>
                    <CurrencyComponent
                      value={cartItems?.totals?.total_shipping}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      Final Total:
                    </Text>
                    <CurrencyComponent value={cartItems?.totals?.total_price} />
                  </View> */}
                </View>
              </View>
            </View>
          </ScrollView>
          {/* <TouchableOpacity
            style={{
              backgroundColor: '#e95d2a',
              padding: 15,
              // borderRadius: 8,
              // marginTop: 16,
            }}
            onPress={handleButtonPress}>
            <Text
              style={{
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 18,
                justifyContent: 'center',
              }}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity> */}
          
    
    
    </>
  );
};
