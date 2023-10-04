import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {Image, ToastAndroid, View} from 'react-native';
import React, {useRef, useMemo, useCallback} from 'react';
import CartList from './CartList';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BottomSheet from '@gorhom/bottom-sheet';
import CheckoutScreen from '../CheckoutScreen/CheckoutScreen';
import {DialogComponent} from '../../../components/ui/DialogComponent';
import {useCommanContext} from '../../../context/CommanContext';
import {useCartContext} from '../../../context/CartContext';
import CheckoutAsRole from '../CheckoutScreen/CheckoutAsRole';

export const CartScreen = (props: NativeStackScreenProps<any>) => {
  const {navigation}: any = props;
  const {cartItems} = useCartContext();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '2%', '50%', '75%', '100%'], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);
  const handleButtonPress = () => {
    bottomSheetRef.current?.snapToIndex(2);
  };
  const handleClose = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  const {isShowDialog, deleteCartItem, onCancel} = useCartContext();
  const formattedPrice = (cartItems?.totals?.total_price / 100).toLocaleString(
    'en-US',
    {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );
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
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#506574',
                      }}>
                      Shipping Price:
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#506574',
                      }}>
                      ₹ {cartItems?.totals?.total_shipping / 100}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#506574',
                      }}>
                      Total:
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#506574',
                      }}>
                      ₹ {formattedPrice}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{
              backgroundColor: '#e95d2a',
              padding: 15,
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
          </TouchableOpacity>
          <BottomSheet
            enablePanDownToClose
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  textAlign: 'right',
                  marginRight: 20,
                  color: '#506574',
                }}
                onPress={handleClose}>
                X
              </Text>
              <CheckoutScreen />
            </View>
          </BottomSheet>
          <BottomSheet
            enablePanDownToClose
            ref={bottomSheetRef}
            index={0}
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
              <CheckoutAsRole />
            </View>
          </BottomSheet>
        </>
      )}
    </>
  );
};
