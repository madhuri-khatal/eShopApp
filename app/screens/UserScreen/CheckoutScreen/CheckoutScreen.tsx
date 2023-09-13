import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput, Text, useTheme} from 'react-native-paper';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import {ScrollView} from 'react-native-gesture-handler';
import DeliveryAddressScreen from './DeliveryAddressScreen';
import {useNavigation} from '@react-navigation/native';
import {useCartContext} from '../../../context/CartContext';
import {useCheckoutContext} from '../../../context/CheckoutContext';
export default function CheckoutScreen(props: any) {
  const navigation: any = useNavigation();
  const {colors} = useTheme();
  const {cartItems} = useCartContext();
  const {onSubmitCheckout} = useCheckoutContext();

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showCODDetails, setShowCODDetails] = useState(false);
  const handlePaymentMethodPress = (method: any) => {
    if (selectedMethod === method) {
      setSelectedMethod(null);
    } else {
      setSelectedMethod(method);
    }

    if (method === 'COD') {
      setShowCODDetails(!showCODDetails);
    }
  };
  const billing = cartItems?.billing_address;

  return (
    <>
      <ScrollView>
        <View style={{marginVertical: 20, padding: 7}}>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Customer Information
            </Text>
          </View>

          <View style={{padding: 8}}>
            <TextInput
              placeholder={'Phone Number'}
              style={{margin: 8, backgroundColor: 'white'}}
              mode="outlined"
              keyboardType="number-pad"
              maxLength={10}
              defaultValue={billing?.phone}
            />

            <View style={{flexDirection: 'row'}}>
              <View>
                <TextInput
                  placeholder={'OTP'}
                  style={{margin: 8, width: 255}}
                  mode="outlined"
                />
              </View>
              <View style={{marginTop: 14}}>
                <ButtonComponent
                  title={'Verify'}
                  backgroundColor="orange"
                  onPress={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </View>
            </View>
            <TextInput
              placeholder={'Full Name'}
              style={{margin: 8, backgroundColor: 'white'}}
              mode="outlined"
              defaultValue={billing?.first_name}
            />
            <TextInput
              placeholder={'Email'}
              style={{margin: 8}}
              mode="outlined"
              keyboardType="email-address"
              defaultValue={billing?.email}
            />
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', width: '90%'}}>
                Shipping address
              </Text>
            </View>
            <DeliveryAddressScreen />

            {/* <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  padding: 10,
                }}>
                Payment Method
              </Text>
              <TouchableOpacity
                style={[
                  styles.methodContainer,
                  selectedMethod === 'COD' && styles.selectedMethod,
                ]}
                onPress={() => handlePaymentMethodPress('COD')}>
                <Text
                  style={[
                    styles.methodText,
                    selectedMethod === 'COD' && styles.selectedMethodText,
                  ]}>
                  Cash on Delivary
                </Text>
              </TouchableOpacity>
              {showCODDetails && (
                <View style={styles.methodDetails}>
                  <Text style={styles.methodDetailsText}>Cash on Delivary</Text>
                </View>
              )}
            </View> */}
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  padding: 10,
                }}>
                Payment Method
              </Text>

              {/* {cartItems?.payment_methods.map((method: any, index: any) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.methodContainer,
                    selectedMethod === method && styles.selectedMethod,
                  ]}
                  onPress={() => handlePaymentMethodPress(method)}>
                  <Text
                    style={[
                      styles.methodText,
                      selectedMethod === method && styles.selectedMethodText,
                    ]}>
                    {method}
                  </Text>
                </TouchableOpacity>
              ))} */}
              <TouchableOpacity
                style={[
                  styles.methodContainer,
                  selectedMethod === 'COD' && styles.selectedMethod,
                ]}
                onPress={() => handlePaymentMethodPress('COD')}>
                <Text
                  style={[
                    styles.methodText,
                    selectedMethod === 'COD' && styles.selectedMethodText,
                  ]}>
                  Cash on Delivary
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 14}}>
              <ButtonComponent
                title={'Place Order'}
                backgroundColor="orange"
                width={380}
                onPress={() => onSubmitCheckout()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  methodText: {
    fontSize: 16,
    marginLeft: 10,
  },
  selectedMethod: {
    backgroundColor: '#F7B492',
    borderColor: '#F7B492',
  },
  selectedMethodText: {
    color: '#ffffff',
  },
  methodDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  methodDetailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
