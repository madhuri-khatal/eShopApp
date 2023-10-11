import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

const FilterMenu = () => {
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
  const navigation: any = useNavigation();
  const toggleFilterMenu = () => {
    setIsFilterMenuVisible(!isFilterMenuVisible);
    setTimeout(() => navigation.getParent('LeftDrawer')?.openDrawer(), 650);
  };

  return (
    <View
      style={{
        flex: 1,
        zIndex: 9000,
        paddingHorizontal: 3,
      }}>
      <TouchableOpacity
        onPress={toggleFilterMenu}
        style={{
          padding: 10,
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Ionicons
            name="filter"
            style={{fontSize: 25, marginRight: 10, color: 'gray'}}
          />
          <Text
            style={{fontSize: 18, fontWeight: 'bold', color: '#506574'}}
            onPress={toggleFilterMenu}>
            Categories
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FilterMenu;
