import {View, Text} from 'react-native';
import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import SearchBar from '../../components/Product/SearchBar';
import {Caraousel} from '../../components/Product/Carousel';
import {CaraouselContent} from '../../components/Product/CarouselContent';
import FeaturedCategories from '../../components/Product/FeaturedCategories';
import PaymentMethod from '../../components/Product/PaymentMethod';
import ImageCarousel from '../../components/Product/ImageCarousel';
export default function HomeScreen({navigation}: any) {
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());

  const {colors} = useTheme();

  const handleSearchChange = (query: any) => {
    console.log('Search query:', query);
  };

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
        <ImageCarousel />
        <FeaturedCategories />
      </View>
    </>
  );
}
