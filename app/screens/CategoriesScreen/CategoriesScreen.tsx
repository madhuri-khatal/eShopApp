// import React, {useState} from 'react';
// import {ScrollView,View} from 'react-native';
// import {List, Text, useTheme} from 'react-native-paper';

// import {useProductContext} from '../../context/ProductContext';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// export const CategoriesScreen = (props: any) => {
//   const [active, setActive] = useState<string>('');
//   const [expanded, setExpanded] = React.useState(true);
//   const {
//     mainCategory,
//     getSubCategoery,
//     subCategory,
//     setSubCategory,
//     getProductByCategoryId,
//       } = useProductContext();
//   const {navigation} = props;
//   const handlePress = () => setExpanded(!expanded);
//   const theme = useTheme();
//    return (
//     <>
//       <ScrollView
//         style={{backgroundColor: '#e95d2a'}}>
//         <List.Section style={{marginTop:50}}>
//           {mainCategory.map((categoery: any, index: number) => (
//             <List.Accordion
//               key={index}
//               // theme={theme}
//               titleStyle={{
//                 color:'#ffffff',
//                 fontSize: 21,
//                 fontWeight:expanded && active === categoery?.id ? 'bold': 'normal',
//                 textAlign: 'center',
               
//               }}
//                 style={{backgroundColor: '#e95d2a', width: '110%'}}
//               title={categoery?.name}
//               expanded={active == categoery?.id ? true : false}
//               onPress={() => {
//                 setSubCategory([]);
//                 const id = categoery?.id;
//                 getSubCategoery(categoery?.id);
//                 setActive(categoery?.id);
//               }}>
//                  <MaterialCommunityIcons
//                     name={active === categoery?.id ? "chevron-up-circle" : "chevron-down-circle"}
//                     color="#ffffff"
//                     size={28}
//                   ></MaterialCommunityIcons>
//               {subCategory.map((data: any) => (
               
//                 <List.Item
//                   titleStyle={{
//                     color: '#e95d2a',
//                     fontSize: 18,
//                     textAlign: 'center',
//                   }}
//                   style={{marginLeft:40,marginRight:40, padding: 0,backgroundColor:'#ffffff',borderRadius:2}}
//                   title={data?.name}
//                   onPress={async () => {
//                     await getProductByCategoryId(data?.id);
//                     const id = data?.id;
//                navigation.navigate('ProductsListScreen', {id});
                   
//                   }}
//                 />
               
//               ))}
             
//             </List.Accordion>
//           ))}
//         </List.Section>
//       </ScrollView>
//     </>
//   );
// };










import React, { useState } from 'react';
import { ScrollView, View, Animated, StyleSheet } from 'react-native';
import { List, Text, Surface } from 'react-native-paper';
import { useProductContext } from '../../context/ProductContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedSurface = Animated.createAnimatedComponent(Surface);

export const CategoriesScreen = ({ navigation }: any) => {
  const [active, setActive] = useState('');
  const {
    mainCategory,
    getSubCategoery,
    subCategory,
    setSubCategory,
    getProductByCategoryId,
  } = useProductContext();

  const [animations] = useState(() =>
    mainCategory.reduce((acc, cat) => ({
      ...acc,
      [cat.id]: new Animated.Value(0)
    }), {})
  );

  const toggleCategory = (categoryId: any) => {
    Animated.spring(animations[categoryId], {
      toValue: active === categoryId ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>
          Categories
        </Text>
        
        {mainCategory.map((category, index) => (
          <View key={category.id} style={styles.categoryContainer}>
            <AnimatedSurface style={styles.surface} elevation={2}>
              <List.Accordion
                title={category.name}
                expanded={active === category.id}
                onPress={() => {
                  setSubCategory([]);
                  getSubCategoery(category.id);
                  toggleCategory(category.id);
                  setActive(active === category.id ? '' : category.id);
                }}
                style={styles.accordion}
                titleStyle={[
                  styles.accordionTitle,
                  active === category.id && styles.accordionTitleActive
                ]}
                right={props => (
                  <MaterialCommunityIcons
                    name={active === category.id ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={active === category.id ? '#ea580c' : '#334155'}
                  />
                )}
              >
                <View style={styles.subCategoryContainer}>
                  {subCategory.map((subCat) => (
                    <List.Item
                      key={subCat.id}
                      title={subCat.name}
                      onPress={async () => {
                        await getProductByCategoryId(subCat.id);
                        navigation.navigate('ProductsListScreen', { id: subCat.id });
                      }}
                      titleStyle={styles.subCategoryTitle}
                      style={styles.subCategoryItem}
                      left={props => (
                        <MaterialCommunityIcons
                          {...props}
                          name="cards-diamond-outline"
                          size={20}
                          style={styles.subCategoryIcon}
                        />
                      )}
                    />
                  ))}
                </View>
              </List.Accordion>
            </AnimatedSurface>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed', // bg-orange-50
    minHeight: '100%'
  },
  contentContainer: {
    paddingTop: 64, // pt-16
    paddingBottom: 32, // pb-8
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ea580c', // text-orange-600
    textAlign: 'center',
    marginBottom: 24
  },
  categoryContainer: {
    marginHorizontal: 16, // mx-4
    marginBottom: 16, // mb-4
  },
  surface: {
    borderRadius: 12, // rounded-xl
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  accordion: {
    backgroundColor: 'white'
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155' // text-slate-700
  },
  accordionTitleActive: {
    color: '#ea580c' // text-orange-600
  },
  subCategoryContainer: {
    backgroundColor: '#fff7ed', // bg-orange-50
    paddingVertical: 8
  },
  subCategoryItem: {
    backgroundColor: 'transparent'
  },
  subCategoryTitle: {
    fontSize: 16,
    color: '#334155' // text-slate-700
  },
  subCategoryIcon: {
    marginLeft: 24,
    color: '#ea580c' // text-orange-600
  }
});

export default CategoriesScreen;