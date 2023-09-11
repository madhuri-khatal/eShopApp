import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';
import React, {useRef, useMemo, useCallback} from 'react';
import CartList from './CartList';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BottomSheet from '@gorhom/bottom-sheet';
import CheckoutScreen from '../CheckoutScreen/CheckoutScreen';
export const CartScreen = (props: NativeStackScreenProps<any>) => {
  const {navigation}: any = props;
  const cartItems = [
    {
      id: 1,
      title: 'Tomato powder',
      price: 49.99,
      imageSrc:
        'https://shgeshop.com/wp-content/uploads/2023/05/tomato-powder.png',
    },
    {
      id: 2,
      title: 'Beet Root Powder',
      price: 29.99,
      imageSrc:
        'https://shgeshop.com/wp-content/uploads/2023/05/beet-root-powder-1.png',
    },
    {
      id: 3,
      title: 'Tomato powder',
      price: 49.99,
      imageSrc:
        'https://shgeshop.com/wp-content/uploads/2023/05/tomato-powder.png',
    },
  ];
  const handleCartItemRemove = (itemId: any) => {
    // Handle removing item from cart
    console.log('Removing item with ID:', itemId);
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '2%', '50%', '75%', '100%'], []);
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const handleButtonPress = () => {
    bottomSheetRef.current?.snapToIndex(4);
  };
  const handleClose = () => {
    bottomSheetRef.current?.snapToIndex(0);
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
          <CartList
            cartItems={cartItems}
            onCartItemRemove={handleCartItemRemove}
          />

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
                <Text style={{fontSize: 18}}>₹ 249.98</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                <Text style={{fontSize: 16, color: '#888'}}>Discount:</Text>
                <Text style={{fontSize: 16, color: '#888', textAlign: 'right'}}>
                  ₹ 50.00
                </Text>
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
                <Text style={{fontSize: 16, color: '#888', textAlign: 'right'}}>
                  ₹ 20.00
                </Text>
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
                <Text style={{fontSize: 18}}>₹ 219.98</Text>
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
  );
};
