import React from "react";
import { TouchableOpacity ,Text} from "react-native";


const FilterOption = ({name}: any) => (
         
    <TouchableOpacity style={{}}>
      <Text style={{fontSize: 16, marginLeft: 40}}>{name}</Text>
    </TouchableOpacity>
  );

  export default FilterOption