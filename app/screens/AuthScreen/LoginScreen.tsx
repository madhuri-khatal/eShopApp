import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';

export default function LoginScreen({ navigation,setIsAuthenticated }:any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Login button clicked', username, password);

    // API endpoint
    const url = 'https://www.shgeshop.com/wp-json/custom-plugin/login?consumer_key=ck_0804ba0030b98114351ea0a6f81ee1e5aad619fa&consumer_secret=cs_1a85e2f6225da1384bd1dd73c98c77f46fe2e262';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
console.log(data,"data");
      if (response.ok || data.success) { 
             setIsAuthenticated(true); 
             await AsyncStorage.setItem('isAuthenticated', 'true');
      } else {
        console.log('Login failed:', data.message);
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
          } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/image/login.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="username"
          placeholderTextColor="#ccc"
          keyboardType="default"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
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
          onPress={() => navigation.navigate('SignupScreen')}
        >
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={styles.signupLink}>Sign Up</Text>
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


















// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   ImageBackground,
// } from 'react-native';

// export default function LoginScreen({navigation}: any) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     console.log('Login button clicked',username,password);
//     // Mock authentication logic
//     const isAuthenticated = true;

//     if (isAuthenticated) {
//       console.log('Login successful, navigating to Home');
//       // Set auth state in AppNavigator to true or navigate to HomeScreen
//     } else {
//       console.log('Login failed');
//       alert('Login failed');
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../../assets/image/login.png')} // Replace with your image path
//       style={styles.background}
//       resizeMode="cover" // Adjust the image to cover the whole screen
//     >
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           placeholder="username"
//           placeholderTextColor="#ccc"
//           keyboardType="default"
//           value={username}
//           onChangeText={setUsername}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="password"
//           placeholderTextColor="#ccc"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />

//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//           <Text style={styles.loginButtonText}>Login</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.signupContainer}
//           onPress={() => navigation.navigate('SignupScreen')}>
//           <Text style={styles.signupText}>
//             Don’t have an account?{' '}
//             <Text style={styles.signupLink}>Sign Up</Text>
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   input: {
//     width: '90%',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   loginButton: {
//     backgroundColor: 'white',
//     paddingVertical: 12,
//     alignItems: 'center',
//     width: '90%',
//     borderRadius: 8,
//     position: 'absolute',
//     bottom: 120,
//   },
//   loginButtonText: {
//     color: 'black',
//     fontSize: 16,
//   },
//   signupContainer: {
//     position: 'absolute',
//     bottom: 40,
//   },
//   signupText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   signupLink: {
//     fontWeight: 'bold',
//   },
// });
