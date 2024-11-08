import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FilterMenu = () => {
    const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
    
    const toggleFilterMenu = () => {
      setIsFilterMenuVisible(!isFilterMenuVisible);
    };
  
    return (
      <View
        style={{
          flex: 1,
          zIndex: 9000,
          paddingHorizontal: 3,
          backgroundColor: '#F7F7F7',
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
            <Text style={{fontSize: 18, fontWeight: 'bold'}} onPress={toggleFilterMenu}>Filter</Text>
          </View>
        </TouchableOpacity>
       
      </View>
    );
  };
  
  export default FilterMenu;