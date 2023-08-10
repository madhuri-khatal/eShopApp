import {FilterApi} from '../../api/FilterApi';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const dummyFilterData = [
  {
    id: 1,
    name: 'Color',
    options: [
      {id: 101, name: 'Red'},
      {id: 102, name: 'Blue'},
      {id: 103, name: 'Green'},
    ],
  },
  {
    id: 2,
    name: 'Size',
    options: [
      {id: 201, name: 'Small'},
      {id: 202, name: 'Medium'},
      {id: 203, name: 'Large'},
    ],
  },
  // ... (same as before)
];

const FilterOption = ({name}: any) => (
         
  <TouchableOpacity style={{}}>
    <Text style={{fontSize: 16, marginLeft: 40}}>{name}</Text>
  </TouchableOpacity>
);

const FilterSubmenu = ({options}: any) => (
  <View>
    {options.map((option: {id: any; name: any}) => (
      <FilterOption key={option.id} name={option.name} />
    ))}
  </View>
);

const FilterCategory = ({name, options}: any) => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
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
      </TouchableOpacity>
      {isSubMenuVisible && <FilterSubmenu options={options} />}
    </View>
  );
};

const FiltersMenu = ({isVisible, filterData}: any) => {
  const [mainCategory, setMainCategory] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const {
        result: {data},
        err,
      } = await FilterApi.getMainCategory();
       err && console.log('error');

      setMainCategory(data);
    })();
  }, []);
   if (!isVisible) {
    return null;
  }

  return (
    <ScrollView style={{}}>
      {mainCategory.map((category: any) => (
          <FilterCategory
          key={category.id}
          name={category?.name}
          // options={category.options}
        />
      ))}
    </ScrollView>
  );
};

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
