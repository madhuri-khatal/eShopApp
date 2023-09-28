import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

export const WishlistItem = ({item, onRemoveFromWishlist}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}>
      <Image
        source={{
          uri: 'https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png',
        }}
        style={{width: 80, height: 80, resizeMode: 'cover', marginRight: 16}}
      />
      <View style={{flex: 1}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>"item.title"</Text>
        <Text style={{fontSize: 14, color: '#555'}}>Price: $ item.price</Text>
        <TouchableOpacity
          onPress={() => onRemoveFromWishlist(item)}
          style={{
            marginTop: 8,
            backgroundColor: '#e95d2a',
            padding: 8,
            borderRadius: 5,
            alignSelf: 'flex-start',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
