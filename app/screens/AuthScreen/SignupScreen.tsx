
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

export default function SignupScreen({navigation}: any) {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // Format payload according to WooCommerce API requirements
    const payload = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password
    };

    console.log('Signup button clicked', payload);
    const url = 'https://www.shgeshop.com/wp-json/wc/v3/customers?consumer_key=ck_0804ba0030b98114351ea0a6f81ee1e5aad619fa&consumer_secret=cs_1a85e2f6225da1384bd1dd73c98c77f46fe2e262';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send payload directly, not wrapped in an array
      });

      const data = await response.json();
      console.log(data, "data");
      
      if (response.ok || data.success) { 
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Registration Failed', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Sign Up</Text>
      <Text style={styles.headerText}>Create your Account</Text>

      <View style={styles.nameContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="First Name"
          value={first_name}
          onChangeText={setFirst_name}
          placeholderTextColor="#A49794"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Last Name"
          value={last_name}
          onChangeText={setLast_name}
          placeholderTextColor="#A49794"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#A49794"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A49794"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A49794"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: '#131313',
    fontSize: 48,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginTop: -280
  },
  headerText: {
    fontSize: 20,
    color: '#131313',
    fontFamily: 'Arial',
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    marginTop: 100,
    width: '100%',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FCEDE8',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Arial',
  },
  halfInput: {
    width: '48%',
  },
  signupButton: {
    backgroundColor: '#F04D24',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    position: 'absolute',
    // top:630
    bottom: 120,
  },
  signupButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  loginContainer: {
    position: 'absolute',
    bottom: 90,
  },
  loginText: {
    color: '#F04D24',
    fontSize: 20,
  },
  loginLink: {
    fontWeight: 'bold',
  },
});












































// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   ImageBackground,
//   Alert,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// export default function SignupScreen({navigation}: any) {
//   const [first_name, setFirst_name] = useState('');
//   const[last_name,setLast_name]=useState('');
//   const[username,setUsername]=useState('');
//   const[email,setEmail]=useState('');
//   const [password, setPassword] = useState('');
//   const payload =[first_name,last_name,username,email,password]
//   const handleSignup = async () => {
//     console.log('Signup button clicked',payload);
//     const url = 'https://www.shgeshop.com/wp-json/wc/v3/customers?consumer_key=ck_0804ba0030b98114351ea0a6f81ee1e5aad619fa&consumer_secret=cs_1a85e2f6225da1384bd1dd73c98c77f46fe2e262';
    
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           payload
//         }),
//       });

//       const data = await response.json();
// console.log(data,"data");
//       if (response.ok || data.success) { 
//         navigation.navigate('LoginScreen');
//       } else {
//                Alert.alert('registartion Failed', data.message);
//       }
//           } catch (error) {
//       console.error('Error during registartion:', error);
//       Alert.alert('Error', 'Something went wrong. Please try again later.');
//     }
//   };

//   return (
//     // <ImageBackground
//     //   source={require('../../../assets/image/login.jpg')} // Replace with your image path
//     //   style={styles.background}
//     //   resizeMode="cover" // Adjust the image to cover the whole screen
//     // >
//       <View style={styles.container}>
//         <Text style={styles.headerTitle}>Sign Up</Text>
//         <Text style={styles.headerText}>Create your Account</Text>

//         <View style={styles.nameContainer}>
       
//           <TextInput
//             style={[styles.input, styles.halfInput]}
//             placeholder="First Name"
//             value={first_name}
//             onChangeText={setFirst_name}
//             placeholderTextColor="#A49794"
//           />
//           <TextInput
//             style={[styles.input, styles.halfInput]}
//             placeholder="Last Name"
//             value={last_name}
//             onChangeText={setLast_name}
//             placeholderTextColor="#A49794"
//           />
//         </View>
//         <TextInput
//             style={styles.input}
//             placeholder="Username"
//             value={username}
//             onChangeText={setUsername}
//             placeholderTextColor="#A49794"
//           />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor="#A49794"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#A49794"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
//           <Text style={styles.signupButtonText}>Sign Up</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.loginContainer}
//           onPress={() => navigation.navigate('LoginScreen')}>
//           <Text style={styles.loginText}>
//             Already have an account? <Text style={styles.loginLink}>Login</Text>
//           </Text>
//         </TouchableOpacity>
//       </View>
//     // </ImageBackground>
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
//     paddingHorizontal: 10,
//     // marginTop:60,
//     // backgroundColor:'#ccc'
//   },
//   headerTitle:{
//     // fontSize: 24,
//     color: '#131313',
//     // marginBottom: 20,
//     fontSize: 48,
//     fontFamily:'Arial',
//     fontWeight:'bold',
//     marginTop:-280
//   },
//   headerText: {
//     fontSize: 20,
//     color: '#131313',
//     fontFamily:'Arial',
//     marginBottom: 20,
//     // fontWeight:'bold'
//   },
//   nameContainer: {
//     flexDirection: 'row',
//     marginTop:100,
//     width: '100%',
//     justifyContent: 'space-between',
//   },
//   input: {
//     width: '100%',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     backgroundColor: '#FCEDE8',
//     borderRadius: 8,
//     marginBottom: 15,
//     fontSize: 16,
//     fontFamily:'Arial',
//   },
//   halfInput: {
//     width: '48%', // Each input takes up half the width with a small margin for spacing
//   },
//   signupButton: {
//     // backgroundColor: 'white',
//     backgroundColor:'#F04D24',
//     paddingVertical: 12,
   
//     paddingHorizontal: 40,
//     borderRadius: 8,
//     position: 'absolute',
//     bottom: 140,
//   },
//   signupButtonText: {
//     // color: 'black',
//     color:"#ffffff",
//     fontSize: 16,
//   },
//   loginContainer: {
//     position: 'absolute',
//     bottom: 90,
//   },
//   loginText: {
//     color: '#F04D24',
//     fontSize: 20,
//   },
//   loginLink: {
//     fontWeight: 'bold',
//   },
// });
