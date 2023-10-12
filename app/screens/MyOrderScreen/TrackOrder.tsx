import {View, Text} from 'react-native';
import React from 'react';
import {TextInputController} from '../../components/ui/TextInput';
import {Button, TextInput} from 'react-native-paper';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function TrackOrder() {
  const navigation: any = useNavigation();
  const trackOrder = () => {
    console.log('Pressedd');
  };
  return (
    <View style={{padding: 15}}>
      <View>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <Image
            source={require('../../../assets/image/trackOrder.png')}
            height={150}
            width={150}
          />
        </View>
        <Text
          style={{
            fontSize: 30,
            color: '#506574',
            textAlign: 'left',
            fontFamily: 'roboto',
            fontWeight: '700',
            marginVertical: 30,
          }}>
          Be Always Up To Date With Your Order
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: '#506574',
            textAlign: 'left',
            fontFamily: 'roboto',
            lineHeight: 30,
          }}>
          To track your order please enter your Order ID in the box below and
          press the "Track" button. This was given to you on your receipt and in
          the confirmation email you should have received.
        </Text>
      </View>
      <TextInput
        style={{marginVertical: 15, color: '#506574'}}
        label="Order ID"
        textColor="#506574"
        mode="outlined"
      />
      <TextInput label="Billing Email" mode="outlined" />

      <Button
        icon="clock"
        style={{marginVertical: 25, borderRadius: 5}}
        mode="contained"
        onPress={trackOrder}>
        <Text>Track Order</Text>
      </Button>
    </View>
  );
}
