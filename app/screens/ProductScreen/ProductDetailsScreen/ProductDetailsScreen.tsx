import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Text, Button} from 'react-native-paper';
import {HeaderBar} from '../../../components/ui/HeaderBar';
import {
  DrawerActions,
  NavigationAction,
  NavigationContainerProps,
  NavigationContainerRef,
  NavigationProp,
  NavigationState,
} from '@react-navigation/native';
import CurrencyComponent from '../../../components/ui/Currencycomponent';
import Rating from '../../../components/ui/RatingComponent';

export const ProductDetailsScreen = (props: any) => {
  const {navigation} = props;
  
  return (
    <ScrollView>
      <HeaderBar
        title="product detail screen"
        backAction={() => navigation.goBack()}
        icon1="menu"
        right1Action={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <View style={{flex: 1, padding: 3}}>
        <Card
          onPress={() => navigation.navigate('ProductDetailsScreen')}
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            borderRadius: 15,
            margin: 'auto',
          }}>
          <Card.Cover
            source={{
              uri: 'https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg',
            }}
            style={{height: 300, margin: 5}}
          />

          <Card.Title title="papad" style={{marginLeft: 3}} />
          <Text style={{fontSize: 20, padding:3}}>
            {' '}
            Delight in the crispy and savory goodness of our papad product. Made
            from a blend of carefully selected lentil flours
          </Text>
          {/* <CurrencyComponent
            value={100}
            style={{
              alignSelf: 'flex-bottom',
              fontSize: 28,
              fontWeight: 'bold',
              paddingTop: 60,
            }}
          /> */}

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
              <CurrencyComponent
                value={100}
                style={{
                  alignSelf: 'flex-bottom',
                  fontSize: 28,
                  fontWeight: 'bold',
                  paddingTop: 13,
                  marginLeft: 15,
                }}
              />
            </View>
            <View style={{marginLeft: 70}}>
              <Rating
                rating={5}
                maxRating={5}
                iconFilled={
                  <View style={{marginRight: 5}}>
                    <Text style={{color: 'gold', fontSize: 40}}>★</Text>
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
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};
