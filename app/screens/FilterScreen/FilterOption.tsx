import React from "react";
import { TouchableOpacity ,Text} from "react-native";
const FilterOption = ({name}: any) => (
         
    <TouchableOpacity style={{}}>
  
      <Text style={{fontSize: 16, marginLeft: 50,margin:5}}> 
                  {name}</Text>
    </TouchableOpacity>
  );

  export default FilterOption