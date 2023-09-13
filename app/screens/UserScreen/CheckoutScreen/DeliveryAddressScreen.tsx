import {View, Text} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native';
import {useCartContext} from '../../../context/CartContext';

export default function DeliveryAddressScreen() {
  const {cartItems} = useCartContext();
  const shipping = cartItems?.shipping_address;

  return (
    <>
      <ScrollView>
        <View>
          <TextInput
            placeholder={'India'}
            style={{margin: 7}}
            mode="outlined"
            disabled
          />
          <TextInput
            placeholder={'State'}
            style={{margin: 7}}
            mode="outlined"
            defaultValue={shipping?.state}
          />
          <TextInput
            placeholder={'Town / City'}
            style={{margin: 7}}
            mode="outlined"
            defaultValue={shipping?.city}
          />
          <TextInput
            placeholder={'Address'}
            style={{margin: 7}}
            mode="outlined"
            defaultValue={shipping?.address_1}
          />
          <TextInput
            placeholder={'Zip / PinCode'}
            style={{margin: 8}}
            mode="outlined"
            keyboardType="number-pad"
            maxLength={6}
            defaultValue={shipping?.postcode}
          />
        </View>
      </ScrollView>
    </>
  );
}
