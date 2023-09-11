import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput, Text, useTheme} from 'react-native-paper';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {ScrollView} from 'react-native-gesture-handler';
import DeliveryAddressScreen from './DeliveryAddressScreen';
import {useNavigation} from '@react-navigation/native';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
export default function CheckoutScreen(props: any) {
  const navigation: any = useNavigation();
  const {colors} = useTheme();
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
  return (
    <>
      <ScrollView>
        {/* <HeaderBar
          title="Product Screen"
          titleStyle={{color: colors.onSecondary}}
          backAction={() => navigation.goBack()}
        /> */}
        <View style={{marginVertical: 20, padding: 7}}>
          <View style={{flexDirection: 'row'}}>
            <EvilIcons
              name="spinner-2"
              style={{fontSize: 30, color: '#fa5f11'}}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Customer Information
            </Text>
          </View>

          <View style={{padding: 8}}>
            <TextInput
              label={'Phone Number'}
              style={{margin: 8}}
              mode="outlined"
              keyboardType="number-pad"
              maxLength={10}
            />

            <View style={{flexDirection: 'row'}}>
              <View>
                <TextInput
                  label={'OTP'}
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
              label={'Full Name'}
              style={{margin: 8}}
              mode="outlined"
            />
            <TextInput
              label={'Email'}
              style={{margin: 8}}
              mode="outlined"
              keyboardType="email-address"
            />
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', width: '90%'}}>
                Delivery address
              </Text>
              <Entypo name="location" style={{fontSize: 30}} />
            </View>
            <DeliveryAddressScreen />

            <View>
              {/* <PaymentMethod />
               */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  // width: '90%',
                  marginBottom: 10,
                  padding: 7,
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
            </View>
            <View style={{marginTop: 14}}>
              <ButtonComponent
                title={'Submit'}
                backgroundColor="orange"
                width={380}
                // onPress={() =>
                //   // navigation.navigate('OrderDetailScreen', {data: 'item'})
                //   navigation.navigate('DrawerStackNavigator', {
                //     screen: 'OrderDetailScreen',
                //     initial: false,
                //   })
                // }
                onPress={() =>
                  navigation.getParent('main').navigate('OrderScreen')
                }
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
