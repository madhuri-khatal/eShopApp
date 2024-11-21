import React from 'react'
import { Image, StyleSheet, Touchable, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useProductContext } from '../../context/ProductContext'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const FeaturedCategories = () => {
    const { getfeaturecategory, productByFeatureCategory, getProductByCategoryId,mainCategory } = useProductContext();
  const navigation = useNavigation(); 
  const handleCategoryPress = (id: number | string) => {
        getProductByCategoryId(id);
        // @ts-ignore
        navigation.navigate('ProductsListScreen', {id});
      };
      const modifiedCategories = mainCategory
    .filter(category => category.name !== "Home decor")
    .filter(category => category.name !== "Egg Curry Masala")
    .map(category => {
      if (category.name === "Daily Household Needs") return { ...category, name: "Household" };
      // if (category.name === "Egg Curry Masala") return { ...category, name: "Masala" };
      if (category.name === "Bags and Luggage") return { ...category, name: "Bags" };
      if (category.name === "Home Decor and Improve") return { ...category, name: "Home Decor" };
      if (category.name === "Food and Drinks") return { ...category, name: "Food" };
      return category;
    });

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
            {modifiedCategories.slice(0, 4).map((category, index) => (
              
              <View key={index} style={{alignItems: 'center', flex: 1}}>
                  <TouchableOpacity
                onPress={() => handleCategoryPress(category?.id)}>
                                 <Image
                      source={{ uri: category?.image?.src? category?.image?.src:"" }}
                      style={{height:90, width:90}}
                    />
               <Text style={{marginTop: 5, color: '#506574',fontWeight:"bold",textAlign:"center"}}>
                  {category.name}
                </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {/* Second Row */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {modifiedCategories.slice(4,8).map((category, index) => (
              <View key={index} style={{alignItems: 'center', flex: 1}}>
              <TouchableOpacity
                onPress={() => handleCategoryPress(category?.id)}>
              
                <Image
                        source={{ uri: category?.image?.src? category?.image?.src:"" }}
                        style={{height:90, width:90}}
                      />
                <Text style={{marginTop: 5, color: '#506574',fontWeight:"bold",textAlign:"center"}}>
                  {category.name}
                </Text>
                </TouchableOpacity>
              </View>
             
              
              ))}
          </View>
         
        </View>
  
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
  })