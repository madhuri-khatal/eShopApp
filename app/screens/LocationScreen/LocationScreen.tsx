// import React, { useState, useEffect } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import GetLocation from 'react-native-get-location';

// const LocationScreen = () => {
//   const [locationData, setLocationData] = useState({
//     state: '',
//     district: '',
//     taluka: '',
//     village: '',
//   });
//   const [loading, setLoading] = useState(true);

//   const fetchLocationData = async () => {
//     try {
//       const location = await GetLocation.getCurrentPosition({
//         enableHighAccuracy: true,
//         timeout: 60000,
//       });

//       const { latitude, longitude } = location;
// console.log(location,"location")
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setLocationData({
//         state: data.address.state || 'N/A',
//         district: data.address.county || 'N/A',
//         taluka: data.address.suburb || 'N/A',
//         village: data.address.village || data.address.town || 'N/A',
//       });
//     } catch (error) {
//       console.error('Error fetching address data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLocationData();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <View>
//           <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Location Information:</Text>
//           <Text>State: {locationData.state}</Text>
//           <Text>District: {locationData.district}</Text>
//           <Text>Taluka: {locationData.taluka}</Text>
//           <Text>Village: {locationData.village}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default LocationScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import GetLocation from 'react-native-get-location';

// Define types for the location data
interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  bearing: number;
  speed: number | null;
  time: number;
  provider: string | number | undefined; // Updated to match GetLocation's return type
}

interface Address {
  state: string;
  district: string;
  taluka: string;
  village: string;
}

interface LocationInfo {
  coordinates: Coordinates | null;
  address: Address;
}

interface LocationScreenProps {
  onLocationUpdate?: (locationInfo: LocationInfo) => void;
}

const LocationScreen: React.FC<LocationScreenProps> = ({ onLocationUpdate }) => {
  const [locationData, setLocationData] = useState<LocationInfo>({
    coordinates: null,
    address: {
      state: '',
      district: '',
      taluka: '',
      village: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocationData = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });

      const coordinates: Coordinates = {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        altitude: location.altitude,
        bearing: location.bearing || 0,
        speed: location.speed,
        time: location.time,
        provider: location.provider // Now accepts number or string or undefined
      };
console.log(coordinates,"coordinates")
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json`
      );
console.log(response,"response")
      if (!response.ok) {
        throw new Error('Failed to fetch address data');
      }

      const data = await response.json();
      
      const addressData: Address = {
        state: data.address?.state || 'N/A',
        district: data.address?.county || 'N/A',
        taluka: data.address?.suburb || 'N/A',
        village: data.address?.village || data.address?.town || 'N/A'
      };

      const locationInfo: LocationInfo = {
        coordinates,
        address: addressData
      };
      
      setLocationData(locationInfo);
      
      if (onLocationUpdate) {
        onLocationUpdate(locationInfo);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error fetching location:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocationData();

    const intervalId = setInterval(getLocationData, 300000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Current Location</Text>
        
        <View style={styles.coordinatesContainer}>
          <View style={styles.coordinateItem}>
            <Text style={styles.label}>Latitude:</Text>
            <Text style={styles.value}>
              {locationData.coordinates?.latitude.toFixed(6)}
            </Text>
          </View>
          <View style={styles.coordinateItem}>
            <Text style={styles.label}>Longitude:</Text>
            <Text style={styles.value}>
              {locationData.coordinates?.longitude.toFixed(6)}
            </Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.subtitle}>Address Details</Text>
          <View style={styles.addressGrid}>
            <View style={styles.addressItem}>
              <Text style={styles.label}>State:</Text>
              <Text style={styles.value}>{locationData.address.state}</Text>
            </View>
            <View style={styles.addressItem}>
              <Text style={styles.label}>District:</Text>
              <Text style={styles.value}>{locationData.address.district}</Text>
            </View>
            <View style={styles.addressItem}>
              <Text style={styles.label}>Taluka:</Text>
              <Text style={styles.value}>{locationData.address.taluka}</Text>
            </View>
            <View style={styles.addressItem}>
              <Text style={styles.label}>Village:</Text>
              <Text style={styles.value}>{locationData.address.village}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  coordinatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  coordinateItem: {
    flex: 1,
  },
  addressContainer: {
    marginTop: 8,
  },
  addressGrid: {
    gap: 8,
  },
  addressItem: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LocationScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import GetLocation from 'react-native-get-location';

// const LocationScreen = ({ onLocationUpdate }) => {
//   const [locationData, setLocationData] = useState({
//     coordinates: null,
//     address: {
//       state: '',
//       district: '',
//       taluka: '',
//       village: ''
//     }
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const getLocationData = async () => {
//     try {
//       // Get current location using GetLocation library
//       const location = await GetLocation.getCurrentPosition({
//         enableHighAccuracy: true,
//         timeout: 60000,
//       });

//       // Store coordinates
//       const coordinates = {
//         latitude: location.latitude,
//         longitude: location.longitude,
//         accuracy: location.accuracy,
//         altitude: location.altitude,
//         bearing: location.bearing || 0,
//         speed: location.speed,
//         time: location.time,
//         provider: location.provider
//       };

//       // Fetch address details from OpenStreetMap
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json`
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch address data');
//       }

//       const data = await response.json();
      
//       // Structure address data
//       const addressData = {
//         state: data.address.state || 'N/A',
//         district: data.address.county || 'N/A',
//         taluka: data.address.suburb || 'N/A',
//         village: data.address.village || data.address.town || 'N/A'
//       };

//       // Update state with location and address data
//       const locationInfo = {
//         coordinates,
//         address: addressData
//       };
      
//       setLocationData(locationInfo);
      
//       // Notify parent component if callback is provided
//       if (onLocationUpdate) {
//         onLocationUpdate(locationInfo);
//       }
//     } catch (error) {
//       console.error('Error fetching location:', error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch location data when component mounts
//   useEffect(() => {
//     getLocationData();

//     // Optional: Set up location updates every 5 minutes
//     const intervalId = setInterval(getLocationData, 300000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text style={styles.loadingText}>Getting your location...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Current Location</Text>
        
//         <View style={styles.coordinatesContainer}>
//           <View style={styles.coordinateItem}>
//             <Text style={styles.label}>Latitude:</Text>
//             <Text style={styles.value}>
//               {locationData.coordinates?.latitude.toFixed(6)}
//             </Text>
//           </View>
//           <View style={styles.coordinateItem}>
//             <Text style={styles.label}>Longitude:</Text>
//             <Text style={styles.value}>
//               {locationData.coordinates?.longitude.toFixed(6)}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.addressContainer}>
//           <Text style={styles.subtitle}>Address Details</Text>
//           <View style={styles.addressGrid}>
//             <View style={styles.addressItem}>
//               <Text style={styles.label}>State:</Text>
//               <Text style={styles.value}>{locationData.address.state}</Text>
//             </View>
//             <View style={styles.addressItem}>
//               <Text style={styles.label}>District:</Text>
//               <Text style={styles.value}>{locationData.address.district}</Text>
//             </View>
//             <View style={styles.addressItem}>
//               <Text style={styles.label}>Taluka:</Text>
//               <Text style={styles.value}>{locationData.address.taluka}</Text>
//             </View>
//             <View style={styles.addressItem}>
//               <Text style={styles.label}>Village:</Text>
//               <Text style={styles.value}>{locationData.address.village}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#444',
//   },
//   coordinatesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   coordinateItem: {
//     flex: 1,
//   },
//   addressContainer: {
//     marginTop: 8,
//   },
//   addressGrid: {
//     gap: 8,
//   },
//   addressItem: {
//     marginBottom: 8,
//   },
//   label: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 2,
//   },
//   value: {
//     fontSize: 16,
//     color: '#333',
//   },
//   loadingText: {
//     marginTop: 8,
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default LocationScreen;