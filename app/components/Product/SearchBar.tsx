import React, {useState} from 'react';
import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';

const CustomSearchBar = ({placeholder, onChangeText}: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    onChangeText(query);
  };

  return (
    <View style={{paddingHorizontal: 16, paddingTop: 10}}>
      <Searchbar
        placeholder={placeholder || 'Search'}
        onChangeText={handleSearch}
        value={searchQuery}
      />
    </View>
  );
};

export default CustomSearchBar;
