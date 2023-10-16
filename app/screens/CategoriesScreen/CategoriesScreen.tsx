import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {List, useTheme} from 'react-native-paper';

import {useProductContext} from '../../context/ProductContext';

export const CategoriesScreen = (props: any) => {
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
                color:'#ffffff',
                fontSize: 21,
                fontWeight:expanded && active === categoery?.id ? 'bold': 'normal',
                textAlign: 'center',
               
              }}
                style={{backgroundColor: '#e95d2a', width: '110%'}}
              title={categoery?.name}
              expanded={active == categoery?.id ? true : false}
              onPress={() => {
                setSubCategory([]);
                const id = categoery?.id;
                getSubCategoery(categoery?.id);
                setActive(categoery?.id);
              }}>
              {subCategory.map((data: any) => (
                <List.Item
                  titleStyle={{
                    color: '#e95d2a',
                    fontSize: 18,
                    textAlign: 'center',
                  }}
                  style={{marginLeft:40,marginRight:40, padding: 0,backgroundColor:'#ffffff',borderRadius:2}}
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
