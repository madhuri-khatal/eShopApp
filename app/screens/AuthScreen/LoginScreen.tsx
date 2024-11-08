import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';

export default function LoginScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login button clicked');
    // Mock authentication logic
    const isAuthenticated = true;

    if (isAuthenticated) {
      console.log('Login successful, navigating to Home');
      // Set auth state in AppNavigator to true or navigate to HomeScreen
    } else {
      console.log('Login failed');
      alert('Login failed');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/image/login.png')} // Replace with your image path
      style={styles.background}
      resizeMode="cover" // Adjust the image to cover the whole screen
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.signupText}>
            Don’t have an account?{' '}
            <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    alignItems: 'center',
    width: '90%',
    borderRadius: 8,
    position: 'absolute',
    bottom: 120,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 16,
  },
  signupContainer: {
    position: 'absolute',
    bottom: 40,
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
  },
  signupLink: {
    fontWeight: 'bold',
  },
});
