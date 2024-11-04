import {View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Appbar, FAB, Text} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import FeaturedCategories from '../../components/Product/FeaturedCategories';
import HomeWhyUs from '../../components/Product/HomeWhyUs';
import CouponList from '../../components/Product/CouponList';
import Festival from '../../components/Product/Festival';
import Footer from '../../components/Product/Footer';
import ListOFProducts from '../../screens/ProductScreen/ProductDetailsScreen/ListOFProducts';
import {Caraousel} from '../../components/ui/Caraousel';
import {CaraouselContent} from '../../components/ui/CaraouselContent';
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
      
        <ScrollView style={{marginBottom: 60}}>
                   <Caraousel
            // Component={CaraouselContent}
            // data={images}
            autoPlay={true}
            onSnapToItem={(i: number) => console.log()}
          />
          {/* <FeaturedCategories /> */}
          {/* <Festival /> */}
          {/* <ListOFProducts /> */}
          <View style={{paddingVertical: 10}}>
                      <CouponList />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              lineHeight: 28,
              padding: 10,
              textAlign: 'center',
              color: '#506574',
            }}>
            Why SHG E Shop
          </Text>
          <HomeWhyUs />
          <Footer />
        </ScrollView>
        <FAB
          icon="whatsapp"
          color="#ffffff"
          style={{
            position: 'absolute',
            margin: 10,
            right: 10,
            bottom: 75,
            backgroundColor: '#e95d2a',
          }}
          onPress={whatsappSupport}
        />
      </View>
    </>
  );
}
