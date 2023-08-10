import {FilterApi} from '../../api/FilterApi';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FiltersMenu from './FiltersMenu';
import {useNavigation} from '@react-navigation/native';

const FilterMenu = () => {
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
  const navigation: any = useNavigation();
  const toggleFilterMenu = () => {
    setIsFilterMenuVisible(!isFilterMenuVisible);
    // navigation.getParent('LeftDrawer').openDrawer();
  };

  return (
    <View
      style={{
        flex: 1,
        zIndex: 9000,
        paddingHorizontal: 3,

        // opacity:0.7,
        backgroundColor: 'white',
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
          <Ionicons name="filter" style={{fontSize: 25, marginRight: 10}} />
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Filter</Text>
        </View>
      </TouchableOpacity>
      <FiltersMenu
        isVisible={isFilterMenuVisible}
        onFilterToggle={toggleFilterMenu}
      />
    </View>
  );
};

export default FilterMenu;
