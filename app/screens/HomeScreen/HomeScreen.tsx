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
  const categories = [
    {name: 'Category 1', icon: 'shopping', color: '#FF5733'},
    {name: 'Category 2', icon: 'food', color: '#04c426'},
    {name: 'Category 3', icon: 'tshirt-crew', color: '#3357FF'},
    {name: 'Category 4', icon: 'sofa', color: '#FF33A8'},
    {name: 'Category 5', icon: 'car', color: '#FFA533'},
    {name: 'Category 6', icon: 'book', color: '#04c4b4'},
    {name: 'Category 7', icon: 'cellphone', color: '#A533FF'},
    {name: 'Category 8', icon: 'necklace', color: '#FF5733'},
  ];
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

        {/* Location Icon and Delivery Address */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: 5,
            paddingRight: 15,
          }}>
          <MaterialCommunityIcons name="map-marker" color="#e95d2a" size={24} />
          <Text style={{color: '#506574', fontSize: 16, marginLeft: 5}}>
            <Text style={{color: '#a0a1a7', fontSize: 16, marginLeft: 5}}>
              Deliver to :
            </Text>{' '}
            {deliveryAddress}
          </Text>
        </View>
<FeaturedCategories/>
        <ScrollView style={{margin: 5}}>
          <Caraousel
            autoPlay={true}
            onSnapToItem={(i: number) => console.log()}
          />
          <View style={{paddingVertical: 10}}>
            <CouponList />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              lineHeight: 28,
              padding: 10,
              textAlign: 'center',
              color: '#506574',
            }}>
            Why SHG E Shop
          </Text>
          <HomeWhyUs />
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
