import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {DrawerActions} from '@react-navigation/native';

import {Avatar, Divider, Appbar,useTheme, Button} from 'react-native-paper';


export default function ProfileScreen(props: any) {
  const {navigation} = props;
  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());

  const {colors}=useTheme();
 

  const handleEditProfile = () => {
    // Navigate to Edit Profile screen
    navigation.navigate('EditProfile');
  };

  const handleSavedAddresses = () => {
    // Navigate to Saved Addresses screen
    navigation.navigate('SavedAddresses');
  };

  const handleLanguageSelection = () => {
    // Navigate to Language Selection screen
    navigation.navigate('LanguageSelection');
  };
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Profile"  titleStyle={{ color: colors.onSecondary }} />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="menu" onPress={_handleMore} />
      </Appbar.Header>

      <View style={{marginTop: 20}}>
        <View style={styles.profileContainer}>
          <Avatar.Image
            size={80}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png',
            }}
          />
          <Text style={styles.userName}>John Doe</Text>

          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              marginTop: 15,
              marginBottom: 45,
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center', marginRight: 5}}>
              <Button
                style={{
                  width: 190,
                  height: 50,
                  backgroundColor: '#f6d70e',
                  borderRadius: 10,
                  padding: 3,
                  justifyContent: 'center',
                }}
                mode="contained"
                onPress={() => navigation.navigate('CartScreen')}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    fontSize: 17,
                    textTransform: 'capitalize',
                    color: '#595555',
                  }}>
                  My Cart
                </Text>
              </Button>
            </View>
            <View style={{alignItems: 'center'}}>
              <Button
                style={{
                  width: 190,
                  height: 50,
                  backgroundColor: '#f6d70e',
                  borderRadius: 10,
                  padding: 3,
                  justifyContent: 'center',
                }}
                mode="contained"
                onPress={() => navigation.navigate('CartScreen')}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    fontSize: 17,
                    textTransform: 'capitalize',
                    color: '#595555',
                  }}>
                  My Orders
                </Text>
              </Button>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              marginTop: 15,
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center', marginRight: 5}}>
              <Button
                style={{
                  width: 190,
                  height: 50,
                  backgroundColor: '#f6d70e',
                  borderRadius: 10,
                  padding: 3,
                  justifyContent: 'center',
                }}
                mode="contained"
                onPress={() => navigation.navigate('CartScreen')}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    fontSize: 17,
                    textTransform: 'capitalize',
                    color: '#595555',
                  }}>
                  WishList
                </Text>
              </Button>
            </View>
            <View style={{alignItems: 'center'}}>
              <Button
                style={{
                  width: 190,
                  height: 50,
                  backgroundColor: '#f6d70e',
                  borderRadius: 10,
                  padding: 3,
                  justifyContent: 'center',
                }}
                mode="contained"
                onPress={() => navigation.navigate('CartScreen')}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    fontSize: 17,
                    textTransform: 'capitalize',
                    color: '#595555',
                  }}>
                  My Orders
                </Text>
              </Button>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <TouchableOpacity style={styles.section} onPress={handleSavedAddresses}>
          <Text style={styles.sectionTitle}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={handleSavedAddresses}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <TouchableOpacity
          style={styles.section}
          onPress={handleLanguageSelection}>
          <Text style={styles.sectionTitle}>Select Language</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    marginTop: 10,
  },
  editProfileText: {
    color: 'blue',
    marginTop: 5,
  },
  divider: {
    marginVertical: 15,
  },
  section: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
