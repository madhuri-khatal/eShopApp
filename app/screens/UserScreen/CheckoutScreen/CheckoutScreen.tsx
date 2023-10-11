import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
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
import { useProductContext } from '../../../context/ProductContext';
export default function CheckoutScreen(props: any) {
  const navigation: any = useNavigation();
  const {cartItems} = useCartContext();
  const {
    checkoutControl,
    checkoutHandleSubmit,
    onCallToTheCustomerAndCheckout,
    // applycoupon_lines
  } = useCheckoutContext();
const {couponData}=useProductContext();




  const onPressToSubmit = async (formData: any) => {
       onCallToTheCustomerAndCheckout(formData, selectedMethod, coupon_lines);
  };
  const onPressToSubmitupipayment = async (formData: any) => {
    // onCreateCustomer(formData);
    onCallToTheCustomerAndCheckout(formData, selectedMethod, coupon_lines);
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
  const [coupon_lines , setcoupon_lines] = useState(' ');
  const [discountedTotalAmount, setDiscountedTotalAmount] = useState(
    cartItems?.totals?.total_price / 100,
  );

  const handlecoupon_linesChange = (text: any) => {
    setcoupon_lines(text);
  };

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

  const applycoupon_lines = () => {
    if (!coupon_lines.trim()) {
      Alert.alert('Please enter a valid coupon code');
      return;
    }
      const matchingCoupon = couponData.find(coupon => coupon.code === coupon_lines);
  
    if (matchingCoupon) {
      const { amount, discount_type } = matchingCoupon;
      const totalAmount = cartItems?.totals?.total_price / 100;
        if (discount_type === 'percent') {
            const discountPercentage = amount / 100;
        const discountAmount = totalAmount * discountPercentage;
        const newTotalAmount = totalAmount - discountAmount;
        console.log("newTotalAmount========",newTotalAmount);
        setDiscountedTotalAmount(newTotalAmount);
       Alert.alert('Coupon applied successfully', `New Total Amount: ${newTotalAmount}`);
      } else if (discount_type === 'fixed_cart') {
         const newTotalAmount = totalAmount - amount;
        setDiscountedTotalAmount(newTotalAmount);
          Alert.alert('Coupon applied successfully', `New Total Amount: ${newTotalAmount}`);
      } else {
        Alert.alert('Invalid discount type');
      }
    } else {
      Alert.alert('Invalid coupon code');
    }
  };


  return (
    <>
      <HeaderBar title="" backAction={() => navigation.goBack()} icon1="menu" />

      <ScrollView>
        <View style={{marginVertical: 20, padding: 7}}>
         

          <TextInput
            placeholder="Enter coupon code"
            style={{
              margin: 8,
              backgroundColor: 'white',
            }}
                      keyboardType={'default'}
                       mode="outlined"
                  onChangeText={handlecoupon_linesChange}
          />
          <Button
            mode="contained"
            onPress={applycoupon_lines}
            style={{margin: 8, backgroundColor: '#f25616', borderRadius: 10}}>
            Apply Coupon
          </Button>

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
                  Cash on Delivery
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
    backgroundColor: '#F4f4f4',
    borderColor: '#F7B492',
  },
  selectedMethodText: {
    color: '#000000',
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
