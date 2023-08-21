import {View, Text} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native';

export default function DeliveryAddressScreen() {
  return (
    <>
      <ScrollView>
        <View>
          <Text style={{fontSize: 25}}>India</Text>
          <TextInput label={'State'} style={{margin: 8}} />
          <TextInput label={'Town/City'} style={{margin: 8}} />
          <TextInput label={'Address'} style={{margin: 8}} />
          <TextInput label={'Zip/PinCode'} style={{margin: 8}} />
          <Button> Submit</Button>
        </View>
      </ScrollView>
    </>
  );
}
