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
    <View style={{paddingHorizontal: 5}}>
      <Searchbar
        placeholder={placeholder || 'Search Product'}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholderTextColor={'#54616c'}
        iconColor="#54616c"
        style={{
          backgroundColor: '#f2f2f2',
          fontSize: 6, // Font size (adjust as needed)
          borderRadius: 8, // Border radius (adjust as needed)
        }}
      />
    </View>
  );
};

export default CustomSearchBar;
