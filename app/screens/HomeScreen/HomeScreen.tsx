import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import SearchBar from '../../components/Product/SearchBar';
import {Caraousel} from '../../components/Product/Carousel';
import {CaraouselContent} from '../../components/Product/CarouselContent';
import FeaturedCategories from '../../components/Product/FeaturedCategories';
import PaymentMethod from '../../components/Product/PaymentMethod';
import ImageCarousel from '../../components/Product/ImageCarousel';
import FeaturedProducts from '../../components/Product/FeaturedProducts';
export default function HomeScreen({navigation}: any) {
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());

  const {colors} = useTheme();

  const handleSearchChange = (query: any) => {
    console.log('Search query:', query);
  };
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
          <Appbar.Content
            title="e-Shop"
            // titleStyle={{color: colors.onSecondary}}
          />
          <Appbar.Action icon="menu" onPress={_handleMore} />
        </Appbar.Header>

        {/* <SearchBar onChangeText={handleSearchChange} /> */}

        {/* <Caraousel
          Component={CaraouselContent}
          data={[...new Array(3).keys()]}
          autoPlay
          onSnapToItem={() => console.log('hi')}
        /> */}
        <ScrollView>
          <ImageCarousel />
          <FeaturedCategories />
          <FeaturedProducts products={products} />
        </ScrollView>
      </View>
    </>
  );
}
