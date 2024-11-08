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
        placeholderTextColor={'#506574'}
        iconColor="#54616c"
        style={{
          backgroundColor: '#f2f2f2',
          fontSize: 6, 
          borderRadius: 8, 
        }}
      />
    </View>
  );
};

export default CustomSearchBar;
