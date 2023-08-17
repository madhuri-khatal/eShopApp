import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Avatar, Divider, Appbar, Button, TextInput } from 'react-native-paper';

export default function EditProfileScreen({ navigation }: any) {
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());

  const [username, setUsername] = useState('John Doe');
  const [address, setAddress] = useState('1234 Example Street, City, State 12345, Country');
  const [language, setLanguage] = useState('English');
  const [photoUri, setPhotoUri] = useState(
    'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png'
  );

  const handleSaveProfile = () => {
    // Perform save/update actions here
    navigation.goBack();
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={_handleMore} />
      </Appbar.Header>

      <View style={{ marginTop: 20 }}>
        <View style={styles.profileContainer}>
          <Avatar.Image size={80} source={{ uri: photoUri }} />
          <Button
            mode="outlined"
            onPress={() => console.log('Change Photo')}
            style={{ marginTop: 10 }}>
            Change Photo
          </Button>
        </View>
        <Divider />

        <TextInput
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />

        <TextInput
          label="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          style={styles.input}
        />

        <TextInput
          label="Language"
          value={language}
          onChangeText={(text) => setLanguage(text)}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSaveProfile}
          style={{ marginHorizontal: 20, marginTop: 20 }}>
          Save Profile
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... your other styles ...

  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginHorizontal: 20,
    marginTop: 10,
  },
});
