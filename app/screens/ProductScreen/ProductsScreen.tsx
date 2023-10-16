import ProductList from './ProductList';
import {HeaderBar} from '../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FilterMenu from '../../screens/FilterScreen/FilterMenu';
import {useCartContext} from '../../context/CartContext';
import CustomSearchBar from '../../components/Product/SearchBar';
import {useProductContext} from '../../context/ProductContext';
// import ListOFProducts from './ProductDetailsScreen/ListOFProducts';
export const ProductsScreen = (props: any) => {
  const {navigation} = props;
  const {cartItems, getCartList} = useCartContext();
  const {productByCategoryId} = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      await getCartList();
    })();
  }, []);
  const badgeCount = cartItems?.items.length || 0;
  const handleSearchChange = (query: string) => {
     if (query.trim() === '') {
          setFilteredProducts(productByCategoryId);
    } else {
          const filteredProducts = productByCategoryId.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
          setFilteredProducts(filteredProducts); 
            }
  };
  return (
    <>
      <HeaderBar
        title="Product Screen"
        titleStyle={{fontSize: 18, fontWeight: 'bold', color: '#506574'}}
        backAction={() => navigation.goBack()}
        right2Action={() => {
          navigation.navigate('CartStack', {
            screen: 'CartScreen',
            initial: false,
          });
        }}
        right1Action={() =>
          navigation.getParent('main').dispatch(DrawerActions.toggleDrawer())
        }
        icon1="menu"
        icon2="cart"
        badgeCount={badgeCount}
      />
      <View style={{flexDirection: 'row',height:55}}>
        <View
          style={{
            flexDirection: 'column',
            width: '15%',
            justifyContent: 'center',
            backgroundColor: '#e95d2a',
            borderRadius: 8,
            // zIndex:100
          }}>
          <FilterMenu />
        </View>
        <View
          style={{flexDirection: 'column', width: '85%',height:55, paddingHorizontal: 4}}>
          <CustomSearchBar onChangeText={handleSearchChange} />
        </View>
      </View>
      <View>
        <ProductList filteredProducts={filteredProducts} />
      </View>
    </>
  );
};
