import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  Easing,
} from 'react-native';

const { width } = Dimensions.get('window');

interface BrandLogo {
  id: number;
  name: string;
  imageUrl: string;
  backgroundColor: string;
  alt:string;
}

const BrandCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const brands: BrandLogo[] = [
    { id: 1, name: "Umed", alt:"UmedLogo",imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCwor662eBdJBDBfGMVkwfI7bwbJhPHFvEA&s", backgroundColor: '#ffffff' },
    { id: 2, name: "Muktai",alt:"Muktai Logo", imageUrl: "https://yt3.googleusercontent.com/7ttQ9TPfdU640l244KfGxNSINhwSPGB4K8gr5IoG8THTsAx_oozJxYPjIWtMc-uRkUrS5VEr=s900-c-k-c0x00ffffff-no-rj", backgroundColor: '#ffffff' },
    { id: 3, name: "BMC", alt:"BMC Logo", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BMC_MUMBAI_LOGO.png/640px-BMC_MUMBAI_LOGO.png", backgroundColor: '#ffffff' },
    { id: 4, name: "Symbiosis",alt:"SymbiosisLogo", imageUrl: "https://shgeshop.com/wp-content/uploads/2024/06/1.png", backgroundColor: '#ffffff' },
    { id: 5, name: "Mavim", alt:"MAvimLogo",imageUrl: "https://media.licdn.com/dms/image/v2/C510BAQHHXz3fiugHbA/company-logo_200_200/company-logo_200_200/0/1630587221309?e=2147483647&v=beta&t=XkpFbQYCGYKDJOw87ov6f1T_aw9dyANwXXQ7mUhv1TA", backgroundColor: '#ffffff' },
    { id: 6, name: "BGMF", alt:"BFMFLogo",imageUrl: "https://lessonresearch.net/wp-content/uploads/2018/08/bill-melinda-gates-foundation-logo-png-transparent.png", backgroundColor: '#ffffff' },
    { id: 7, name: "M&S", alt:"M&SLogo",imageUrl: "https://shgeshop.com/wp-content/uploads/2024/09/marksandspencer.jpg", backgroundColor: '#ffffff' },
    { id: 8, name: "DHL", alt:"DHLLogo",imageUrl: "https://shgbazaar.com/cdn/shop/files/dhl_medium.png?v=1731403828", backgroundColor: '#ffffff' },
    { id: 9, name: "HDFC", alt:"HDFCLogo",imageUrl: "https://shgbazaar.com/cdn/shop/files/hdfc_medium.png?v=1731404017", backgroundColor: '#ffffff' },
  ];

  // Calculate total width for animation
  const LOGO_WIDTH = 140; // Width of logo container including margins
  const TOTAL_WIDTH = LOGO_WIDTH * brands.length;

  useEffect(() => {
    const createInfiniteLoop = () => {
      const ANIMATION_DURATION = 20000; // Adjust speed here
      
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollX, {
            toValue: -TOTAL_WIDTH,
            duration: ANIMATION_DURATION,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
          }),
          // Reset position instantly
          Animated.timing(scrollX, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
            isInteraction: false,
          })
        ])
      ).start();
    };

    createInfiniteLoop();

    return () => {
      scrollX.stopAnimation();
    };
  }, [TOTAL_WIDTH]);

  const renderBrandRow = () => {
    const tripleLogos = [...brands, ...brands, ...brands]; // Triple for smooth infinite scroll
    
    return (
      <Animated.View
        style={[
          styles.row,
          {
            transform: [{ translateX: scrollX }],
          },
        ]}
      >
        {tripleLogos.map((brand, index) => (
          <View 
            key={`${brand.id}-${index}`} 
            style={[styles.brandContainer, { backgroundColor: brand.backgroundColor }]}
          >
            <Image
              source={{ uri: brand.imageUrl }}
              alt={brand.alt}
              style={styles.brandLogo}
              resizeMode="contain"
            />
            <Text style={styles.name}>{brand.name}</Text>
          </View>
        ))}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Trusted By Leading Brands</Text>
        </View>

        <View style={styles.carouselContainer}>
          {renderBrandRow()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    backgroundColor:'#F2F2F2'
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: '#262626',
    color:'#5C5C5C',
    // marginBottom: 8,
  },
  name: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  carouselContainer: {
    height: 130,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandContainer: {
    width: 100,
    height: 100,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  brandLogo: {
    width: '100%',
    height: '80%',
  },
});

export default BrandCarousel;





















// import React, { useEffect, useRef } from 'react';
// import { Text } from 'react-native';
// import {
//   View,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   Image,
//   SafeAreaView,
//   Easing,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// interface BrandLogo {
//   id: number;
//   name: string;
//   imageUrl: string;
//   backgroundColor:any;
// }

// const BrandCarousel = () => {
//   // First animation for the first row
//   const scrollX = useRef(new Animated.Value(0)).current;
//   // Second animation for the second row (moving in opposite direction)
//   const scrollX2 = useRef(new Animated.Value(0)).current;

//   // Sample brand logos - replace with your actual logos
//   const brands: BrandLogo[] = [
//     //    { id: 1, name: "Umed", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCwor662eBdJBDBfGMVkwfI7bwbJhPHFvEA&s", backgroundColor: '#ffddc1' },
//     // { id: 2, name: "Muktai", imageUrl: "https://yt3.googleusercontent.com/7ttQ9TPfdU640l244KfGxNSINhwSPGB4K8gr5IoG8THTsAx_oozJxYPjIWtMc-uRkUrS5VEr=s900-c-k-c0x00ffffff-no-rj", backgroundColor: '#ffe4b3' },
//     // { id: 3, name: "BMC", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BMC_MUMBAI_LOGO.png/640px-BMC_MUMBAI_LOGO.png", backgroundColor: '#e6f7ff' },
//     // { id: 4, name: "Symbiosis", imageUrl: "https://e7.pngegg.com/pngimages/338/388/png-clipart-symbiosis-law-school-symbiosis-institute-of-business-management-savitribai-phule-pune-university-fergusson-college-university-miscellaneous-text.png", backgroundColor: '#f0e4ff' },
//     // { id: 5, name: "Mavim", imageUrl: "https://media.licdn.com/dms/image/v2/C510BAQHHXz3fiugHbA/company-logo_200_200/company-logo_200_200/0/1630587221309?e=2147483647&v=beta&t=XkpFbQYCGYKDJOw87ov6f1T_aw9dyANwXXQ7mUhv1TA", backgroundColor: '#f2ffe6' },
//     // { id: 6, name: "bill-melinda-gates-foundation", imageUrl: "https://lessonresearch.net/wp-content/uploads/2018/08/bill-melinda-gates-foundation-logo-png-transparent.png", backgroundColor: '#e6f2ff' },
//     // { id: 7, name: "M&S", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Marks_%26_Spencer_new_logo.svg", backgroundColor: '#ffe6e6' },
 
//     { id: 1, name: "Umed", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCwor662eBdJBDBfGMVkwfI7bwbJhPHFvEA&s", backgroundColor: '#ffffff' },
//     { id: 2, name: "Muktai", imageUrl: "https://yt3.googleusercontent.com/7ttQ9TPfdU640l244KfGxNSINhwSPGB4K8gr5IoG8THTsAx_oozJxYPjIWtMc-uRkUrS5VEr=s900-c-k-c0x00ffffff-no-rj", backgroundColor: '#ffffff' },
//     { id: 3, name: "BMC", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BMC_MUMBAI_LOGO.png/640px-BMC_MUMBAI_LOGO.png", backgroundColor: '#ffffff' },
//     { id: 4, name: "Symbiosis", imageUrl: "https://e7.pngegg.com/pngimages/338/388/png-clipart-symbiosis-law-school-symbiosis-institute-of-business-management-savitribai-phule-pune-university-fergusson-college-university-miscellaneous-text.png", backgroundColor: '#ffffff' },
//     { id: 5, name: "Mavim", imageUrl: "https://media.licdn.com/dms/image/v2/C510BAQHHXz3fiugHbA/company-logo_200_200/company-logo_200_200/0/1630587221309?e=2147483647&v=beta&t=XkpFbQYCGYKDJOw87ov6f1T_aw9dyANwXXQ7mUhv1TA", backgroundColor: '#ffffff' },
//     { id: 6, name: "bill-melinda-gates-foundation", imageUrl: "https://lessonresearch.net/wp-content/uploads/2018/08/bill-melinda-gates-foundation-logo-png-transparent.png", backgroundColor: '#ffffff' },
//     { id: 7, name: "M&S", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Marks_%26_Spencer_new_logo.svg", backgroundColor: '#ffffff' },
//   ];

//   // Double the brands array for seamless looping
//   const extendedBrands = [...brands, ...brands];

//   useEffect(() => {
//     // Animation config
//     const ANIMATION_DURATION = 20000; // 20 seconds for one complete cycle

//     // First row animation
//     Animated.loop(
//       Animated.timing(scrollX, {
//         toValue: -width,
//         duration: ANIMATION_DURATION,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();

//     // Second row animation (opposite direction)
//     Animated.loop(
//       Animated.timing(scrollX2, {
//         toValue: width,
//         duration: ANIMATION_DURATION,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();

//     return () => {
//       // Cleanup animations on unmount
//       scrollX.stopAnimation();
//       scrollX2.stopAnimation();
//     };
//   }, []);

//   const renderBrandRow = (
//     animatedValue: Animated.Value,
//     startIndex: number,
//     endIndex: number
//   ) => (
//     <Animated.View
//       style={[
//         styles.row,
//         {
//           transform: [{ translateX: animatedValue }],
//         },
//       ]}
//     >
//       {extendedBrands.slice(startIndex, endIndex).map((brand) => (
//         <View key={`${brand.id}-${startIndex}`} style={[styles.brandContainer, { backgroundColor: brand.backgroundColor }]}>
//           <Image
//             source={{ uri: brand.imageUrl }}
//             style={styles.brandLogo}
//             resizeMode="contain"
//           />
//           <Text style={styles.name}>{brand.name}</Text>
//         </View>
//       ))}
//     </Animated.View>
//   );

//   return (
//     <>

//     <SafeAreaView style={styles.container}>
//     {/* <View style={{backgroundColor:'#8F827F',borderTopLeftRadius:100,borderBottomRightRadius:100}}> */}
//       <View style={styles.content}>
//         <View style={styles.header}>
//           <Text style={styles.title}
//           >Trusted by Leading Brands</Text>
//           {/* <Text style={styles.subtitle}>
//             They trust us now your turn
//             {/* Join thousands of companies using our platform */}
//           {/* </Text> */} 
//         </View>

//         <View style={styles.carouselContainer}>
//           {/* First row of logos */}
//           <View style={styles.rowContainer}>
//             {renderBrandRow(scrollX, 0, brands.length)}
//             {renderBrandRow(scrollX, 0, brands.length)}
//           </View>

//           {/* Second row of logos (moving in opposite direction) */}
//           <View style={styles.rowContainer}>
//             {renderBrandRow(scrollX2, brands.length / 3, brands.length + brands.length / 3)}
//             {renderBrandRow(scrollX2, brands.length / 3, brands.length + brands.length / 3)}
//           </View>
//         </View>
//       </View>
//     {/* </View> */}
//     </SafeAreaView>
//     </>
//   );
// };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   content: {
// //     padding: 20,
// //   },
// //   header: {
// //     alignItems: 'center',
// //     marginBottom: 40,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     // color: '#1a1a1a',
// //     color:'#262626',
// //     marginBottom: 8,
// //   },
// //   subtitle: {
// //     fontSize: 16,
// //     color: '#666',
// //     textAlign: 'center',
// //   },
// //   name:{
// //     // paddingBottom:10,
// //     fontSize: 16,
// //     color: '#666',
// //     textAlign: 'center',
// //   },
// //   carouselContainer: {
// //     height: 200,
// //     overflow: 'hidden',
// //   },
// //   rowContainer: {
// //     height: 80,
// //     marginVertical: 10,
// //     overflow: 'hidden',
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   brandContainer: {
// //     width: 160,
// //     height: 80,
// //     marginHorizontal: 20,
// //     // backgroundColor: '#f8f8f8',
// //     // backgroundColor:'#f89',
// //     borderRadius: 12,
// //     padding: 10,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 2,
// //   },
// //   brandLogo: {
// //     width: '100%',
// //     height: '100%',
// //   },
// // });
// const styles = StyleSheet.create({
//     container: {
//     //   flex: 1,
//       backgroundColor: '#fff',
//     },
//     content: {
//       padding: 20,
//     },
//     header: {
//       alignItems: 'center',
//       marginBottom: 40,
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       color: '#262626',
//       marginBottom: 8,
//     },
//     subtitle: {
//       fontSize: 16,
//       color: '#666',
//       textAlign: 'center',
//     },
//     name: {
//       fontSize: 16,
//       color: '#666',
//       textAlign: 'center',
//     },
//     carouselContainer: {
//       height: 250,
//       overflow: 'hidden',
//     },
//     rowContainer: {
//       height: 100, // Adjusted height for more space in each row
//       marginVertical: 10,
//       overflow: 'hidden',
//     },
//     row: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     brandContainer: {
//       width: 100,
//       height: 100, // Fixed height for each brand container
//       marginHorizontal: 20,
//       borderRadius: 12,
//       padding: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//     //   shadowColor: '#000',
//     shadowColor: '#ffffff',

//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 2,
//     },
//     brandLogo: {
//       width: '100%',
//       height: '90%', // Adjusted to leave space for the brand name text
//     //   borderRadius:50
//     },
//   });
  
// //   export default BrandCarousel;
  
// export default BrandCarousel;