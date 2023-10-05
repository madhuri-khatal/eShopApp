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
    console.log('Search query:', query);
    if (query.trim() === '') {
      // If the query is empty, show all products
      setFilteredProducts(productByCategoryId);
    } else {
      // Filter products based on the query
      const filteredProducts = productByCategoryId.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      );
      console.log('Filtered products:', filteredProducts);
      setFilteredProducts(filteredProducts); // Update the state with filtered products
    }
  };
  return (
    <>
      <HeaderBar
        title="Product Screen"
        titleStyle={{fontSize: 18}}
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
      <CustomSearchBar onChangeText={handleSearchChange} />
      <View
        style={{
          position: 'absolute',
          top: 118,
          left: 0,
          zIndex: 9000,
          borderRadius: 10,
          backgroundColor: 'white',
          width: '100%',
        }}>
        <FilterMenu />
      </View>
      <View style={{marginTop: 40}}>
      {/* <ListOFProducts/> */}
      <ProductList filteredProducts={filteredProducts} />
      
      </View>
    </>
  );
};
