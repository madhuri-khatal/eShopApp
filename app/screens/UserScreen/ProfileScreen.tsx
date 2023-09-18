import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {
  CommonActions,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import {Avatar, Divider, Appbar, Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RandomAvatar from '../../components/ui/RandomAvtar';
import {ScrollView} from 'react-native-gesture-handler';

export default function ProfileScreen(props: any) {
  // const {navigation} = props;
  const navigation: any = useNavigation();
  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const address = '1234 Example Street, City, State 12345, Country';
  return (
    <ScrollView>
      <View>
        <Appbar.Header>
          <Appbar.Action icon="arrow" onPress={_goBack} />
          <Appbar.Content title="Profile" titleStyle={{fontSize: 18}} />
          <Appbar.Action icon="menu" onPress={_handleMore} />
        </Appbar.Header>

        <View style={{marginTop: 15}}>
          <View style={{alignItems: 'center', marginBottom: 10}}>
            <RandomAvatar />
            <Text style={styles.userName}>John Doe</Text>

            <View
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                marginTop: 15,

                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center', marginRight: 5}}>
                <Button
                  style={{
                    width: 190,
                    height: 50,
                    backgroundColor: '#f7c6b2',
                    borderRadius: 10,
                    padding: 3,
                    justifyContent: 'center',
                  }}
                  mode="contained"
                  onPress={() => {
                    navigation.getParent('main').navigate('BottomTab', {
                      screen: 'CartStack',
                      initial: false,
                    });
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      fontSize: 17,
                      textTransform: 'capitalize',
                      color: '#f25616',
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
                    backgroundColor: '#f7c6b2',
                    borderRadius: 10,
                    padding: 3,
                    justifyContent: 'center',
                  }}
                  mode="contained"
                  onPress={() =>
                    navigation.getParent('main').navigate('OrderScreen')
                  }>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      fontSize: 17,
                      textTransform: 'capitalize',
                      color: '#f25616',
                    }}>
                    My Orders
                  </Text>
                </Button>
              </View>
            </View>
          </View>

          <View style={{paddingHorizontal: 10}}>
            <MaterialCommunityIcons
              name="pencil"
              size={24}
              color="#f25616"
              style={{marginLeft: 350}}
              onPress={() => navigation.navigate('EditProfileScreen')}
            />
            <View style={styles.addressSection}>
              <View style={{flexDirection: 'row', marginTop: -10}}>
                <Text style={styles.sectionTitle}>Current Address</Text>
              </View>
              <Text style={styles.addressText}>
                123 Demo Street Cityville, DemoState Country: DemoLand Postal
                Code: 12345
              </Text>
            </View>
            <Divider />

            <View style={styles.addressSection}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.sectionTitle}>Email Id</Text>
              </View>
              <Text style={styles.addressText}>a@gmail.com</Text>
            </View>

            <Divider />

            <View style={styles.addressSection}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.sectionTitle}>Contact Number</Text>
              </View>
              <Text style={styles.addressText}>98765 43210</Text>
            </View>
          </View>

          <View style={{alignItems: 'center', marginRight: 5}}>
            <Button
              style={{
                width: 190,
                height: 50,
                backgroundColor: '#f7c6b2',
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
                  color: '#f25616',
                }}>
                Log Out
              </Text>
            </Button>
          </View>
          <View style={{alignItems: 'center', marginRight: 5}}>
            <Button
              style={{
                width: 190,
                height: 50,
                backgroundColor: '#f7c6b2',
                borderRadius: 10,
                padding: 3,
                justifyContent: 'center',
              }}
              mode="contained"
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text
                style={{
                  fontWeight: 'bold',
                  justifyContent: 'center',
                  fontSize: 17,
                  textTransform: 'capitalize',
                  color: '#f25616',
                }}>
                Log Out
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    paddingVertical: 15,
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
