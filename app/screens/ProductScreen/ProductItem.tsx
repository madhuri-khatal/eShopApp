import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-paper';
import Rating from '../../components/ui/RatingComponent';
import CurrencyComponent from '../../components/ui/Currencycomponent';
import {useNavigation} from '@react-navigation/native';
import {useProductContext} from '../../context/ProductContext';

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
    console.log('clicked', product.id);
  };

  let productImageSrc = null;

  if (product.images && product.images.length > 0) {
    productImageSrc = product.images[0].src;
  } else if (product.image && product.image.src) {
    productImageSrc = product.image.src;
  }

  return (
    <View style={{padding: 1, width: '50%', paddingHorizontal: 5}}>
      <View
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          margin: 'auto',
          position: 'relative', // Positioning for the sale badge
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        {product.on_sale && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#e95d2a',
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 5,
              zIndex: 1,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Sale</Text>
          </View>
        )}

        <TouchableOpacity onPress={handlePress}>
          {productImageSrc && (
            <Image
              source={{uri: productImageSrc}}
              style={{height: 200, borderRadius: 10}}
            />
          )}
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 17,
            marginLeft: 8,
            overflow: 'hidden',
            flex: 1,
            marginTop: 8,
            fontWeight: '600',
            color: '#506574',
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {product.name}
        </Text>

        {product?.price > 1 && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              style={{fontSize: 18, fontWeight: 'bold', color: '#506574'}}
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

        <View style={{flex: 1, flexDirection: 'row', marginLeft: 8}}>
          <View style={{marginBottom: 10}}>
            <Rating
              rating={product?.average_rating}
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
  );
}
