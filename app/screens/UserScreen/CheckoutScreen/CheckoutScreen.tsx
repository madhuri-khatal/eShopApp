import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput, Text, useTheme, Button} from 'react-native-paper';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import {ScrollView} from 'react-native-gesture-handler';
import DeliveryAddressScreen from './DeliveryAddressScreen';
import {useNavigation} from '@react-navigation/native';
import {useCartContext} from '../../../context/CartContext';
import {useCheckoutContext} from '../../../context/CheckoutContext';
import {TextInputController} from '../../../components/ui/TextInput';
import OrderStackScreen from '../../../navigators/OrderStackScreen';
import PaymentMethod from '../../../components/Product/PaymentMethod';
import RNUpiPayment from 'react-native-upi-payment'
export default function CheckoutScreen(props: any) {
  const navigation: any = useNavigation();
  const {colors} = useTheme();
  const {cartItems} = useCartContext();
  const {
    onSubmitCheckout,
    checkoutControl,
    checkoutHandleSubmit,
    onCreateCustomer,
    customerData,
    onCallToTheCustomerAndCheckout,
  } = useCheckoutContext();

  const onPressToSubmit = async (formData: any) => {
    onCreateCustomer(formData);
    };
  const onPressToSubmitupipayment=async(formData:any)=>{
    onCreateCustomer(formData);
    paymentoptions()
  }


     const totalAmount=(cartItems?.totals?.total_price / 100).toLocaleString(
      'en-US',
      {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    );
  
     
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
  const billing = cartItems?.address;

// PAYMENT GATEWAY
  const paymentoptions=(()=>{
    RNUpiPayment.initializePayment({
      vpa: 'madhuribkhatal@okicici',
      payeeName: 'ShgeShop',
      amount: totalAmount,
      transactionRef: 'aasf-332-aoei-fn'
      // 
    }, successCallback, failureCallback);
  })

  function successCallback(data: any) {
  console.log( "sucessfully",data);
  }
  
  function failureCallback(data:any) {
    console.log( "faild",data);
 }

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
                       <TextInputController
              control={checkoutControl}
              name={'phone'}
              placeholder="Phone Number"
              style={{margin: 8, backgroundColor: 'white'}}
              // errors={errors}
              keyboardType={'default'}
              isRequiredValue
              mode="outlined"
              defaultValue={billing?.phone}
            />

            <View style={{flexDirection: 'row'}}>
             
            </View>
                       <TextInputController
              control={checkoutControl}
              name={'first_name'}
              placeholder="First Name"
              style={{margin: 8, backgroundColor: 'white'}}
              // errors={errors}
              keyboardType={'default'}
              isRequiredValue
              mode="outlined"
              defaultValue={billing?.first_name}
            />
            <TextInputController
              control={checkoutControl}
              name={'last_name'}
              placeholder="Last Name"
              style={{margin: 8, backgroundColor: 'white'}}
              // errors={errors}
              keyboardType={'default'}
              isRequiredValue
              mode="outlined"
              defaultValue={billing?.last_name}
            />
            <TextInputController
              control={checkoutControl}
              name={'email'}
              placeholder="Email"
              style={{margin: 8, backgroundColor: 'white'}}
              // errors={errors}
              keyboardType={'default'}
              isRequiredValue
              mode="outlined"
              defaultValue={billing?.email}
            />
            {/* <TextInput
              placeholder={'Email'}
              style={{margin: 8}}
              mode="outlined"
              keyboardType="email-address"
              defaultValue={billing?.email}
            /> */}
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
              {/* <PaymentMethod /> */}
              {/* <Button mode='contained-tonal' onPress={onPressToSubmitupipayment}> Upi Payment  </Button> */}
              <TouchableOpacity
                style={[
                  styles.methodContainer,
                                ]}
                                onPress={checkoutHandleSubmit(onPressToSubmitupipayment)}>
                <Text
                  style={[
                    styles.methodText,
                  
                  ]}>
                  Upi Payment 
                </Text>
              </TouchableOpacity>
             
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
              <Button
                style={{
                  width: '97%',
                  height: 50,
                  backgroundColor: '#f25616',
                  borderRadius: 10,
                  padding: 3,
                  justifyContent: 'center',
                }}
                mode="contained"
                onPress={checkoutHandleSubmit(onPressToSubmit)}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    fontSize: 17,
                    textTransform: 'capitalize',
                    color: '#ffffff',
                  }}>
                  Place Order
                </Text>
              </Button>
              {/* <ButtonComponent
                title={'Place Order'}
                backgroundColor="orange"
                width={380}
                // onPress={checkoutHandleSubmit((data: any) =>
                //   console.log('clicked', data),
                // )}
                // onPress={checkoutHandleSubmit(onSubmitCheckout)}
                // onPress={checkoutHandleSubmit(onCreateCustomer)}
                onPress={checkoutHandleSubmit(onPressToSubmit)}
                // onPress={() =>
                //   navigation.navigate(OrderStackScreen, {
                //     screen: 'OrderScreen',
                //     initial: false,
                //   })
                // }
              /> */}
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
