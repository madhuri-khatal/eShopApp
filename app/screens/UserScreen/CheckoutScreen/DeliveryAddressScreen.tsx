import {View, Text} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native';
import {useCartContext} from '../../../context/CartContext';
import {TextInputController} from '../../../components/ui/TextInput';
import {useCheckoutContext} from '../../../context/CheckoutContext';

export default function DeliveryAddressScreen() {
  const {checkoutControl} = useCheckoutContext();
  const {cartItems} = useCartContext();
  const shipping = cartItems?.shipping_address;

  return (
    <>
      <ScrollView>
        <View>
          <TextInput
            placeholder={'India'}
            style={{margin: 8, backgroundColor: 'white', marginLeft:-10,width:900}}
            mode="outlined"
            defaultValue={'India'}
            disabled
          />

          <TextInputController
            control={checkoutControl}
            name={'state'}
            placeholder="State *"
            style={{margin: 8, backgroundColor: 'white', marginLeft:-10,width:900}}
            // errors={errors}
            keyboardType={'default'}
            isRequiredValue
            mode="outlined"
            // defaultValue={shipping?.state}
          />

          <TextInputController
            control={checkoutControl}
            name={'city'}
            placeholder="Town / City *"
            style={{margin: 8, backgroundColor: 'white', marginLeft:-10,width:900}}     // errors={errors}
            keyboardType={'default'}
            isRequiredValue
            mode="outlined"
            // defaultValue={shipping?.city}
          />

          <TextInputController
            control={checkoutControl}
            name={'address_1'}
            placeholder="Address line 1 *"
            style={{margin: 8, backgroundColor: 'white', marginLeft:-10,width:900}}   // errors={errors}
            keyboardType={'default'}
            isRequiredValue
            mode="outlined"
            // defaultValue={shipping?.address_1}
          />

          <TextInputController
            control={checkoutControl}
            name={'address_2'}
            placeholder="Address line 2"
            style={{margin: 8, backgroundColor: 'white', marginLeft:-10,width:900}}   keyboardType={'default'}
            isRequiredValue
            mode="outlined"
            // defaultValue={shipping?.address_2}
          />

          <TextInputController
            control={checkoutControl}
            name={'postcode *'}
            placeholder="Zip / PinCode"
            style={{margin: 8, backgroundColor: 'white', marginLeft:-10,width:900}}    keyboardType={'default'}
            isRequiredValue
            mode="outlined"
            // defaultValue={shipping?.postcode}
          />
        </View>
      </ScrollView>
    </>
  );
}
