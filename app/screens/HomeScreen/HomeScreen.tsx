import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React from 'react';
import {Appbar, Text} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import FeaturedCategories from '../../components/Product/FeaturedCategories';
import ImageCarousel from '../../components/Product/ImageCarousel';
import FeaturedProducts from '../../components/Product/FeaturedProducts';
import HomeWhyUs from '../../components/Product/HomeWhyUs';
import CouponCode from '../../components/Product/HomeCouponCode';

export default function HomeScreen({navigation}: any) {
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());

  const products = [
    {
      id: 1,
      title: 'Product 1',
      price: 19.99,
      image:
        'https://shgeshop.com/wp-content/uploads/2023/08/homepage-slider-image1.png',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 24.99,
      image:
        'https://shgeshop.com/wp-content/uploads/2023/08/homepage-slider-image1.png',
    },
    {
      id: 3,
      title: 'Product 3',
      price: 14.99,
      image:
        'https://shgeshop.com/wp-content/uploads/2023/08/homepage-slider-image1.png',
    },
    {
      id: 4,
      title: 'Product 4',
      price: 29.99,
      image:
        'https://shgeshop.com/wp-content/uploads/2023/08/homepage-slider-image1.png',
    },
  ];
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
          <CouponCode />
          <FeaturedProducts products={products} />

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
