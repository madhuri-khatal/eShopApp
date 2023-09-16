import {ScrollView} from 'react-native-gesture-handler';
import {Card, Divider, Text} from 'react-native-paper';
import {HeaderBar} from './../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useCartContext} from '../../context/CartContext';

export const OrderDetailScreen = ({route, navigation}: any) => {
  const {orderData} = useCartContext();

  const itemList = orderData?.data?.line_items;

  const billingAddress = `${orderData?.data?.billing?.address_1}, ${orderData?.data?.billing?.address_2}, ${orderData?.data?.billing?.city}, ${orderData?.data?.billing?.state}, ${orderData?.data?.billing?.country}, ${orderData?.data?.billing?.postcode}. `;

  const shippingAddress = `${orderData?.data?.shipping?.address_1}, ${orderData?.data?.shipping?.address_2}, ${orderData?.data?.shipping?.city}, ${orderData?.data?.shipping?.state}, ${orderData?.data?.shipping?.country}, ${orderData?.data?.shipping?.postcode}. `;

  const originalDateStr = orderData?.data?.date_created;
  const originalDate = new Date(originalDateStr);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthNames[originalDate.getMonth()];
  const formattedDate = `${monthName} ${originalDate.getDate()}, ${originalDate.getFullYear()}`;
 
  console.log(orderData?.data?.shipping_total);
  
  return (
    <>
      <ScrollView style={styles.container}>
        <HeaderBar
          title="Order detail screen"
          backAction={() => navigation.goBack()}
          icon1="menu"
          right1Action={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />

        <View style={styles.section}>
          <Card.Content>
            <View style={{flexDirection: 'row', paddingVertical: 8}}>
              <AntDesign
                name="checkcircle"
                style={{fontSize: 22, color: '#fa5f11', margin: 3}}
              />

              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Order Summery
              </Text>
              <Divider />
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Order Date:</Text>
              <Text style={styles.text}>{formattedDate}</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Order Number:</Text>
              <Text style={styles.text}>{orderData?.data?.id}</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Order Total: </Text>
              <Text style={styles.text}>₹{orderData?.data?.total}</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Shipping charges: </Text>
              <Text style={styles.text}>{orderData?.data?.shipping_total}</Text>
            </View>
                      </Card.Content>
        </View>

        <Card style={styles.section}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Shipment Details</Text>
            {itemList.map((item: any) => (
              <>
                <View style={styles.leftColumn} key={item.id}>
                  <View>
                    <Image
                      source={{uri: item?.image?.src}}
                      style={styles.productImage}
                    />
                  </View>
                  <View style={{marginTop: 18, marginBottom: 20, width: '70%'}}>
                    <Text
                      style={styles.title}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.name}
                    </Text>
                    <Text style={styles.text}>{item.status}</Text>
                    <Text style={styles.text}>
                      Quantity: {item.quantity} | Price: ₹ {item.price}
                    </Text>
                  </View>
                </View>
                <Divider />
              </>
            ))}
          </Card.Content>
          <Divider />
        </Card>

        <Card style={styles.section}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Payment Information</Text>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Payment Method:</Text>
              <Text style={styles.text}>
                {orderData?.data?.payment_method_title}
              </Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Billing Address:</Text>
            </View>
            <Text style={styles.text}>{billingAddress}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.section}>
          <Card.Content>
            <Text style={styles.paymentLabel}>Shipping Address </Text>

            <Text style={styles.text}>{shippingAddress}</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },

  shipmentItem: {
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1,
    flexDirection: 'row',
  },

  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentItem: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
  },
  paymentLabel: {
    width: '40%',
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentValue: {
    flex: 1,
  },
});
