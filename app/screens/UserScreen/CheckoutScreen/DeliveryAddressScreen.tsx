import {View, Text} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native';

export default function DeliveryAddressScreen() {
  return (
    <>
      <ScrollView>
        <View>
          {/* <Text style={{fontSize: 20, marginLeft: 10}}>India</Text> */}
          <TextInput
            label={'India'}
            style={{margin: 7}}
            mode="outlined"
            disabled
          />
          <TextInput label={'State'} style={{margin: 7}} mode="outlined" />
          <TextInput
            label={'Town / City'}
            style={{margin: 7}}
            mode="outlined"
          />
          <TextInput label={'Address'} style={{margin: 7}} mode="outlined" />
          <TextInput
            label={'Zip / PinCode'}
            style={{margin: 8}}
            mode="outlined"
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>
      </ScrollView>
    </>
  );
}
