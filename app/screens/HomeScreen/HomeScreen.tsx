import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React from 'react';
import {Appbar, Text} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import FeaturedCategories from '../../components/Product/FeaturedCategories';
import ImageCarousel from '../../components/Product/ImageCarousel';
import HomeWhyUs from '../../components/Product/HomeWhyUs';
import CouponList from '../../components/Product/CouponList';
import Festival from '../../components/Product/Festival';
import Footer from '../../components/Product/Footer';

export default function HomeScreen({navigation}: any) {
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());

  
  return (
    <>
      <View>
        <Appbar.Header>
          <Appbar.Content title="e-Shop" />
          <Appbar.Action icon="menu" onPress={_handleMore} />
        </Appbar.Header>

        <ScrollView style={{marginBottom: 60}}>
          <ImageCarousel />
          <FeaturedCategories />
          <Festival/>
                  <CouponList/>
                  <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              lineHeight: 28,
              padding: 10,
              textAlign: 'center',
            }}>
            WHY SHG E SHOP
          </Text>
          <HomeWhyUs />
          <Footer/>
        </ScrollView>
      </View>
    </>
  );
}
