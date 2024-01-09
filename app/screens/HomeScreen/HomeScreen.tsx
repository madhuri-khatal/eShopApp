import {View, Image} from 'react-native';

import React, {useEffect} from 'react';
import {Appbar, FAB, Text} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';

import {useProductContext} from './../../context/ProductContext';
import {Linking} from 'react-native';

export default function HomeScreen({navigation}: any) {
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const {images, getHomeSlider} = useProductContext();

  useEffect(() => {
    getHomeSlider();
  }, [images]);

  const handleWhatsAppLink = (id: number | string, message: string = '') => {
    const whatsappLink = `https://wa.me/${id}?text=${encodeURIComponent(
      message,
    )}`;
    Linking.openURL(whatsappLink);
  };
  const whatsappSupport = async () => {
    // const defaultMessage = `Order ID:  - Hey,ShgeShop I Want To Cancel My Order.`;
    await handleWhatsAppLink('7558566436');
  };
  return (
    <>
      <View>
        <Appbar.Header mode="small">
          <Image
            source={require('../../../assets/image/shgeshop_logo_O.png')}
            style={{width: 90, height: 40, marginLeft: 15}}
          />
          <Appbar.Content title="" />
          <Appbar.Action icon="menu" color="#506574" onPress={_handleMore} />
        </Appbar.Header>
        <Text>home page

        </Text>

       
      </View>
    </>
  );
}
