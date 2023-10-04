import React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Rating from '../../components/ui/RatingComponent';
import CurrencyComponent from '../../components/ui/Currencycomponent';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import WishlistComponent from '../../components/Product/WishlistComponent';
import CartComponent from '../../components/Product/CartComponent';
import {useProductContext} from '../../context/ProductContext';
import {Image} from 'react-native';

interface IProps {
  name?: any;
  description?: any;
  img?: any;
  price?: any;
  rating?: any;
  product?: any;
}

export default function ProductItem({product}: IProps) {
  const {images: [{src = ''} = {}] = []} = product;

  const {getProductById} = useProductContext();

  const navigation: any = useNavigation();

  const handlePress = async () => {
    await getProductById(product.id);
    navigation.navigate('ProductDetailsScreen', {productId: product.id});
  };

  
  let productImageSrc = null;

  if (product.images && product.images.length > 0) {
    productImageSrc = product.images[0].src;
  } else if (product.image && product.image.src) {
    productImageSrc = product.image.src;
  }

  return (
    <>
      <View style={{padding: 1, width: '50%', backgroundColor: '#f7f7f7'}}>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            margin: 'auto',
          }}>
          <View>
            {/* <WishlistComponent /> */}
            <TouchableOpacity onPress={handlePress}>
              {productImageSrc && (
                <Image source={{uri: productImageSrc}} style={{height: 200}} />
              )}
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 17,
              marginLeft: 8,
              overflow: 'hidden',
              flex: 1,
              marginTop: 8,
              fontWeight: '600',
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {product.name}
          </Text>
        
{product?.price > 1 && (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    }}>
    <Text
      style={{
        textDecorationLine: 'line-through',
        marginRight: 8,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#cc3a1d',
      }}>
      {product.regular_price ? (
        <CurrencyComponent value={product.regular_price} />
      ) : null}
    </Text>
    <CurrencyComponent
      value={product.price}
      style={{ fontSize: 18, fontWeight: 'bold' }}
    />
  </View>
)}

{product?.price <= 1 && (
  <CurrencyComponent
    value={product.regular_price || product.price}
    style={{
      fontSize: 17,
      fontWeight: 'bold',
      marginLeft: 10,
      color: product.regular_price ? 'red' : 'black',
    }}
  />
)}


          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{marginBottom: 10}}>
              <Rating
                rating={product?.rating_count}
                maxRating={5}
                editable={true}
                iconFilled={
                  <View style={{marginRight: 5}}>
                    <Text style={{color: 'orange', fontSize: 20}}>★</Text>
                  </View>
                }
                iconEmpty={
                  <View style={{marginRight: 5}}>
                    <Text style={{color: 'orange', fontSize: 20}}>☆</Text>
                  </View>
                }
                iconSize={50}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}></View>
          </View>
        </View>
      </View>
    </>
  );
}
