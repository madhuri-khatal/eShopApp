
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import React from "react";
import { Divider, Text } from "react-native-paper";
import FilterSubmenu from "./FilterSubmenu";
const FilterCategory = ({name, options,id}: any) => {
    const [isSubMenuVisible, setIsSubMenuVisible] = useState (false);
     
    const toggleSubMenu = () => {
      setIsSubMenuVisible(!isSubMenuVisible);
    };
  
    return (
      <View style={{}}>
        <TouchableOpacity onPress={toggleSubMenu}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 25,
              marginBottom: 5,
              margin:8,
              // paddingBottom:30,
              // height:80
                         }}>
        {name}
          </Text>
          <Divider/>
        </TouchableOpacity>
        {isSubMenuVisible && <FilterSubmenu options={options} id={id} />}
      </View>
    );
  };

  export default FilterCategory