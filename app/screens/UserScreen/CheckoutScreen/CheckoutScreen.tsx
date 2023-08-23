import {View} from 'react-native';
import React from 'react';
import {Divider, TextInput} from 'react-native-paper';
import ButtonComponent from '../../../components/ui/ButtonComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import DeliveryAddressScreen from './DeliveryAddressScreen';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {useTheme} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import PaymentMethod from '../../../components/Product/PaymentMethod';

export default function CheckoutScreen(props: any) {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const showModal1 = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const {navigation} = props;
  const {colors} = useTheme();

  return (
    <>
      <HeaderBar
        title="Product Screen"
        titleStyle={{color: colors.onSecondary}}
        backAction={() => navigation.goBack()}
        right2Action={() => navigation.navigate('cartScreen')}
        right1Action={() =>
          navigation.getParent('main').dispatch(DrawerActions.toggleDrawer())
        }
        icon1="menu"
        icon2="cart"
      />
      <ScrollView>
        <View style={{marginTop: 10, padding: 7}}>
          <View style={{flexDirection: 'row', paddingVertical: 8}}>
            <AntDesign
              name="checkcircle"
              style={{fontSize: 25, color: '#fa5f11', margin: 3}}
            />

            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
              Order Summery
            </Text>
            <Divider />
          </View>
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
            <TextInput label={'Phone Number'} style={{margin: 8}} />

            <View style={{flexDirection: 'row'}}>
              <View>
                <TextInput label={'OTP'} style={{margin: 8, width: 255}} />
              </View>
              <View style={{marginTop: 10}}>
                <ButtonComponent
                  title={'Verify'}
                  backgroundColor="orange"
                  onPress={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </View>
            </View>
            <TextInput label={'Full Name'} style={{margin: 8}} />

            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}>
                <DeliveryAddressScreen />
              </Modal>
            </Portal>

            <View style={{flexDirection: 'row', padding: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', width: '90%'}}>
                Delivery address
              </Text>
              <AntDesign
                name="down"
                style={{fontSize: 30}}
                onPress={showModal}
              />
            </View>

            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}>
                <Text>Payment</Text>
              </Modal>
            </Portal>

            <View style={{width: '100%'}}>
                <PaymentMethod />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
