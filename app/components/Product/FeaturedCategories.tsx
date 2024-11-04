import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useProductContext } from '../../context/ProductContext'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const categories = [
  {name: 'Bags', icon: 'shopping', color: '#3357FF'},
  {name: 'Foods', icon: 'food', color: '#A533FF'},
  {name: 'Devine Things', icon: 'om', color: '#FF5733'},
  {name: 'Home Decor', icon: 'sofa', color: '#04C4B4'},
  {name: 'Spice', icon: 'chili-mild', color: 'red'},
  {name: 'Beauty/ Health', icon: 'lipstick', color: '#FF33A8'},
  {name: 'Gardening', icon: 'flower-tulip', color: '#04C426'},
  {name: 'Jewellery', icon: 'necklace', color: '#E9AD01'},
];
const FeaturedCategories = () => {
  // const{ mainCategory}=useProductContext();
  // console.log(mainCategory[0].src)
 
  return (
    <>
     <View style={{padding: 10}}>
          {/* First Row */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            {categories.slice(0, 4).map((category, index) => (
              <View key={index} style={{alignItems: 'center', flex: 1}}>
                <MaterialCommunityIcons
                  name={category.icon}
                  size={30}
                  color={category.color}
                  style={{
                    borderColor: '#E5E5E5',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 50,
                  }}
                />
                <Text style={{marginTop: 5, color: '#506574',fontWeight:"bold"}}>
                  {category.name}
                </Text>
              </View>
            ))}
          </View>
          {/* Second Row */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {categories.slice(4, 8).map((category, index) => (
              <View key={index} style={{alignItems: 'center', flex: 1}}>
                <MaterialCommunityIcons
                  name={category.icon}
                  size={30}
                  color={category.color}
                  style={{
                    borderColor: '#E5E5E5',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 50,
                  }}
                />
                <Text style={{marginTop: 5, color: '#506574',fontWeight:"bold"}}>
                  {category.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
     {/* {mainCategory.map((item,index)=>
          <View key={index}>
            <Image
        source={{ uri: item.src }}
        // style={styles.categoryImage}
      />
      <Text>{item.name}</Text>
      </View>
    )} */}
    </>
   
  )
}

export default FeaturedCategories

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 0,
      marginTop: 20,
    },
//     categoryImage:{
// height:60,
// width:40
//     }
  })



// import React, { useEffect } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useProductContext } from '../../context/ProductContext';

// const FeaturedCategories = () => {
//   const { getfeaturecategory, productByFeatureCategory, getProductByCategoryId,mainCategory } = useProductContext();
//   const navigation = useNavigation();

//   useEffect(() => {
//     getfeaturecategory();
//   }, []);
// console.log("catege====",mainCategory[5].name)
//   const handleCategoryPress = (id: number | string) => {
//     getProductByCategoryId(id);
//     // @ts-ignore
//     navigation.navigate('ProductsListScreen', {id});
//   };

//   const renderItem = ({ item }:any) => (
//     <TouchableOpacity
//       key={item.id}
//       style={styles.categoryItem}
//       onPress={() => handleCategoryPress(item?.id)}>
//       <Image
//         source={{ uri: item?.category_image }}
//         style={styles.categoryImage}
//       />
//       {/* <Text style={styles.categoryTitle}>{item?.name}</Text> */}
//     </TouchableOpacity>
//   );

//   return (
//     <FlatList
//       data={productByFeatureCategory}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id.toString()}
//       horizontal={true} // Set this to true for a horizontal list
//       contentContainerStyle={styles.container}
//       />
      
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     paddingHorizontal: 0,
//     marginTop: 20,
//   },
//   categoryItem: {
//     alignItems: 'center',
//     marginRight: 0,
//   },
//   categoryImage: {
//     width: 103,
//     height: 103,
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


// // import {useNavigation} from '@react-navigation/native';
// // import {useProductContext} from '../../context/ProductContext';
// // import React, {useEffect} from 'react';
// // import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

// // const FeaturedCategories = () => {
// //   const {getfeaturecategory, productByFeatureCategory, getProductByCategoryId} =useProductContext();
// //   const navigation: any = useNavigation();
// //   useEffect(() => {
// //     getfeaturecategory();
// //   }, []);

// //   const handleCategoryPress = (id: number | string) => {
// //     getProductByCategoryId(id);
// //     navigation.navigate('ProductsListScreen', {id});
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {productByFeatureCategory.map(category => (
// //         <TouchableOpacity
// //           key={category.id}
// //           style={styles.categoryItem}
// //           onPress={() => handleCategoryPress(category?.id)}>
// //           <Image
// //             source={{uri: category?.category_image}}
// //             style={styles.categoryImage}
// //           />
// //           <Text style={styles.categoryTitle}>{category?.name}</Text>
// //         </TouchableOpacity>
// //       ))}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 10,
// //     marginTop: 20,
// //   },
// //   categoryItem: {
// //     alignItems: 'center',
// //   },
// //   categoryImage: {
// //     width: 80,
// //     height: 80,
// //     // borderRadius: 40,
// //   },
// //   categoryTitle: {
// //     marginTop: 10,
// //     fontSize: 16,
// //     textAlign: 'center',
// //     color: '#506574',
// //   },
// // });

// // export default FeaturedCategories;
