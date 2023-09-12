import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {Image, ToastAndroid, View} from 'react-native';
import React, {useRef, useMemo, useCallback} from 'react';
import CartList from './CartList';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {useCartContext} from '../../../context/CartContext';
import CurrencyComponent from '../../../components/ui/Currencycomponent';

import BottomSheet from '@gorhom/bottom-sheet';
import CheckoutScreen from '../CheckoutScreen/CheckoutScreen';
import {DialogComponent} from '../../../components/ui/DialogComponent';
import {useCommanContext} from '../../../context/CommanContext';
import {useCartContext} from '../../../context/CartContext';
export const CartScreen = (props: NativeStackScreenProps<any>) => {
  const {navigation}: any = props;
  const {snackBarVisible, setSnackBarVisible} = useCommanContext();
  const {cartItems} = useCartContext();

  // console.log("cartItems",cartItems?.items);
  // const regular_price = cartItems?.prices?.regular_price.substring(0, cartItems?.prices?.regular_price.length - 2);
  // const regular_price1 = cartItems
  // const regular_price = cartItems?.items?.prices?. regular_price
  //  console.log(regular_price1);
  //  console.log(regular_price);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '2%', '50%', '75%', '100%'], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);
  const handleButtonPress = () => {
    bottomSheetRef.current?.snapToIndex(4);
  };
  const handleClose = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  const {isShowDialog, deleteCartItem, onCancel} = useCartContext();

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
      {cartItems?.items.length === 0 ? (
        <Image
          style={{
            width: 400,
            height: 400,
          }}
          source={{
            uri: 'https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png',
          }}
        />
      ) : (
        <>
          <DialogComponent
            visible={isShowDialog}
            firstAction={deleteCartItem}
            secondAction={onCancel}
          />
          <ScrollView style={{backgroundColor: '#F7F7F7'}}>
            <View style={{flex: 1, padding: 10}}>
              <CartList />

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
                      Total:
                    </Text>
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
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
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
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  textAlign: 'right',
                  marginRight: 20,
                }}
                onPress={handleClose}>
                X
              </Text>
              <CheckoutScreen />
            </View>
          </BottomSheet>
        </>
      )}
    </>
  );
};
