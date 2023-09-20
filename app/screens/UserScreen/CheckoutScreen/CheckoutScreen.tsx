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
  } = useCheckoutContext();

  const onPressToSubmit = async (formData: any) => {
    onCreateCustomer(formData);
    // if (customerData?.data?.customer?.role === 'customer') {
    //   onSubmitCheckout(formData);
    // } else {
    //   onCreateCustomer(formData);
    //   onSubmitCheckout(formData);
    // }
  };

  // const onPressToSubmit = async () => {
  //   // Assuming checkoutHandleSubmit returns a promise for both onSubmitCheckout and onCreateCustomer

  //   if (customerData?.data?.customer?.role === 'customer') {
  //     // Customer already exists, so just submit the order
  //     await checkoutHandleSubmit(onSubmitCheckout)();
  //   } else {
  //     // Create a new customer
  //     try {
  //       await checkoutHandleSubmit(onCreateCustomer)();

  //       // If customer creation is successful, proceed to submit the order
  //       await checkoutHandleSubmit(onSubmitCheckout)();
  //     } catch (error) {
  //       // Handle any errors that occur during customer creation
  //       console.error('Customer creation failed:', error);
  //       // You can add error handling logic here if needed
  //     }
  //   }
  // };

  // const onPressToSubmit = async () => {
  //   try {
  //     if (customerData?.data?.customer?.role === 'customer') {
  //       // Customer already exists, so just submit the order
  //       const orderResponse = await checkoutHandleSubmit(onSubmitCheckout)();

  //       // Process the orderResponse as needed
  //       console.log('Order placed:', orderResponse);
  //     } else {
  //       // Create a new customer
  //       const customerResponse = await checkoutHandleSubmit(onCreateCustomer)();

  //       // If customer creation is successful, proceed to submit the order
  //       if (customerResponse.data && customerResponse.data.customer) {
  //         const newCustomer = customerResponse.data.customer;

  //         // Set the customer's role to "guest"
  //         newCustomer.role = 'guest';

  //         // Update the order with customer details
  //         const orderData = {
  //           // Populate order details based on your response data
  //           // ...
  //           customer_id: newCustomer.id, // Associate the order with the customer
  //         };

  //         // Submit the order with updated customer details
  //         const orderResponse = await checkoutHandleSubmit(onSubmitCheckout)(orderData);

  //         // Process the orderResponse as needed
  //         console.log('Order placed:', orderResponse);
  //       }
  //     }
  //   } catch (error) {
  //     // Handle any errors that occur during customer creation or order submission
  //     console.error('Error:', error);
  //     // You can add specific error-handling logic here as needed
  //   }
  // };

  // const onPressToSubmit = async () => {
  //   if (customerData?.data?.customer?.role != 'customer') {
  //     // Call onCreateCustomer and wait for it to complete
  //     await checkoutHandleSubmit(onCreateCustomer)();

  //     // After onCreateCustomer completes, call onSubmitCheckout
  //     await checkoutHandleSubmit(onSubmitCheckout)();
  //   } else {
  //     // If the customer's role is not 'customer', only call onSubmitCheckout
  //     checkoutHandleSubmit(onSubmitCheckout)();
  //   }
  // };

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
            {/* <TextInputController
              placeholder={'Phone Number'}
              style={{margin: 8, backgroundColor: 'white'}}
              mode="outlined"
              keyboardType="number-pad"
              maxLength={10}
              defaultValue={billing?.phone}
            /> */}
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
              {/* <View>
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
              </View> */}
            </View>
            {/* <TextInput
              placeholder={'Full Name'}
              style={{margin: 8, backgroundColor: 'white'}}
              mode="outlined"
              defaultValue={billing?.first_name}
            /> */}
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
