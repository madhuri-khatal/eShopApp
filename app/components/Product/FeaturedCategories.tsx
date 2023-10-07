// import { useProductContext } from '../../context/ProductContext';
// import React,{useEffect} from 'react';
// import {View, Text, Image, StyleSheet} from 'react-native';

// const FeaturedCategories = () => {
//   const {getfeaturecategory,productByFeatureCategory}=useProductContext()
//   useEffect(() => {
//     getfeaturecategory();
//   }, []);

// console.log("id=====",productByFeatureCategory[0]?.id);

//   return (
//     <View style={styles.container}>
//       {productByFeatureCategory.map(category => (
//         <View key={category.id} style={styles.categoryItem}>
//           <Image source={{uri: category?.category_image}} style={styles.categoryImage} />
//           <Text style={styles.categoryTitle}>{category?.name}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginTop: 20,
//   },
//   categoryItem: {
//     alignItems: 'center',
//   },
//   categoryImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   categoryTitle: {
//     marginTop: 10,
//     fontSize: 16,
//     textAlign: 'center'
//   },
// });

// export default FeaturedCategories;


import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProductContext } from '../../context/ProductContext';

const FeaturedCategories = () => {
  const { getfeaturecategory, productByFeatureCategory, getProductByCategoryId } = useProductContext();
  const navigation = useNavigation();

  useEffect(() => {
    getfeaturecategory();
  }, []);

  const handleCategoryPress = (id: number | string) => {
    getProductByCategoryId(id);
    // @ts-ignore
    navigation.navigate('ProductsListScreen', {id});
  };

  const renderItem = ({ item }:any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item?.id)}>
      <Image
        source={{ uri: item?.category_image }}
        style={styles.categoryImage}
      />
      {/* <Text style={styles.categoryTitle}>{item?.name}</Text> */}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={productByFeatureCategory}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true} // Set this to true for a horizontal list
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    marginTop: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 0,
  },
  categoryImage: {
    width: 80,
    height: 80,
    // borderRadius: 40,
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#506574',
  },
});

export default FeaturedCategories;


// import {useNavigation} from '@react-navigation/native';
// import {useProductContext} from '../../context/ProductContext';
// import React, {useEffect} from 'react';
// import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

// const FeaturedCategories = () => {
//   const {getfeaturecategory, productByFeatureCategory, getProductByCategoryId} =useProductContext();
//   const navigation: any = useNavigation();
//   useEffect(() => {
//     getfeaturecategory();
//   }, []);

//   const handleCategoryPress = (id: number | string) => {
//     getProductByCategoryId(id);
//     navigation.navigate('ProductsListScreen', {id});
//   };

//   return (
//     <View style={styles.container}>
//       {productByFeatureCategory.map(category => (
//         <TouchableOpacity
//           key={category.id}
//           style={styles.categoryItem}
//           onPress={() => handleCategoryPress(category?.id)}>
//           <Image
//             source={{uri: category?.category_image}}
//             style={styles.categoryImage}
//           />
//           <Text style={styles.categoryTitle}>{category?.name}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginTop: 20,
//   },
//   categoryItem: {
//     alignItems: 'center',
//   },
//   categoryImage: {
//     width: 80,
//     height: 80,
//     // borderRadius: 40,
//   },
//   categoryTitle: {
//     marginTop: 10,
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#506574',
//   },
// });

// export default FeaturedCategories;
