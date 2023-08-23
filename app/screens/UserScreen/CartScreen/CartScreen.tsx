import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';
import React, {useRef, useMemo, useCallback} from 'react';
import CartList from './CartList';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useProductContext} from '../../../context/ProductContext';
import CurrencyComponent from '../../../components/ui/Currencycomponent';

import BottomSheet from '@gorhom/bottom-sheet';
import CheckoutScreen from '../CheckoutScreen/CheckoutScreen';
export const CartScreen = (props: NativeStackScreenProps<any>) => {
  const {navigation}: any = props;

  const {cartItems} = useProductContext();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '2%', '50%', '75%', '100%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleButtonPress = () => {
    bottomSheetRef.current?.snapToIndex(4);
  };
  return (
    <>
      <HeaderBar
        title="Cart Screen"
        backAction={() => navigation.goBack()}
        right1Action={() =>
          navigation.getParent('main').dispatch(DrawerActions.toggleDrawer())
        }
        icon1="menu"
      />
      <ScrollView style={{backgroundColor: '#F7F7F7'}}>
        <View style={{flex: 1, padding: 10}}>
          <CartList />

          <View
            style={{borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 16}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total:</Text>
                <CurrencyComponent value={cartItems?.totals?.total_items} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                <Text style={{fontSize: 16, color: '#888'}}>Discount:</Text>

                <CurrencyComponent value={cartItems?.totals?.total_discount} />
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
                <CurrencyComponent value={cartItems?.totals?.total_shipping} />
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
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#f6d70e',
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
          }}
          onPress={handleButtonPress}>
          <Text
            style={{
              color: '#595555',
              textAlign: 'center',
              fontSize: 18,
            }}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View>
          <CheckoutScreen />
        </View>
      </BottomSheet>
    </>
  );
};
