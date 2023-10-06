import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import DeliveryAddressScreen from './DeliveryAddressScreen';
import {useCartContext} from '../../../context/CartContext';
import {useCheckoutContext} from '../../../context/CheckoutContext';
import {TextInputController} from '../../../components/ui/TextInput';
// @ts-ignore
import RNUpiPayment from 'react-native-upi-payment';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderBar} from '../../../components/ui/HeaderBar';
export default function CheckoutScreen(props: any) {
  const navigation: any = useNavigation();
  const {cartItems} = useCartContext();
  const {
    checkoutControl,
    checkoutHandleSubmit,
    onCallToTheCustomerAndCheckout,
  } = useCheckoutContext();

  const onPressToSubmit = async (formData: any) => {
    // onCreateCustomer(formData);
    console.log("Formdata===============",formData);

    onCallToTheCustomerAndCheckout(formData, selectedMethod);
    // ,discountedTotalAmount)
  };
  const onPressToSubmitupipayment = async (formData: any) => {
    // onCreateCustomer(formData);
    onCallToTheCustomerAndCheckout(formData, selectedMethod);
    // ,discountedTotalAmount);
    paymentoptions();
  };

  const totalAmount = (cartItems?.totals?.total_price / 100).toLocaleString(
    'en-US',
    {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );

  const [selectedMethod, setSelectedMethod] = useState('');
  const [showCODDetails, setShowCODDetails] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountedTotalAmount, setDiscountedTotalAmount] = useState(
    cartItems?.totals?.total_price / 100,
  );

  const handlePaymentMethodPress = (method: any) => {
    setSelectedMethod(prevMethod => {
      if (prevMethod === method) {
        setShowCODDetails(false);
        return '';
      } else {
        setShowCODDetails(method === 'Cash on delivery');
        return method;
      }
    });
  };

  const billing = cartItems?.address;

  const paymentoptions = () => {
    RNUpiPayment.initializePayment(
      {
        vpa: '50627101@ubin',
        // vpa: 'madhuribkhatal@okicici',
        // vpa: 'bhidepurva123@okicici',
        payeeName: 'ShgeShop',
        amount: totalAmount,
        transactionRef: 'aasf-332-aoei-fn',
      },
      (data: any) => {
        if (data.status === 'SUCCESS') {
          successCallback(data);
        } else {
          failureCallback(data);
        }
      },
      failureCallback,
    );
  };

  function successCallback(data: any) {
    Alert.alert('Order Successfully placed');
    console.log('sucessfully', data);
  }
  function failureCallback(data: any) {
    Alert.alert('Order failed');
    console.log('faild', data);
  }

  const applyCouponCode = () => {
    const discount = 0.1; // 10% discount
    const newTotalAmount =
      (cartItems?.totals?.total_price / 100) * (1 - discount);
    setDiscountedTotalAmount(newTotalAmount);
  };

  return (
    <>
      <HeaderBar
        title="Checkout"
        backAction={() => navigation.goBack()}
        icon1="menu"
      />

      <ScrollView>
        <View style={{marginVertical: 20, padding: 7}}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', width: '90%'}}>
              Coupon Code
            </Text>
          </View>
          <View style={{padding: 8}}>
            <TextInputController
              placeholder="Enter coupon code"
              control={checkoutControl}
              style={{
                margin: 8,
                backgroundColor: 'white',
              }}
              name={'coupon_lines'}
              keyboardType={'default'}
              isRequiredValue
              mode="outlined"
              // defaultValue={billing?.phone}
              // value={couponCode}
              // onChangeText={text => setCouponCode(text)}
            />
            <Button
              mode="contained"
              onPress={applyCouponCode}
              style={{margin: 8, backgroundColor: '#f25616', borderRadius: 10}}>
              Apply Coupon
            </Button>
          </View> 
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
              keyboardType={'default'}
              isRequiredValue
              mode="outlined"
              defaultValue={billing?.phone}
            />

            <View style={{flexDirection: 'row'}}></View>
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

            <View style={{flexDirection: 'row', padding: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', width: '90%'}}>
                Shipping address
              </Text>
            </View>
            <DeliveryAddressScreen />

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

              <TouchableOpacity
                style={[
                  styles.methodContainer,
                  selectedMethod === 'upi' && styles.selectedMethod,
                ]}
                onPress={() => {
                  handlePaymentMethodPress('upi');
                  checkoutHandleSubmit(onPressToSubmitupipayment)();
                }}>
                <Text
                  style={[
                    styles.methodText,
                    selectedMethod === 'upi' && styles.selectedMethodText,
                  ]}>
                  Upi Payment
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.methodContainer,
                  selectedMethod === 'Cash on delivery' &&
                    styles.selectedMethod,
                ]}
                onPress={() => handlePaymentMethodPress('Cash on delivery')}>
                <Text
                  style={[
                    styles.methodText,
                    selectedMethod === 'Cash on delivery' &&
                      styles.selectedMethodText,
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
