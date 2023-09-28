import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export const WishlistItem = ({item, onRemoveFromWishlist}: any) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <TouchableOpacity
          onPress={() => onRemoveFromWishlist(item)}
          style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#555',
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: '#e95d2a',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

// export default WishlistItem;
