import React from 'react';
import {View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import Rating from '../../components/ui/RatingComponent';
import CurrencyComponent from '../../components/ui/Currencycomponent';
import Icon from 'react-native-paper/lib/typescript/components/Icon';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  title: any;
  description: any;
  img: any;
  price: any;
  rating: any;
}
export default function ProductItem({
  title,
  description,
  img,
  price,
  rating,
}: IProps) {
  const navigation:any=useNavigation();
  return (
    <>
      <View style={{flex: 1, padding: 3}}>
     
        <Card
        onPress={()=>navigation.navigate("ProductDetailsScreen")}
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            borderRadius: 15,
            margin: 'auto',
          }}>
             <Button icon={{ uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' }} children={undefined}/>
          <Card.Cover source={{uri: img}} style={{height: 200, margin: 5}} />
          <Card.Title title={title} style={{marginLeft: 43}} />
          <CurrencyComponent
            value={price}
            style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}
          />
          <View style={{alignItems:'center'}}>
            <Rating
              rating={rating}
              maxRating={5}
              iconFilled={
                <View style={{marginRight: 5}}>
                  <Text style={{color: 'gold', fontSize: 20}}>★</Text>
                </View>
              }
              iconEmpty={
                <View style={{marginRight: 5}}>
                  <Text style={{color: 'gold', fontSize: 20}}>☆</Text>
                </View>
              }
              iconSize={50}
            />
          </View>
        </Card>
      </View>
    </>
  );
}
