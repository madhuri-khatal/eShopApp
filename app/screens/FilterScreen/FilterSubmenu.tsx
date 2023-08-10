import React from 'react';
import {View} from 'react-native';
import FilterOption from './FilterOption';
const FilterSubmenu = ({options}: any) => (
    <View>
      {options.map((option: {id: any; name: any}) => (
        <FilterOption key={option.id} name={option.name} />
      ))}
    </View>
  );

  export default FilterSubmenu