import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Platform, Modal } from 'react-native';
import { Text, Button, TextInput, Divider, Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import DeliveryAddressScreen from './DeliveryAddressScreen';
import { useCartContext } from '../../../context/CartContext';
import { useCheckoutContext } from '../../../context/CheckoutContext';
import { TextInputController } from '../../../components/ui/TextInput';
import { useNavigation } from '@react-navigation/native';
import { HeaderBar } from '../../../components/ui/HeaderBar';
import { useProductContext } from '../../../context/ProductContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_KEY_ID } from '@env';

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export default function CheckoutScreen() {
  const navigation: any = useNavigation();
  const { cartItems } = useCartContext();
  const {
    checkoutControl,
    checkoutHandleSubmit,
    onCallToTheCustomerAndCheckout,
  } = useCheckoutContext();
  const { couponData } = useProductContext();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [coupon_lines, setcoupon_lines] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formDataToConfirm, setFormDataToConfirm] = useState<any>(null);
  const [discountedTotalAmount, setDiscountedTotalAmount] = useState(
    cartItems?.totals?.total_price / 100,
  );
  const [shippingcharges, setShippingcharges] = useState(
    cartItems?.totals?.total_shipping / 100,
  );
  const billing = cartItems?.address;


  const handlePayment = async (formData: any) => {
    if (Platform.OS !== 'android') {
      Alert.alert('Error', 'UPI payments are only supported on Android devices');
      return;
    }

    setIsProcessingPayment(true);

    try {
      if (!RAZORPAY_KEY_ID) {
        throw new Error('Razorpay key is not configured');
      }
      const subtotal = discountedTotalAmount || 0;
      const shippingCharges = cartItems?.totals?.total_shipping / 100 || 0;
     
      const totalAmount = subtotal + shippingCharges;
     
      if (!totalAmount || totalAmount <= 0) {
        throw new Error('Invalid payment amount');
      }
      const amountInPaisa = Math.round(totalAmount * 100);
     
      const productNames = cartItems?.items?.map((item: { name: any; }) => item.name).join(', ') || 'Order';
      const paymentDescription = `Payment of your ${productNames} Products`;

      const customerName = `${formData.first_name} ${formData.last_name}`.trim();
      const options = {
        description: paymentDescription,
        image: 'https://shgeshop.com/wp-content/uploads/2023/05/shgeshop_logo_BR2-1.png',
        currency: 'INR',
        key: RAZORPAY_KEY_ID,
        amount: amountInPaisa,
        name: 'SHGeShop',
        order_id: '',
        prefill: {
          email: formData.email || '',
          contact: formData.phone || '',
          name: customerName || 'Customer',
        },
        theme:{color:'#e95d2a'},
        // theme: { color: '#53a20e' },
        // retry: {
        //   enabled: true,
        //   max_count: 1,
        // },
        // send_sms_hash: true,
        // remember_customer: true,
        // external: {
        //   wallets: ['paytm', 'gpay', 'phonepe']
        // }
      };


      const paymentResponse = await RazorpayCheckout.open(options);
         if (paymentResponse.razorpay_payment_id) {
        await onCallToTheCustomerAndCheckout(
          formData,
          coupon_lines,
          paymentResponse.razorpay_payment_id
        );

        Alert.alert(
          'Payment Successful',
          'Your order has been placed successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('OrderSuccess'),
            },
          ]
        );
      }
    } catch (error: any) {
      console.error('Payment error:', {
        message: error.message,
        code: error.code,
        description: error.description,
        stack: error.stack
      });

      let errorMessage = 'Payment failed. Please try again.';

      if (error.code === 'PAYMENT_CANCELLED') {
        errorMessage = 'Payment was cancelled';
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error. Please check your internet connection';
      } else if (error.description) {
        errorMessage = error.description;
      }

      Alert.alert('Payment Failed', errorMessage);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleOrderPlacement = (formData: any) => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    // Set form data and show confirmation modal
    setFormDataToConfirm({
      ...formData,
      paymentMethod: selectedMethod,
      totalAmount: discountedTotalAmount,
      couponApplied: coupon_lines || 'No coupon applied'
    });
    setShowConfirmationModal(true);
  };

  const confirmAndProcessOrder = async () => {
    setShowConfirmationModal(false);

    try {
      if (selectedMethod === 'upi') {
        await handlePayment(formDataToConfirm);
      } else if (selectedMethod === 'Cash on delivery') {
        try {
          await onCallToTheCustomerAndCheckout(formDataToConfirm, selectedMethod, coupon_lines);
          Alert.alert(
            'Order Placed Successfully',
            'Your order has been placed successfully with Cash on Delivery',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('OrderSuccess'),
              },
            ]
          );
        } catch (error) {
          console.error('COD order error:', error);
          Alert.alert(
            'Order Failed',
            'Failed to place your order. Please try again.'
          );
        }
      }
    } catch (error) {
      console.error('Order placement error:', error);
      Alert.alert(
        'Error',
        'Something went wrong. Please try again.'
      );
    }
  };

  const handlePaymentMethodPress = (method: string) => {
    setSelectedMethod(method);
  };

  const handlecoupon_linesChange = (text: string) => {
    setcoupon_lines(text);
  };

  const applycoupon_lines = () => {
    if (!coupon_lines.trim()) {
      Alert.alert('Please enter a valid coupon code');
      return;
    }

    const matchingCoupon = couponData.find(
      coupon => coupon.code === coupon_lines,
    );

    if (matchingCoupon) {
      const { amount, discount_type } = matchingCoupon;
      const totalAmount = cartItems?.totals?.total_price / 100;

      if (discount_type === 'percent') {
        const discountPercentage = amount / 100;
        const discountAmount = totalAmount * discountPercentage;
        const newTotalAmount = totalAmount - discountAmount;
     
        setDiscountedTotalAmount(newTotalAmount);
        Alert.alert(
          'Coupon applied successfully',
          `Total Amount: ₹${newTotalAmount}`,
        );
      } else if (discount_type === 'fixed_cart') {
        const newTotalAmount = totalAmount - amount;
        setDiscountedTotalAmount(newTotalAmount);
        Alert.alert(
          'Coupon applied successfully',
          `Total Amount: ₹${newTotalAmount}`,
        );
      } else {
        Alert.alert('Invalid discount type');
      }
    } else {
      Alert.alert('Invalid coupon code');
    }
  };

  const ConfirmationModal = () => (
    <Modal
      visible={showConfirmationModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowConfirmationModal(false)}
    >
      <View style={styles.modalContainer}>
        <Card style={styles.modalCard}>
          <ScrollView>
            <Card.Title title="Order Confirmation" />
            <Card.Content>
              <Text style={styles.modalSectionTitle}>Customer Information:</Text>
              <Text>Name: {formDataToConfirm?.first_name} {formDataToConfirm?.last_name}</Text>
              <Text>Phone: {formDataToConfirm?.phone}</Text>
              <Text>Email: {formDataToConfirm?.email}</Text>

              <Divider style={styles.modalDivider} />

              <Text style={styles.modalSectionTitle}>Payment Details:</Text>
              <Text>Method: {selectedMethod}</Text>
              <Text>Total Amount: ₹{discountedTotalAmount}</Text>
              <Text>Coupon: {coupon_lines || 'No coupon applied'}</Text>
              <Text>Shipping Charges: ₹{shippingcharges}</Text>
              {selectedMethod === 'upi' && (
                <>
                  <Divider style={styles.modalDivider} />
                  <Text style={styles.modalSectionTitle}>UPI Payment Details:</Text>
                  <Text>Payment Gateway: Razorpay</Text>
                  <Text>Amount: ₹{discountedTotalAmount}</Text>
                  <Text>Shipping Charges: ₹{shippingcharges}</Text>
                  <Text>Sub Total Amount: ₹{discountedTotalAmount + shippingcharges}</Text>
                  {/* <Text>Amount in Paisa: {Math.round(discountedTotalAmount * 100)}</Text> */}
                </>
              )}

              <View style={styles.modalButtonContainer}>
                <Button
                  mode="contained"
                  onPress={() => {
                    setShowConfirmationModal(false);
                    navigation.navigate('CartStack', {
                      screen: 'CartScreen',
                    });
                  }}
                  style={[styles.modalButton, styles.cancelButton]}
                >
                  Edit Order
                </Button>
                <Button
                  mode="contained"
                  onPress={confirmAndProcessOrder}
                  style={[styles.modalButton, styles.confirmButton]}
                >
                  Confirm Order
                </Button>
              </View>
            </Card.Content>
          </ScrollView>
        </Card>
      </View>
    </Modal>
  );

  return (
    <>
      <HeaderBar title="Checkout" backAction={() => navigation.goBack()} icon1="menu" />
        <View style={{height:300,backgroundColor:'#fcaa6f',padding:15}}/> 
      <ScrollView style={{marginTop:-270,padding:20,marginBottom:30}}>
        <View style={styles.container}>
         
         
          {/* <Text
            style={styles.couponText}
            onPress={() => setShowCouponInput(!showCouponInput)}>
           Apply Coupon <MaterialCommunityIcons name="chevron-down-circle" color="#FC9114" size={28} />  
          </Text> */}
                  <TouchableOpacity
        style={styles.button}
        onPress={() => setShowCouponInput(!showCouponInput)}
        activeOpacity={0.7}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Apply Coupon</Text>
          <MaterialCommunityIcons
            name={showCouponInput ? "chevron-up-circle" : "chevron-down-circle"}
            color="#FC9114"
            size={28}
                      />
        </View>
      </TouchableOpacity>


          {showCouponInput && (
            <View style={styles.couponContainer}>
              <TextInput
                placeholder="Enter coupon code"
                style={styles.couponInput}
                keyboardType="default"
                mode="outlined"
                onChangeText={handlecoupon_linesChange}
              />
              <Button
                mode="contained"
                onPress={applycoupon_lines}
                style={styles.couponButton}>
                Apply Coupon
              </Button>
            </View>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Customer Information
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* <View style={{backgroundColor:"#f25616"}}> */}
            <TextInputController
              control={checkoutControl}
              name="phone"
              placeholder="Phone Number *"
              style={styles.input}
              keyboardType="numeric"
              isRequiredValue            
              mode="outlined"
              defaultValue={billing?.phone}
            />

            <TextInputController
              control={checkoutControl}
              name="first_name"
              placeholder="First Name *"
              style={styles.input}
              keyboardType="default"
              isRequiredValue
              mode="outlined"
              defaultValue={billing?.first_name}
            />

            <TextInputController
              control={checkoutControl}
              name="last_name"
              placeholder="Last Name *"
              style={styles.input}
              keyboardType="default"
              isRequiredValue
              mode="outlined"
              defaultValue={billing?.last_name}
            />

            <TextInputController
              control={checkoutControl}
              name="email"
              placeholder="Email *"
              style={styles.input}
              keyboardType="email-address"
              isRequiredValue
              mode="outlined"
              defaultValue={billing?.email}
            />
 {/* </View> */}
            <View style={styles.shippingHeader}>
              <Text style={styles.sectionTitle}>
                Shipping Address
              </Text>
            </View>

            <DeliveryAddressScreen />

            {/* <View style={styles.paymentSection}>
              <Text style={styles.sectionTitle}>Payment Method</Text>

              <TouchableOpacity
                style={[
                  styles.methodContainer,
                  selectedMethod === 'upi' && styles.selectedMethod,
                ]}
                onPress={() => handlePaymentMethodPress('upi')}>
                    <MaterialCommunityIcons
          name="credit-card"
          size={24}
                   color={selectedMethod === 'upi' ? '#fff' : '#54616c'}
        >
                <Text
                  style={[
                    styles.methodText,
                    selectedMethod === 'upi' && styles.selectedMethodText,
                  ]}>
                   UPI Payment
                </Text>
                </MaterialCommunityIcons>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.methodContainer,
                  selectedMethod === 'Cash on delivery' && styles.selectedMethod,
                ]}
                onPress={() => handlePaymentMethodPress('Cash on delivery')}>
                   <MaterialCommunityIcons
          name="cash"
          size={28}
          color={selectedMethod === 'Cash on delivery' ? '#fff' : '#54616c'}
        >
                <Text
                  style={[
                    styles.methodText,
                    selectedMethod === 'Cash on delivery' && styles.selectedMethodText,
                  ]}>
                  Cash on Delivery
                </Text>
                </MaterialCommunityIcons>
              </TouchableOpacity>
            </View> */}

<View style={styles.paymentSection}>
  <Text style={styles.sectionTitle}>Payment Method</Text>
  
  <TouchableOpacity
    style={[
      styles.methodContainer,
      selectedMethod === 'upi' && styles.selectedMethod,
    ]}
    onPress={() => handlePaymentMethodPress('upi')}>
    <View style={styles.methodContent}>
      <MaterialCommunityIcons
        name="credit-card"
        size={24}
        color={selectedMethod === 'upi' ? '#fff' : '#54616c'}
      />
      <Text
        style={[
          styles.methodText,
          selectedMethod === 'upi' && styles.selectedMethodText,
        ]}>
        UPI Payment
      </Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.methodContainer,
      selectedMethod === 'Cash on delivery' && styles.selectedMethod,
    ]}
    onPress={() => handlePaymentMethodPress('Cash on delivery')}>
    <View style={styles.methodContent}>
      <MaterialCommunityIcons
        name="cash"
        size={28}
        color={selectedMethod === 'Cash on delivery' ? '#fff' : '#54616c'}
      />
      <Text
        style={[
          styles.methodText,
          selectedMethod === 'Cash on delivery' && styles.selectedMethodText,
        ]}>
        Cash on Delivery
      </Text>
    </View>
  </TouchableOpacity>
</View>

            <Divider />

            <View style={styles.orderButtonContainer}>
              <Button
                style={styles.placeOrderButton}
                mode="contained"
                disabled={isProcessingPayment}
                onPress={checkoutHandleSubmit(handleOrderPlacement)}>
                <Text style={styles.placeOrderButtonText}>
                  {isProcessingPayment ? 'Processing...' : 'Place Order'}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      <ConfirmationModal />
     
    </>
  );
}

const styles = StyleSheet.create({
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12, // Adds space between icon and text
  },
  container: {
    
    padding: 7,
    backgroundColor: '#ffffff',
    borderRadius:40,
    marginBottom:60
  },
  couponText: {
    fontSize: 18,
    padding: 16,
    color: '#FC9114',
    fontWeight:'bold'
  },
  button: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#FC9114',
    fontWeight: '500',
    marginRight: 8,
  },
  couponContainer: {
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  couponInput: {
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  couponButton: {
    margin: 8,
    backgroundColor: '#f25616',
    borderRadius: 10,
    paddingVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
    color: '#FC9114',
  },
  formContainer: {
    padding: 8,
  },
  input: {
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  shippingHeader: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
  },
  paymentSection: {
    marginTop: 15,
    marginBottom: 10,
  },
  methodContainer: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    borderColor: '#54616c',
    borderWidth: 0.8,
    marginBottom: 12,
    marginHorizontal: 8,
  },
  methodText: {
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
    color: '#54616c',
    textAlign: 'center',
  },
  selectedMethod: {
    backgroundColor: '#007c00',
    borderColor: '#007c00',
  },
  selectedMethodText: {
    color: '#ffffff',
  },
  orderButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  placeOrderButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#f25616',
    borderRadius: 5,
    justifyContent: 'center',
    elevation: 2,
  },
  placeOrderButtonText: {
    fontWeight: 'bold',
    fontSize: 17,
    textTransform: 'capitalize',
    color: '#ffffff',
    textAlign: 'center',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },

  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333333',
  },
  modalDivider: {
    marginVertical: 15,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    marginBottom: 10,
  },
  modalButton: {
    width: '45%',
    borderRadius: 5,
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: '#f25616',
    // backgroundColor: '#e9955a',
  },
  confirmButton: {
    backgroundColor: '#53a20e',
  },
  // Additional styles for text elements in modal
  modalText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginRight: 5,
  },
  modalValue: {
    fontSize: 14,
    color: '#333333',
  },
  // Error state styles
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginLeft: 8,
    marginTop: 2,
  },
  errorInput: {
    borderColor: '#ff0000',
    borderWidth: 1,
  },
  // Loading state styles
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333333',
  },
  // Additional container styles
  // contentContainer: {
  //   paddingBottom: 20,
  // },
  addressContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  // Heading styles
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444444',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  // Price display styles
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    borderRadius: 5,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666666',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  // Summary section styles
  summaryContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f25616',
  },
  // Badge styles
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#f25616',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Input field styles
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
    marginLeft: 8,
  },
  requiredStar: {
    color: '#ff0000',
    fontSize: 14,
  },
  // Button variants
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f25616',
  },
  secondaryButtonText: {
    color: '#f25616',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  disabledButtonText: {
    color: '#666666',
  },
});































// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, TouchableOpacity, Alert, Platform, Modal, ImageBackground } from 'react-native';
// import { Text, Button, TextInput, Divider, Card } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
// import DeliveryAddressScreen from './DeliveryAddressScreen';
// import { useCartContext } from '../../../context/CartContext';
// import { useCheckoutContext } from '../../../context/CheckoutContext';
// import { TextInputController } from '../../../components/ui/TextInput';
// import { useNavigation } from '@react-navigation/native';
// import { HeaderBar } from '../../../components/ui/HeaderBar';
// import { useProductContext } from '../../../context/ProductContext';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import RazorpayCheckout from 'react-native-razorpay';
// import { RAZORPAY_KEY_ID } from '@env';

// interface RazorpaySuccessResponse {
//   razorpay_payment_id: string;
//   razorpay_order_id?: string;
//   razorpay_signature?: string;
// }

// export default function CheckoutScreen() {
//   const navigation: any = useNavigation();
//   const { cartItems } = useCartContext();
//   const {
//     checkoutControl,
//     checkoutHandleSubmit,
//     onCallToTheCustomerAndCheckout,
//   } = useCheckoutContext();
//   const { couponData } = useProductContext();

//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//   const [selectedMethod, setSelectedMethod] = useState('');
//   const [coupon_lines, setcoupon_lines] = useState('');
//   const [showCouponInput, setShowCouponInput] = useState(false);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [formDataToConfirm, setFormDataToConfirm] = useState<any>(null);
//   const [discountedTotalAmount, setDiscountedTotalAmount] = useState(
//     cartItems?.totals?.total_price / 100,
//   );
//   const [shippingcharges, setShippingcharges] = useState(
//     cartItems?.totals?.total_shipping / 100,
//   );
//   const billing = cartItems?.address;


//   const handlePayment = async (formData: any) => {
//     if (Platform.OS !== 'android') {
//       Alert.alert('Error', 'UPI payments are only supported on Android devices');
//       return;
//     }

//     setIsProcessingPayment(true);

//     try {
//       if (!RAZORPAY_KEY_ID) {
//         throw new Error('Razorpay key is not configured');
//       }
//       const subtotal = discountedTotalAmount || 0;
//       const shippingCharges = cartItems?.totals?.total_shipping / 100 || 0;
     
//       const totalAmount = subtotal + shippingCharges;
     
//       if (!totalAmount || totalAmount <= 0) {
//         throw new Error('Invalid payment amount');
//       }
//       const amountInPaisa = Math.round(totalAmount * 100);
     
//       const productNames = cartItems?.items?.map((item: { name: any; }) => item.name).join(', ') || 'Order';
//       const paymentDescription = `Payment of your ${productNames} Products`;

//       const customerName = `${formData.first_name} ${formData.last_name}`.trim();
//       const options = {
//         description: paymentDescription,
//         image: 'https://shgeshop.com/wp-content/uploads/2023/05/shgeshop_logo_BR2-1.png',
//         currency: 'INR',
//         key: RAZORPAY_KEY_ID,
//         amount: amountInPaisa,
//         name: 'SHGeShop',
//         order_id: '',
//         prefill: {
//           email: formData.email || '',
//           contact: formData.phone || '',
//           name: customerName || 'Customer',
//         },
//         theme: { color: '#53a20e' },
//         // retry: {
//         //   enabled: true,
//         //   max_count: 1,
//         // },
//         // send_sms_hash: true,
//         // remember_customer: true,
//         // external: {
//         //   wallets: ['paytm', 'gpay', 'phonepe']
//         // }
//       };


//       const paymentResponse = await RazorpayCheckout.open(options);
//          if (paymentResponse.razorpay_payment_id) {
//         await onCallToTheCustomerAndCheckout(
//           formData,
//           coupon_lines,
//           paymentResponse.razorpay_payment_id
//         );

//         Alert.alert(
//           'Payment Successful',
//           'Your order has been placed successfully!',
//           [
//             {
//               text: 'OK',
//               onPress: () => navigation.navigate('OrderSuccess'),
//             },
//           ]
//         );
//       }
//     } catch (error: any) {
//       console.error('Payment error:', {
//         message: error.message,
//         code: error.code,
//         description: error.description,
//         stack: error.stack
//       });

//       let errorMessage = 'Payment failed. Please try again.';

//       if (error.code === 'PAYMENT_CANCELLED') {
//         errorMessage = 'Payment was cancelled';
//       } else if (error.code === 'NETWORK_ERROR') {
//         errorMessage = 'Network error. Please check your internet connection';
//       } else if (error.description) {
//         errorMessage = error.description;
//       }

//       Alert.alert('Payment Failed', errorMessage);
//     } finally {
//       setIsProcessingPayment(false);
//     }
//   };

//   const handleOrderPlacement = (formData: any) => {
//     console.log("lcikiskskssiissi")
//     if (!selectedMethod) {
//       Alert.alert('Error', 'Please select a payment method');
//       return;
//     }

//     // Set form data and show confirmation modal
//     setFormDataToConfirm({
//       ...formData,
//       paymentMethod: selectedMethod,
//       totalAmount: discountedTotalAmount,
//       couponApplied: coupon_lines || 'No coupon applied'
//     });
//     setShowConfirmationModal(true);
//   };

//   const confirmAndProcessOrder = async () => {
//     setShowConfirmationModal(false);

//     try {
//       if (selectedMethod === 'upi') {
//         await handlePayment(formDataToConfirm);
//       } else if (selectedMethod === 'Cash on delivery') {
//         try {
//           await onCallToTheCustomerAndCheckout(formDataToConfirm, selectedMethod, coupon_lines);
//           Alert.alert(
//             'Order Placed Successfully',
//             'Your order has been placed successfully with Cash on Delivery',
//             [
//               {
//                 text: 'OK',
//                 onPress: () => navigation.navigate('OrderSuccess'),
//               },
//             ]
//           );
//         } catch (error) {
//           console.error('COD order error:', error);
//           Alert.alert(
//             'Order Failed',
//             'Failed to place your order. Please try again.'
//           );
//         }
//       }
//     } catch (error) {
//       console.error('Order placement error:', error);
//       Alert.alert(
//         'Error',
//         'Something went wrong. Please try again.'
//       );
//     }
//   };

//   const handlePaymentMethodPress = (method: string) => {
//     setSelectedMethod(method);
//   };

//   const handlecoupon_linesChange = (text: string) => {
//     setcoupon_lines(text);
//   };

//   const applycoupon_lines = () => {
//     if (!coupon_lines.trim()) {
//       Alert.alert('Please enter a valid coupon code');
//       return;
//     }

//     const matchingCoupon = couponData.find(
//       coupon => coupon.code === coupon_lines,
//     );

//     if (matchingCoupon) {
//       const { amount, discount_type } = matchingCoupon;
//       const totalAmount = cartItems?.totals?.total_price / 100;

//       if (discount_type === 'percent') {
//         const discountPercentage = amount / 100;
//         const discountAmount = totalAmount * discountPercentage;
//         const newTotalAmount = totalAmount - discountAmount;
     
//         setDiscountedTotalAmount(newTotalAmount);
//         Alert.alert(
//           'Coupon applied successfully',
//           `Total Amount: ₹${newTotalAmount}`,
//         );
//       } else if (discount_type === 'fixed_cart') {
//         const newTotalAmount = totalAmount - amount;
//         setDiscountedTotalAmount(newTotalAmount);
//         Alert.alert(
//           'Coupon applied successfully',
//           `Total Amount: ₹${newTotalAmount}`,
//         );
//       } else {
//         Alert.alert('Invalid discount type');
//       }
//     } else {
//       Alert.alert('Invalid coupon code');
//     }
//   };

//   const ConfirmationModal = () => (
//     <Modal
//       visible={showConfirmationModal}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={() => setShowConfirmationModal(false)}
//     >
//       <View style={styles.modalContainer}>
//         <Card style={styles.modalCard}>
//           <ScrollView>
//             <Card.Title title="Order Confirmation" />
//             <Card.Content>
//               <Text style={styles.modalSectionTitle}>Customer Information:</Text>
//               <Text>Name: {formDataToConfirm?.first_name} {formDataToConfirm?.last_name}</Text>
//               <Text>Phone: {formDataToConfirm?.phone}</Text>
//               <Text>Email: {formDataToConfirm?.email}</Text>

//               <Divider style={styles.modalDivider} />

//               <Text style={styles.modalSectionTitle}>Payment Details:</Text>
//               <Text>Method: {selectedMethod}</Text>
//               <Text>Total Amount: ₹{discountedTotalAmount}</Text>
//               <Text>Coupon: {coupon_lines || 'No coupon applied'}</Text>
//               <Text>Shipping Charges: ₹{shippingcharges}</Text>
//               {selectedMethod === 'upi' && (
//                 <>
//                   <Divider style={styles.modalDivider} />
//                   <Text style={styles.modalSectionTitle}>UPI Payment Details:</Text>
//                   <Text>Payment Gateway: Razorpay</Text>
//                   <Text>Amount: ₹{discountedTotalAmount}</Text>
//                   <Text>Shipping Charges: ₹{shippingcharges}</Text>
//                   <Text>Sub Total Amount: ₹{discountedTotalAmount + shippingcharges}</Text>
//                   {/* <Text>Amount in Paisa: {Math.round(discountedTotalAmount * 100)}</Text> */}
//                 </>
//               )}

//               <View style={styles.modalButtonContainer}>
//                 <Button
//                   mode="contained"
//                   onPress={() => {
//                     setShowConfirmationModal(false);
//                     navigation.navigate('CartStack', {
//                       screen: 'CartScreen',
//                     });
//                   }}
//                   style={[styles.modalButton, styles.cancelButton]}
//                 >
//                   Edit Order
//                 </Button>
//                 <Button
//                   mode="contained"
//                   onPress={confirmAndProcessOrder}
//                   style={[styles.modalButton, styles.confirmButton]}
//                 >
//                   Confirm Order
//                 </Button>
//               </View>
//             </Card.Content>
//           </ScrollView>
//         </Card>
//       </View>
//     </Modal>
//   );

//   return (
//     <>
//       <HeaderBar title="Checkout" backAction={() => navigation.goBack()} icon1="menu" />
//         {/* <View style={{height:300,
//           backgroundColor:'#fcaa6f',
//           padding:15}}/>  */}
       
//       {/* <ImageBackground
//       source={require('../../../../assets/image/login.jpg')} // Replace with your image path
//       style={styles.background}
//       // resizeMode="cover" // Adjust the image to cover the whole screen
//     > */}
//       <ScrollView style={{marginTop:10,padding:20,marginBottom:30,
//         // backgroundColor:'#f9e3cd'
//         backgroundColor:'#ffffff'
//         }}>
//         <View style={styles.container}>
         
         
//           {/* <Text
//             style={styles.couponText}
//             onPress={() => setShowCouponInput(!showCouponInput)}>
//            Apply Coupon <MaterialCommunityIcons name="chevron-down-circle" color="#FC9114" size={28} />  
//           </Text> */}
//                   <TouchableOpacity
//         style={styles.button}
//         onPress={() => setShowCouponInput(!showCouponInput)}
//         activeOpacity={0.7}
//       >
//         <View style={styles.contentContainer}>
//           <Text style={styles.text}>Apply Coupon</Text>
//           <MaterialCommunityIcons
//             name={showCouponInput ? "chevron-up-circle" : "chevron-down-circle"}
//             color="#FC9114"
//             size={28}
//                       />
//         </View>
//       </TouchableOpacity>


//           {showCouponInput && (
//             <View style={styles.couponContainer}>
              
//               <TextInput
//                 placeholder="Enter coupon code"
//                 // style={styles.couponInput}
//                 style={{margin: 8, backgroundColor: 'white', 
//                   marginLeft:-5,
//                   width:350,
                  
//                 }}  
//                 keyboardType="default"
//                 mode="outlined"
//                 onChangeText={handlecoupon_linesChange}
//               />
//               <Button
//                 mode="contained"
//                 onPress={applycoupon_lines}
//                 style={styles.couponButton}>
//                 Apply Coupon
//               </Button>
//             </View>
//           )}

//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>
//               Customer Information
//             </Text>
//           </View>

//           <View style={styles.formContainer}>
//             <View 
//             style={{
//     //           backgroundColor:"#ffffff",padding:10,borderRadius:15, justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: "#ffffff",
//     padding: 10,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: "#000", // Shadow color for iOS
//     shadowOffset: { width: 2, height: 2 }, // Offset for shadow
//     shadowOpacity: 0.15, // Shadow transparency
//     shadowRadius: 3.84, // Shadow blur
//     elevation: 5,
//     }}>
//             <TextInputController
//               control={checkoutControl}
//               name="phone"
//               placeholder="Phone Number *"
//               // style={styles.input}
//               style={{margin: 8, 
//                 // backgroundColor: 'white', 
//                 // marginLeft:-5,
//                 width:300,
//                 borderColor:'white'
//               }}
//               keyboardType="numeric"
//               isRequiredValue            
//               mode="outlined"
//               defaultValue={billing?.phone}
//             />

//             <TextInputController
//               control={checkoutControl}
//               name="first_name"
//               placeholder="First Name *"
//               // style={styles.input}
//               style={{margin: 8, backgroundColor: 'white', 
//                 // marginLeft:-5,
//                 width:300
//                 // width:350
//               }}
//               keyboardType="default"
//               isRequiredValue
//               mode="outlined"
//               defaultValue={billing?.first_name}
//             />

//             <TextInputController
//               control={checkoutControl}
//               name="last_name"
//               placeholder="Last Name *"
//               // style={styles.input}
//               style={{margin: 8, backgroundColor: 'white', 
//                 // marginLeft:-5,
//                 width:300
//                 // width:350
//               }} 
//               keyboardType="default"
//               isRequiredValue
//               mode="outlined"
//               defaultValue={billing?.last_name}
//             />

//             <TextInputController
//               control={checkoutControl}
//               name="email"
//               placeholder="Email *"
//               // style={styles.input}
//               style={{margin: 8, backgroundColor: 'white', 
//                 // marginLeft:-5,
//                 width:300
//                 // width:350,
//                             }}   
//                      keyboardType="email-address"
//               isRequiredValue
//               mode="outlined"
//               defaultValue={billing?.email}
//             />
//  </View>
//             <View style={styles.shippingHeader}>
//               <Text style={styles.sectionTitle}>
//                 Shipping Address
//               </Text>
//             </View>
//             <View 
//             style={{
//     //           backgroundColor:"#ffffff",padding:10,borderRadius:15, justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: "#ffffff",
//     padding: 10,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: "#000", // Shadow color for iOS
//     shadowOffset: { width: 2, height: 2 }, // Offset for shadow
//     shadowOpacity: 0.25, // Shadow transparency
//     shadowRadius: 3.84, // Shadow blur
//     elevation: 5,
//     }}>
//             <DeliveryAddressScreen />
// </View>
// <View style={styles.paymentSection}>
//   <Text style={styles.sectionTitle}>Payment Method</Text>
//   <View style={styles.paymentContainer}>
//     <View style={styles.buttonRow}>
//       <TouchableOpacity
//         style={[
//           styles.methodButton,
//           selectedMethod === 'upi' && styles.selectedMethod,
//         ]}
//         onPress={() => handlePaymentMethodPress('upi')}>
        // <MaterialCommunityIcons
        //   name="credit-card"
        //   size={24}
        //   color={selectedMethod === 'upi' ? '#fff' : '#54616c'}
        // />
//         <Text
//           style={[
//             styles.methodText,
//             selectedMethod === 'upi' && styles.selectedMethodText,
//           ]}>
//           UPI Payment
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.methodButton,
//           selectedMethod === 'Cash on delivery' && styles.selectedMethod,
//         ]}
//         onPress={() => handlePaymentMethodPress('Cash on delivery')}>
//         <MaterialCommunityIcons
//           name="cash"
//           size={24}
//           color={selectedMethod === 'Cash on delivery' ? '#fff' : '#54616c'}
//         />
//         <Text
//           style={[
//             styles.methodText,
//             selectedMethod === 'Cash on delivery' && styles.selectedMethodText,
//           ]}>
//             COD
//           {/* Cash on Delivery */}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// </View>

//             {/* <View style={styles.paymentSection}>
//               <Text style={styles.sectionTitle}>Payment Method</Text>
//               <View 
//             style={{
//     //           backgroundColor:"#ffffff",padding:10,borderRadius:15, justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: "#ffffff",
//     padding: 10,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: "#edeae7", // Shadow color for iOS
//     shadowOffset: { width: 2, height: 2 }, // Offset for shadow
//     shadowOpacity: 0.15, // Shadow transparency
//     shadowRadius: 3.84, // Shadow blur
//     elevation: 5,
//     }}>
//               <TouchableOpacity
//                 style={[
//                   styles.methodContainer,
//                   selectedMethod === 'upi' && styles.selectedMethod,
//                 ]}
//                 onPress={() => handlePaymentMethodPress('upi')}>
//                 <Text
//                   style={[
//                     styles.methodText,
//                     selectedMethod === 'upi' && styles.selectedMethodText,
//                   ]}>
//                   UPI Payment
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.methodContainer,
//                   selectedMethod === 'Cash on delivery' && styles.selectedMethod,
//                 ]}
//                 onPress={() => handlePaymentMethodPress('Cash on delivery')}>
//                 <Text
//                   style={[
//                     styles.methodText,
//                     selectedMethod === 'Cash on delivery' && styles.selectedMethodText,
//                   ]}>
//                   Cash on Delivery
//                 </Text>
//               </TouchableOpacity>
//               </View>
//             </View> */}

//             <Divider />

//             <View style={styles.orderButtonContainer}>
//               <Button
//                 style={styles.placeOrderButton}
//                 mode="contained"
//                 disabled={isProcessingPayment}
//                 onPress={checkoutHandleSubmit(handleOrderPlacement)}>
//                 <Text style={styles.placeOrderButtonText}>
//                   {isProcessingPayment ? 'Processing...' : 'Place Order'}
//                 </Text>
//               </Button>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//       <ConfirmationModal />
//       {/* </ImageBackground> */}
//     </>
//   );
// }

// const styles = StyleSheet.create({

//   paymentSection: {
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   paymentContainer: {
//     backgroundColor: '#ffffff',
//     padding: 10,
//     borderRadius: 15,
//     shadowColor: '#edeae7',
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     gap: 10,
//   },
//   methodButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 15,
//     borderRadius: 8,
//     backgroundColor: '#f2f2f2',
//     borderColor: '#54616c',
//     borderWidth: 0.8,
//   },
//   selectedMethod: {
//     backgroundColor: '#007c00',
//     borderColor: '#007c00',
//   },
//   methodText: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginLeft: 8,
//     color: '#54616c',
//     textAlign: 'center',
//   },
//   selectedMethodText: {
//     color: '#ffffff',
//   },
//   sectionTitle: {
//     fontSize: 27,
//     fontWeight: '700',
//     color: '#54616c',
//     marginBottom: 15,
//   },
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   container: {
    
//     padding: 7,
//     // backgroundColor: '#ffffff',
//     borderRadius:40,
//     marginBottom:60
//   },
//   couponText: {
//     fontSize: 18,
//     padding: 16,
//     color: '#FC9114',
//     fontWeight:'bold'
//   },
//   button: {
//     padding: 10,
//     borderRadius: 15,
//     backgroundColor: '#fff',
    
//   },
//   contentContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 18,
//     color: '#FC9114',
//     fontWeight: '500',
//     marginRight: 8,
//   },
//   couponContainer: {
//     marginBottom: 10,
//     paddingHorizontal: 5,
//   },
//   couponInput: {
//     margin: 8,
//     backgroundColor: 'white',
//     borderRadius: 5,
//   },
//   couponButton: {
//     margin: 8,
//     // backgroundColor: '#f25616',
//      // backgroundColor: '#f25616',
//      boder:'5px Solid #f25616' ,
//      backgroundColor:'#FF840B',
//     borderRadius: 10,
//     paddingVertical: 8,
//   marginLeft:-10,
//     width:360
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     marginTop: 15,
//   },
//   // sectionTitle: {
//   //   fontSize: 27,
//   //   fontWeight: '700',
//   //   // marginBottom: 10,
//   //   // padding: 10,
//   //   // color: '#FC9114',
//   //   color:'#54616c'
//   // },
//   formContainer: {
//     padding: 8,
//   },
//   input: {
//     margin: 8,
//     marginLeft:-10,
//     // marginRight:-10,
//     // padding:2,
//     width:600,
//     backgroundColor: 'white',
//     borderRadius: 5,

//   },
//   shippingHeader: {
//     flexDirection: 'row',
//     padding: 10,
//     marginTop: 10,
//   },
//   // paymentSection: {
//   //   marginTop: 15,
//   //   marginBottom: 10,
//   // },
//   methodContainer: {
//     alignItems: 'center',
//     padding: 15,
//     borderRadius: 5,
//     justifyContent: 'center',
//     backgroundColor: '#f2f2f2',
//     borderColor: '#54616c',
//     // borderWidth: 0.8,
//     marginBottom: 12,
//     // marginHorizontal: 8,
//     marginTop:10,
//     width:350,
//     marginLeft:-10
//   },
//   // methodText: {
//   //   fontSize: 17,
//   //   fontWeight: '700',
//   //   marginLeft: 10,
//   //   color: '#54616c',
//   //   textAlign: 'center',
//   // },
//   // selectedMethod: {
//   //   backgroundColor: '#007c00',
//   //   borderColor: '#007c00',
//   // },
//   // selectedMethodText: {
//   //   color: '#ffffff',
//   // },
//   orderButtonContainer: {
//     marginTop: 20,
//     marginBottom: 10,
//     paddingHorizontal: 8,
//   },
//   placeOrderButton: {
//     // width: '100%',
//     height: 45,
//     // backgroundColor: '#f25616',
//     boder:'5px Solid #f25616' ,
//     backgroundColor:'#FF840B',
//     borderRadius: 5,
//     justifyContent: 'center',
//     elevation: 2,
//     width:350,
//     marginLeft:-17
//   },
//   placeOrderButtonText: {
//     fontWeight: 'bold',
//     fontSize: 17,
//     textTransform: 'capitalize',
//     color: '#ffffff',
//     textAlign: 'center',
//   },
//   // Modal Styles
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 20,
//   },
//   modalCard: {
//     width: '100%',
//     maxHeight: '80%',
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     padding: 15,
//     elevation: 5,
//   },

//   modalSectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     color: '#54616c',
    
//   },
//   modalDivider: {
//     marginVertical: 15,
//     height: 1,
//     backgroundColor: '#e0e0e0',
//   },
//   modalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 25,
//     marginBottom: 10,
//   },
//   modalButton: {
//     width: '45%',
//     borderRadius: 5,
//     paddingVertical: 8,
//   },
//   cancelButton: {
//     backgroundColor: '#f25616',
//     // backgroundColor: '#e9955a',
//   },
//   confirmButton: {
//     backgroundColor: '#53a20e',
//   },
//   // Additional styles for text elements in modal
//   modalText: {
//     fontSize: 14,
//     color: '#333333',
//     marginBottom: 5,
//   },
//   modalLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#666666',
//     marginRight: 5,
//   },
//   modalValue: {
//     fontSize: 14,
//     color: '#333333',
//   },
//   // Error state styles
//   errorText: {
//     color: '#ff0000',
//     fontSize: 12,
//     marginLeft: 8,
//     marginTop: 2,
//   },
//   errorInput: {
//     borderColor: '#ff0000',
//     borderWidth: 1,
//   },
//   // Loading state styles
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 999,
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#333333',
//   },
//   // Additional container styles
//   // contentContainer: {
//   //   paddingBottom: 20,
//   // },
//   addressContainer: {
//     marginTop: 10,
//     marginBottom: 15,
//   },
//   // Heading styles
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginVertical: 15,
//     paddingHorizontal: 10,
//   },
//   subheading: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#444444',
//     marginVertical: 10,
//     paddingHorizontal: 10,
//   },
//   // Price display styles
//   priceContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     backgroundColor: '#f9f9f9',
//     marginVertical: 10,
//     borderRadius: 5,
//   },
//   priceLabel: {
//     fontSize: 16,
//     color: '#666666',
//   },
//   priceValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333333',
//   },
//   // Summary section styles
//   summaryContainer: {
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 8,
//     marginHorizontal: 8,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 10,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 5,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   summaryValue: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333333',
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   totalLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   totalValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#f25616',
//   },
//   // Badge styles
//   badge: {
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     backgroundColor: '#f25616',
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   badgeText: {
//     color: '#ffffff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   // Input field styles
//   inputContainer: {
//     marginBottom: 15,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 5,
//     marginLeft: 8,
//   },
//   requiredStar: {
//     color: '#ff0000',
//     fontSize: 14,
//   },
//   // Button variants
//   secondaryButton: {
//     backgroundColor: '#ffffff',
//     borderWidth: 1,
//     borderColor: '#f25616',
//   },
//   secondaryButtonText: {
//     color: '#f25616',
//   },
//   disabledButton: {
//     backgroundColor: '#cccccc',
//   },
//   disabledButtonText: {
//     color: '#666666',
//   },
// });