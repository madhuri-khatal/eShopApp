import {View} from 'react-native';
import React from 'react';
import {Divider, TextInput} from 'react-native-paper';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import DeliveryAddressScreen from './DeliveryAddressScreen';

export default function CheckoutScreen() {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <>
      <ScrollView>
        <View>
          <View style={{flexDirection: 'row', padding: 2}}>
            <AntDesign
              name="checkcircle"
              style={{fontSize: 25, color: '#fa5f11', margin: 3}}
            />

            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
              Order Summery
            </Text>
            <Divider />
          </View>
          <View style={{flexDirection: 'row', padding: 7}}>
            <EvilIcons
              name="spinner-2"
              style={{fontSize: 30, color: '#fa5f11'}}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Customer Information
            </Text>
          </View>

          <View style={{padding: 10}}>
            <TextInput label={'Phone Number'} style={{margin: 8}} />

            <View style={{flexDirection: 'row'}}>
              <TextInput label={'OTP'} style={{margin: 8, width: 270}} />
              <ButtonComponent
                title={'Verify'}
                backgroundColor="orange"
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
                style={{marginTop: 90}}
              />
            </View>
          </View>
          <TextInput label={'Full Name'} style={{margin: 8}} />

          {/* <PaperProvider> */}
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}>
                <DeliveryAddressScreen />
              </Modal>
            </Portal>
            <View style={{flexDirection: 'row', padding: 8}}>
              <Text style={{fontSize: 25, fontWeight: 'normal', width: '90%'}}>
                Delivery address
              </Text>
              <AntDesign
                name="down"
                style={{fontSize: 30}}
                onPress={showModal}
              />
            </View>
          {/* </PaperProvider> */}


          <View></View>
        </View>
      </ScrollView>
    </>
  );
}
