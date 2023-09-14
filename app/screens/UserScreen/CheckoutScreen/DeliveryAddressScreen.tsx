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
  // const billing = cartItems?.billing_address;
  // console.log(shipping, 'shipping');

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
          {/* <TextInputController
            control={checkoutControl}
            name={'billing_country'}
            placeholder="India"
            style={{margin: 8, backgroundColor: 'white'}}
            // errors={errors}
            keyboardType={'default'}
            // isRequiredValue
            mode="outlined"
            defaultValue={'India'}
            isdisabled={true}
          /> */}
          <TextInputController
            control={checkoutControl}
            name={'billing_state'}
            placeholder="State"
            style={{margin: 8, backgroundColor: 'white'}}
            // errors={errors}
            keyboardType={'default'}
            isRequiredValue
            mode="outlined"
            defaultValue={shipping?.state}
          />
          {/* <TextInput
            placeholder={'State'}
            style={{margin: 7}}
            mode="outlined"
            defaultValue={shipping?.state}
          /> */}
          <TextInputController
            control={checkoutControl}
            name={'billing_city'}
            placeholder="Town / City"
            style={{margin: 8, backgroundColor: 'white'}}
            // errors={errors}
            keyboardType={'default'}
            isRequiredValue
            mode="outlined"
            defaultValue={shipping?.city}
          />
          {/* <TextInput
            placeholder={'Town / City'}
            style={{margin: 7}}
            mode="outlined"
            defaultValue={shipping?.city}
          /> */}
          <TextInputController
            control={checkoutControl}
            name={'billing_address_1'}
            placeholder="Address"
            style={{margin: 8, backgroundColor: 'white'}}
            // errors={errors}
            keyboardType={'default'}
            isRequiredValue
            mode="outlined"
            defaultValue={shipping?.address_1}
          />
          {/* <TextInput
            placeholder={'Address'}
            style={{margin: 7}}
            mode="outlined"
            defaultValue={shipping?.address_1}
          /> */}
          <TextInputController
            control={checkoutControl}
            name={'billing_address_2'}
            placeholder="Zip / PinCode"
            style={{margin: 8, backgroundColor: 'white'}}
            // errors={errors}
            keyboardType={'default'}
            isRequiredValue
            mode="outlined"
            defaultValue={shipping?.postcode}
          />
          {/* <TextInput
            placeholder={'Zip / PinCode'}
            style={{margin: 8}}
            mode="outlined"
            keyboardType="number-pad"
            maxLength={6}
            defaultValue={shipping?.postcode}
          /> */}
        </View>
      </ScrollView>
    </>
  );
}
