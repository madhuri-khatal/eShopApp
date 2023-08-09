
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import React from "react";
import { Divider, Text } from "react-native-paper";
import FilterSubmenu from "./FilterSubmenu";
const FilterCategory = ({name, options}: any) => {
    const [isSubMenuVisible, setIsSubMenuVisible] = useState (false);
    console.log('NAME===========', name);
  
    const toggleSubMenu = () => {
      setIsSubMenuVisible(!isSubMenuVisible);
    };
  
    return (
      <View style={{}}>
        <TouchableOpacity onPress={toggleSubMenu}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 25,
              marginBottom: 5,
            }}>
            {name}
          </Text>
          <Divider/>
        </TouchableOpacity>
        {isSubMenuVisible && <FilterSubmenu options={options} />}
      </View>
    );
  };

  export default FilterCategory