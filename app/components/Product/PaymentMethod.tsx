import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Image} from 'react-native';

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showGooglePayDetails, setShowGooglePayDetails] = useState(false);
  const [showCreditCardDetails, setShowCreditCardDetails] = useState(false);

  const handlePaymentMethodPress = (method: any) => {
    if (selectedMethod === method) {
      setSelectedMethod(null);
    } else {
      setSelectedMethod(method);
    }

    if (method === 'googlePay') {
      setShowGooglePayDetails(!showGooglePayDetails);
      setShowCreditCardDetails(false);
    } else if (method === 'creditCard') {
      setShowCreditCardDetails(!showCreditCardDetails);
      setShowGooglePayDetails(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>

      <TouchableOpacity
        style={[
          styles.methodContainer,
          selectedMethod === 'creditCard' && styles.selectedMethod,
        ]}
        onPress={() => handlePaymentMethodPress('creditCard')}>
        <Image
          style={{width: 48, height: 48}}
          source={{
            uri: 'https://img.icons8.com/emoji/48/credit-card-emoji.png',
          }}
          alt="credit-card-emoji"
        />
        <Text
          style={[
            styles.methodText,
            selectedMethod === 'creditCard' && styles.selectedMethodText,
          ]}>
          Credit Card
        </Text>
      </TouchableOpacity>

      {showCreditCardDetails && (
        <View style={styles.methodDetails}>
          {/* Add Credit Card details UI here */}
          <Text style={styles.methodDetailsText}>
            Credit Card details and payment options
          </Text>
          {/* You can add more UI elements for payment options */}
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.methodContainer,
          selectedMethod === 'googlePay' && styles.selectedMethod,
        ]}
        onPress={() => handlePaymentMethodPress('googlePay')}>
        <Image
          style={{width: 48, height: 48}}
          source={{uri: 'https://img.icons8.com/color/48/google-logo.png'}}
          alt="google-logo"
        />

        <Text
          style={[
            styles.methodText,
            selectedMethod === 'googlePay' && styles.selectedMethodText,
          ]}>
          Google Pay
        </Text>
      </TouchableOpacity>

      {showGooglePayDetails && (
        <View style={styles.methodDetails}>
          {/* Add Google Pay details UI here */}
          <Text style={styles.methodDetailsText}>
            Google Pay details and payment options
          </Text>
          {/* You can add more UI elements for payment options */}
        </View>
      )}
    </View>
  );
};

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
    padding: 10,
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

export default PaymentMethod;
