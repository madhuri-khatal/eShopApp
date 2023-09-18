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
    <View style={{paddingHorizontal: 16}}>
      <Searchbar
        placeholder={placeholder || 'Search Product'}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholderTextColor={'gray'}
        iconColor="gray"
        style={{
          backgroundColor: '#f1f1f1',
          fontSize: 10, // Font size (adjust as needed)
          borderRadius: 8, // Border radius (adjust as needed)
        }}
      />
    </View>
  );
};

export default CustomSearchBar;
