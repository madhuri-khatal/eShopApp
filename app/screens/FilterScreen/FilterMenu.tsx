import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
const FilterMenu = () => {
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
  const navigation: any = useNavigation();
  const toggleFilterMenu = () => {
    setIsFilterMenuVisible(!isFilterMenuVisible);
    setTimeout(() => navigation.getParent('LeftDrawer')?.openDrawer(), 650);
  };

  return (
    <TouchableOpacity
      onPress={toggleFilterMenu}
      style={{
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <FontAwesome5 name="filter" color="#ffffff" size={18} />
      </View>
    </TouchableOpacity>
  );
};

export default FilterMenu;
