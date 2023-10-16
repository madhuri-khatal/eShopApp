import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, List, useTheme} from 'react-native-paper';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useProductContext} from '../../context/ProductContext';

export const CategoriesScreen = (props: any) => {
  //   const {navigation} = props;
  // const{mainCategory}=useProductContext();
  // console.log("mainCategory=======",mainCategory[0].name);
  const [active, setActive] = useState<string>('');
  const [expanded, setExpanded] = React.useState(true);
  const {
    mainCategory,
    getSubCategoery,
    subCategory,
    setSubCategory,
    getProductByCategoryId,
  } = useProductContext();
  const {navigation} = props;
  const handlePress = () => setExpanded(!expanded);
  const theme = useTheme();
  return (
    <>
      <ScrollView
        style={{backgroundColor: '#e95d2a'}}>
        <List.Section style={{marginTop:50}}>
          {mainCategory.map((categoery: any, index: number) => (
            <List.Accordion
              key={index}
              // theme={theme}
              titleStyle={{
                color: '#ffffff',
                fontSize: 21,
                fontWeight: 'normal',
                textAlign: 'center',
                // backgroundColor: '#000000',
              }}
              style={{backgroundColor: '#e95d2a', width: '110%'}}
              title={categoery?.name}
              expanded={active == categoery?.id ? true : false}
              onPress={() => {
                setSubCategory([]);
                getSubCategoery(categoery?.id);
                setActive(categoery?.id);
              }}>
              {subCategory.map((data: any) => (
                <List.Item
                  titleStyle={{
                    color: '#ffffff',
                    fontSize: 18,
                    textAlign: 'center',
                  }}
                  style={{marginLeft: 40, padding: 0}}
                  title={data?.name}
                  onPress={async () => {
                    await getProductByCategoryId(data?.id);
                    const id = data?.id;
                    navigation.navigate('ProductsListScreen', {id});
                   
                  }}
                />
              ))}
            </List.Accordion>
          ))}
        </List.Section>
      </ScrollView>
    </>
  );
};
