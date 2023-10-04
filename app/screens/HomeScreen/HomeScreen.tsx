import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React from 'react';
import {Appbar, Text} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import FeaturedCategories from '../../components/Product/FeaturedCategories';
import ImageCarousel from '../../components/Product/ImageCarousel';
import FeaturedProducts from '../../components/Product/FeaturedProducts';
import HomeWhyUs from '../../components/Product/HomeWhyUs';
// import CouponCode from '../../components/Product/HomeCouponCode';
import CouponList from '../../components/Product/CouponList';

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
          {/* <CouponCode /> */}
          <CouponList/>
          {/* <FeaturedProducts products={products} /> */}

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
        </ScrollView>
      </View>
    </>
  );
}
