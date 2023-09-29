import {View, Text} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';

export default function HomeWhyUs() {
  return (
    <View style={{backgroundColor: '#ebf8fa'}}>
      <Card
        style={{
          justifyContent: 'center',
          backgroundColor: 'white',
          margin: 15,
        }}>
        <Card.Cover
          source={{
            uri: 'https://shgeshop.com/wp-content/uploads/2023/09/Untitled_design__34_-removebg-preview.png',
          }}
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            marginHorizontal: 25,
          }}
        />
        <Card.Content>
          <Text style={{fontSize: 20, fontWeight: 'bold', lineHeight: 28}}>
            Home Made
          </Text>
          <Text style={{fontSize: 16, lineHeight: 20}}>
            Crafted with Care, Made from Home by Self Help Group Members.
            Experience Authenticity in Every Product.
          </Text>
        </Card.Content>
      </Card>

      <Card
        style={{
          justifyContent: 'center',
          backgroundColor: 'white',
          margin: 15,
        }}>
        <Card.Cover
          source={{
            uri: 'https://shgeshop.com/wp-content/uploads/2023/09/Untitled_design__35_-removebg-preview.png',
          }}
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            marginHorizontal: 25,
          }}
        />
        <Card.Content>
          <Text style={{fontSize: 20, fontWeight: 'bold', lineHeight: 28}}>
            Quality Food
          </Text>
          <Text style={{fontSize: 16, lineHeight: 20}}>
            Only the finest ingredients ensure our food’s exceptional quality
          </Text>
        </Card.Content>
      </Card>

      <Card
        style={{
          justifyContent: 'center',
          backgroundColor: 'white',
          margin: 15,
        }}>
        <Card.Cover
          source={{
            uri: 'https://shgeshop.com/wp-content/uploads/2023/09/Untitled_design__36_-removebg-preview.png',
          }}
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            marginHorizontal: 25,
          }}
        />
        <Card.Content>
          <Text style={{fontSize: 20, fontWeight: 'bold', lineHeight: 28}}>
            Women Empowerment
          </Text>
          <Text style={{fontSize: 16, lineHeight: 20}}>
            Empowering women strengthens communities, economies, and the world
            at large.
          </Text>
        </Card.Content>
      </Card>

      <Card
        style={{
          justifyContent: 'center',
          backgroundColor: 'white',
          margin: 15,
        }}>
        <Card.Cover
          source={{
            uri: 'https://shgeshop.com/wp-content/uploads/2023/09/Untitled_design__38_-removebg-preview.png',
          }}
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 50,
            marginHorizontal: 25,
          }}
        />
        <Card.Content>
          <Text style={{fontSize: 20, fontWeight: 'bold', lineHeight: 28}}>
            Rural Development
          </Text>
          <Text style={{fontSize: 16, lineHeight: 20}}>
            Rural development lays the foundation for sustainable, inclusive
            growth
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}
