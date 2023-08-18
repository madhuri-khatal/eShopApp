import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Avatar, Divider, Appbar, Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function ProfileScreen(props: any) {
  // const {navigation} = props;
  const navigation: any = useNavigation();
  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const address = '1234 Example Street, City, State 12345, Country';
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
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
                onPress={() => navigation.navigate('OrderScreen')}>
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
        <Divider />

        <View style={styles.addressSection}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={styles.sectionTitle}>Current Address</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="pencil"
                size={24}
                color="gray"
                style={{marginLeft: 25}}
              />
            </View>
          </View>
          <Text style={styles.addressText}>{address}</Text>
        </View>
        <Divider />
        <View style={styles.addressSection}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={styles.sectionTitle}>Gender</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="pencil"
                size={24}
                color="gray"
                style={{marginLeft: 25}}
              />
            </View>
          </View>
          <Text style={styles.addressText}>Female</Text>
        </View>
        <Divider />
        <View style={styles.addressSection}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={styles.sectionTitle}>Selected Language</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="pencil"
                size={24}
                color="gray"
                style={{marginLeft: 25}}
              />
            </View>
          </View>
          <Text style={styles.addressText}>English</Text>
        </View>
        <Divider />
        <View style={styles.addressSection}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={styles.sectionTitle}>Contact Number</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="pencil"
                size={24}
                color="gray"
                style={{marginLeft: 25}}
              />
            </View>
          </View>
          <Text style={styles.addressText}>+91 90876 54321</Text>
        </View>
        <Divider />
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
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  addressText: {
    fontSize: 16,
    marginTop: 10,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
