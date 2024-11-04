import {View, Text, Image} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';

export default function HomeWhyUs() {
  return (
    <View style={{paddingTop:10,paddingBottom:10}}>
    {/* <Image source={require("../../../assets/image/HomeMade.png")}  */}
    <Image
  source={{ uri: 'https://shgeshop.com/wp-content/uploads/2024/06/Why-SHGeshop.jpg' }}
     style={{height:130,width:"100%" }} />
    
    </View>
    // <View style={{backgroundColor: '#fae8e7'}}>


    //   <View
    //     style={{
    //       backgroundColor: 'white',
    //       margin: 10,
    //       flex: 1,
    //       flexDirection: 'row',
    //       width: '95%',
    //       borderRadius: 15,
    //       paddingBottom: 10,
    //     }}>
    //     <View style={{width: '20%'}}>
    //       <Card.Cover
    //         source={{
    //           uri: 'https://shgeshop.com/wp-content/uploads/2023/09/Untitled_design__34_-removebg-preview.png',
    //         }}
    //         style={{
    //           height: 90,
    //           width: 90,
    //           backgroundColor: 'white',
    //           borderRadius: 50,
    //         }}
    //       />
    //     </View>
    //     <View style={{width: '80%'}}>
    //       <Card.Content>
    //         <Text
    //           style={{
    //             marginTop: 9,
    //             fontSize: 20,
    //             fontWeight: 'bold',
    //             lineHeight: 28,
    //           }}>
    //           Home Made
    //         </Text>
    //         <Text style={{fontSize: 16, lineHeight: 20}}>
    //           Crafted with Care, Made from Home by Self Help Group Members.
    //           Experience Authenticity in Every Product.
    //         </Text>
    //       </Card.Content>
    //     </View>
    //   </View>

    //   <View
    //     style={{
    //       // justifyContent: 'center',
    //       backgroundColor: 'white',
    //       margin: 10,
    //       flex: 1,
    //       flexDirection: 'row',
    //       width: '95%',
    //       borderRadius: 15,
    //       paddingBottom: 10,
    //     }}>
    //     <View style={{width: '20%'}}>
    //       <Card.Cover
    //         source={{
    //           uri: 'https://shgeshop.com/wp-content/uploads/2023/09/Untitled_design__35_-removebg-preview.png',
    //         }}
    //         style={{
    //           height: 90,
    //           width: 90,
    //           // alignSelf: 'left',
    //           backgroundColor: 'white',
    //           borderRadius: 50,
    //           // marginHorizontal: 25,
    //         }}
    //       />
    //     </View>
    //     <View style={{width: '80%'}}>
    //       <Card.Content>
    //         <Text
    //           style={{
    //             marginTop: 9,
    //             fontSize: 20,
    //             fontWeight: 'bold',
    //             lineHeight: 28,
    //           }}>
    //           Quality Food
    //         </Text>
    //         <Text style={{fontSize: 16, lineHeight: 20}}>
    //           Only the finest ingredients ensure our food’s exceptional quality
    //         </Text>
    //       </Card.Content>
    //     </View>
    //   </View>

    //   <View
    //     style={{
    //       // justifyContent: 'center',
    //       backgroundColor: 'white',
    //       margin: 10,
    //       flex: 1,
    //       flexDirection: 'row',
    //       width: '95%',
    //       borderRadius: 15,
    //       paddingBottom: 10,
    //     }}>
    //     <View style={{width: '20%'}}>
    //       <Card.Cover
    //         source={{
    //           uri: 'https://shgeshop.com/wp-content/uploads/2023/09/Untitled_design__36_-removebg-preview.png',
    //         }}
    //         style={{
    //           height: 90,
    //           width: 90,
    //           // alignSelf: 'center',
    //           backgroundColor: 'white',
    //           borderRadius: 50,
    //           // marginHorizontal: 25,
    //         }}
    //       />
    //     </View>
    //     <View style={{width: '80%'}}>
    //       <Card.Content>
    //         <Text
    //           style={{
    //             marginTop: 9,
    //             fontSize: 20,
    //             fontWeight: 'bold',
    //             lineHeight: 28,
    //           }}>
    //           Women Empowerment
    //         </Text>
    //         <Text style={{fontSize: 16, lineHeight: 20}}>
    //           Empowering women strengthens communities, economies, and the world
    //           at large.
    //         </Text>
    //       </Card.Content>
    //     </View>
    //   </View>

    //   <View
    //     style={{
    //       // justifyContent: 'center',
    //       backgroundColor: 'white',
    //       margin: 10,
    //       flex: 1,
    //       flexDirection: 'row',
    //       width: '95%',
    //       borderRadius: 15,
    //       paddingBottom: 10,
    //     }}>
    //     <View style={{width: '20%'}}>
    //       <Card.Cover
    //         source={{
    //           uri: 'https://shgeshop.com/wp-content/uploads/2023/09/Untitled_design__38_-removebg-preview.png',
    //         }}
    //         style={{
    //           height: 90,
    //           width: 90,
    //           // alignSelf: 'center',
    //           backgroundColor: 'white',
    //           borderRadius: 50,
    //           // marginHorizontal: 25,
    //         }}
    //       />
    //     </View>
    //     <View style={{width: '80%'}}>
    //       <Card.Content>
    //         <Text
    //           style={{
    //             marginTop: 9,
    //             fontSize: 20,
    //             fontWeight: 'bold',
    //             lineHeight: 28,
    //           }}>
    //           Rural Development
    //         </Text>
    //         <Text style={{fontSize: 16, lineHeight: 20}}>
    //           Rural development lays the foundation for sustainable, inclusive
    //           growth
    //         </Text>
    //       </Card.Content>
    //     </View>
    //   </View>
    // </View>
  );
}
