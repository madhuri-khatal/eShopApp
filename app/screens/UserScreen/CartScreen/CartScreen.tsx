import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';
import React from 'react';
import CartList from './CartList';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';
import CheckoutScreen from '../CheckoutScreen/CheckoutScreen';

export const CartScreen = (props: any) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const {navigation} = props;
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

        <PaperProvider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle} >
                            <CheckoutScreen />
            </Modal>
          </Portal>
        
          <TouchableOpacity
            style={{
              backgroundColor: '#f6d70e',
              padding: 12,
              borderRadius: 8,
              marginTop: 16,
            }}
            onPress={showModal}>
            <Text
              style={{
                color: '#595555',
                textAlign: 'center',
                fontSize: 18,
              }}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </PaperProvider>
      </ScrollView>
    </>
  );
};
