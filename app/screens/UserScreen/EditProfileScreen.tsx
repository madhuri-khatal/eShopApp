import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {Avatar, Divider, Appbar, Button, TextInput} from 'react-native-paper';
import RandomAvatar from '../../components/ui/RandomAvtar';
import {ScrollView} from 'react-native-gesture-handler';

export default function EditProfileScreen({navigation}: any) {
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());

  const [email, setEmail] = useState('A@gmail.com');
  const [address, setAddress] = useState(
    '1234 Example Street, City, State 12345, Country',
  );
  const [contact, setContact] = useState('9090908978');
  const [photoUri, setPhotoUri] = useState(
    'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png',
  );

  const handleSaveProfile = () => {
    // Perform save/update actions here
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View>
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={_handleMore} />
        </Appbar.Header>

        <View style={{marginTop: 20}}>
          <RandomAvatar />
          <View style={styles.profileContainer}></View>

          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />

          <TextInput
            label="Address"
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.input}
          />

          <TextInput
            label="Contact No"
            value={contact}
            onChangeText={text => setContact(text)}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSaveProfile}
            style={{marginHorizontal: 20, marginTop: 20}}>
            Save Profile
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 15,
  },
});
