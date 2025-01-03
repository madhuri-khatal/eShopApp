import {View, Image, TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Appbar, FAB, IconButton, Text} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import FeaturedCategories from '../../components/Product/FeaturedCategories';
import HomeWhyUs from '../../components/Product/HomeWhyUs';
import CouponList from '../../components/Product/CouponList';
import Festival from '../../components/Product/Festival';
import Footer from '../../components/Product/Footer';
import ListOFProducts from '../../screens/ProductScreen/ProductDetailsScreen/ListOFProducts';
import {Caraousel} from '../../components/ui/Caraousel';
import {useProductContext} from './../../context/ProductContext';
import {Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing MaterialCommunityIcons

import LocationScreen from '../LocationScreen/LocationScreen';
import BrandCarousel from './BrandCarousel';

interface LocationData {
  accuracy: number;
  altitude: number;
  bearing: number;
  latitude: number;
  longitude: number;
  provider: string;
  speed: number;
  time: number;
  location: any;
}
export default function HomeScreen({navigation}: any) {
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const {images, getHomeSlider} = useProductContext();
  const [searchText, setSearchText] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(
    '123 Main St, Mumbai, lorem 123 Main St, Mumbai, lorem',
  );

  useEffect(() => {
    getHomeSlider();
  }, [images]);

  const handleWhatsAppLink = (id: number | string, message: string = '') => {
    const whatsappLink = `https://wa.me/${id}?text=${encodeURIComponent(
      message,
    )}`;
    Linking.openURL(whatsappLink);
  };

  const whatsappSupport = async () => {
    await handleWhatsAppLink('7558566436');
  };
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 60000,
  // })
  // .then(location => {
  //     console.log(location,"location");
  // })
  // .catch(error => {
  //     const { code, message } = error;
  //     console.warn(code, message);
  // })
  return (
    <>
      <ScrollView>
        <Appbar.Header mode="small">
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search..."
              style={{
                flex: 1,
                borderWidth: 1,
                backgroundColor: '#fff',
                borderColor: '#e0e0e0',
                borderRadius: 8,
                paddingHorizontal: 10,
                height: 40,
                color: '#000',
              }}
            />
            <IconButton
              icon="microphone"
              iconColor="#506574"
              size={24}
              // onPress={startListening}
            />
          </View>
          <Appbar.Action
            icon="menu"
            color="#506574"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        </Appbar.Header>
        {/* <LocationScreen /> */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            // padding: 4,
            // margin:10
            paddingRight: 15,
            marginBottom:10,
              // backgroundColor:'#F2F2F2'
          }}>
          <MaterialCommunityIcons name="map-marker" color="#e95d2a" size={40} />
          <Text style={{color: '#a0a1a7', fontSize: 19, marginLeft: 5}}>
            <Text style={{color: '#506574', fontSize: 18, marginLeft: 5,fontWeight:'bold'}}>
             Your Location : 
            </Text>{' '}
            {deliveryAddress}
          </Text>
        </View>

        <ScrollView style={{marginTop: 2}}>
                 
          <Caraousel
            autoPlay={true}
            // onSnapToItem={(i: number) => console.log()}
          />
          <FeaturedCategories />
          <View style={{paddingVertical: 10}}>
            <CouponList />
          </View>
          <ListOFProducts />
          {/* <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              lineHeight: 28,
              padding: 10,
              textAlign: 'center',
              color: '#506574',
            }}>
            Why SHG E Shop
          </Text> */}
          <HomeWhyUs />
          <BrandCarousel/>
          <Footer />
        </ScrollView>

        <FAB
          icon="whatsapp"
          color="#ffffff"
          style={{
            position: 'absolute',
            margin: 10,
            right: 5,
            bottom: 3,
            backgroundColor: '#e95d2a',
          }}
          onPress={whatsappSupport}
        />
      </ScrollView>
    </>
  );
}

// import {View, Image} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
// import React, {useEffect, useState} from 'react';
// import {Appbar, FAB, IconButton, Text, TextInput} from 'react-native-paper';
// import {DrawerActions} from '@react-navigation/native';
// import FeaturedCategories from '../../components/Product/FeaturedCategories';
// import HomeWhyUs from '../../components/Product/HomeWhyUs';
// import CouponList from '../../components/Product/CouponList';
// import Festival from '../../components/Product/Festival';
// import Footer from '../../components/Product/Footer';
// import ListOFProducts from '../../screens/ProductScreen/ProductDetailsScreen/ListOFProducts';
// import {Caraousel} from '../../components/ui/Caraousel';
// import {CaraouselContent} from '../../components/ui/CaraouselContent';
// import {useProductContext} from './../../context/ProductContext';
// import {Linking} from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// export default function HomeScreen({navigation}: any) {
//   const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());
//   const {images, getHomeSlider} = useProductContext();
//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     getHomeSlider();
//   }, [images]);

//   const handleWhatsAppLink = (id: number | string, message: string = '') => {
//     const whatsappLink = `https://wa.me/${id}?text=${encodeURIComponent(
//       message,
//     )}`;
//     Linking.openURL(whatsappLink);
//   };
//   const whatsappSupport = async () => {
//     // const defaultMessage = `Order ID:  - Hey,ShgeShop I Want To Cancel My Order.`;
//     await handleWhatsAppLink('7558566436');
//   };
//   const [deliveryAddress, setDeliveryAddress] = useState(
//     '123 Main St, Mumbai, lorem 123 Main St, Mumbai, lorem',
//   );
//   return (
//     <>
//       <ScrollView>
//       <Appbar.Header mode="small">
//           <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
//             <TextInput
//               value={searchText}
//               onChangeText={setSearchText}
//               placeholder="Search..."
//               style={{
//                 flex: 1,
//                 borderWidth: 1,
//                 backgroundColor: '#fff',
//                 borderColor: '#E0E0E0',
//                 borderRadius: 8,
//                 paddingHorizontal: 10,
//                 height: 40,
//                 color: '#000',
//               }}
//             />
//             <IconButton
//               icon="microphone"
//               iconColor="#506574"
//               size={24}
//               // onPress={startListening}
//             />
//           </View>
//           <Appbar.Action
//             icon="menu"
//             color="#506574"
//             onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//           />
//         </Appbar.Header>
//          <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'flex-start',
//             padding: 5,
//             paddingRight: 15,
//           }}>
//           <MaterialCommunityIcons name="map-marker" color="#E95D2A" size={24} />
//           <Text style={{color: '#506574', fontSize: 16, marginLeft: 5}}>
//             <Text style={{color: '#A0A1A7', fontSize: 16, marginLeft: 5}}>
//               Deliver to :
//             </Text>{' '}
//             {deliveryAddress}
//           </Text>
//         </View>
//         <FeaturedCategories />
//         <ScrollView style={{margin: 5}}>
//                    <Caraousel
//             // Component={CaraouselContent}
//             // data={images}
//             autoPlay={true}
//             onSnapToItem={(i: number) => console.log()}
//           />
//            <View style={{paddingVertical: 10}}>
//                       <CouponList />
//           </View>
//           {/* <FeaturedCategories/> */}
//           {/* <Festival /> */}
//           {/* <ListOFProducts /> */}

//           <Text
//             style={{
//               fontSize: 20,
//               fontWeight: 'bold',
//               lineHeight: 28,
//               padding: 10,
//               textAlign: 'center',
//               color: '#506574',
//             }}>
//             Why SHG E Shop
//           </Text>
//           <HomeWhyUs />
//           <Footer />
//         </ScrollView>
//         <FAB
//           icon="whatsapp"
//           color="#FFFFFF"
//           style={{
//             position: 'absolute',
//             margin: 10,
//             right: 5,
//             bottom: 3,
//             backgroundColor: '#E95D2A',
//           }}
//           onPress={whatsappSupport}
//         />
//       </ScrollView>
//     </>
//   );
// }
