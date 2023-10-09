import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Appbar, Text} from 'react-native-paper';
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

export default function HomeScreen({navigation}: any) {
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const {images, getHomeSlider} = useProductContext();

  useEffect(() => {
    getHomeSlider();
  }, [images]);

  return (
    <>
      <View>
        <Appbar.Header>
          <Appbar.Content title="e-Shop" />
          <Appbar.Action icon="menu" onPress={_handleMore} />
        </Appbar.Header>

        <ScrollView style={{marginBottom: 60}}>
                   <Caraousel
            Component={CaraouselContent}
            data={images}
            autoPlay={true}
            onSnapToItem={(i: number) => console.log()}
          />
          <FeaturedCategories />
          <Festival />
          <ListOFProducts />
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
      </View>
    </>
  );
}
