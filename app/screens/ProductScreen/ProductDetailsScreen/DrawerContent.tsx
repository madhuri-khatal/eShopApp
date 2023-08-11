import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, Linking} from 'react-native';
import {Divider, List, useTheme} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Drawer} from 'react-native-paper';
import {useProductContext} from './../../../context/ProductContext';
import {responsiveHeight} from 'react-native-responsive-dimensions';

export default function DrawerContent(props: any) {
  const [active, setActive] = useState<string>('');
  const [expanded, setExpanded] = React.useState(true);
  const {mainCategory, getSubCategoery, subCategory, setSubCategory} =
    useProductContext();
  const handlePress = () => setExpanded(!expanded);
  const theme = useTheme();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View style={{flex: 1}}>
        {/* <View
          style={{
            height: responsiveHeight(10),
            backgroundColor:'red',
            opacity:0.6
          }}></View> */}
        <DrawerContentScrollView {...props}>
          <List.Section
            title="All Categories"
            titleStyle={{color: '#72767B', fontSize: 20, fontWeight: 'bold'}}
            style={{backgroundColor: theme.colors.background}}>
            {mainCategory.map((categoery: any, index: number) => (
              <List.Accordion
                key={index}
                theme={theme}
                titleStyle={{
                  color: '#72767B',
                  fontSize: 18,
                  fontWeight: 'normal',
                }}
                style={{backgroundColor: theme.colors.background}}
                title={categoery?.name}
                expanded={active == categoery?.id ? true : false}
                onPress={() => {
                  setSubCategory([]);
                  getSubCategoery(categoery?.id);
                  setActive(categoery?.id);
                }}>
                {subCategory.map((data: any) => (
                  <List.Item
                    titleStyle={{color: '#72767B'}}
                    style={{marginLeft: 40, padding: 0}}
                    title={data?.name}
                  />
                ))}
              </List.Accordion>
            ))}
          </List.Section>
        </DrawerContentScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
