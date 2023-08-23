import {ScrollView} from 'react-native-gesture-handler';
import {Card, Divider, Text} from 'react-native-paper';
import {HeaderBar} from './../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const OrderDetailScreen = ({route, navigation}: any) => {
  const orderData = {
    id: 1,
    date: '2023-08-15',
    total: 49.99,
  };
  const shipmentDetails = [
    {
      id: 1,
      status: 'Delivered',
      date: '2023-08-16',
      productImage:
        'https://shgeshop.com/wp-content/uploads/2023/05/tomato-powder.png',
      title: 'Product 1',
      quantity: 2,
      price: 29.99,
    },
  ];
  const paymentInformation = {
    paymentMethod: 'Credit Card',
    billingAddress: 'John Doe, 1234 Example Street City, State 12345 ,Country',
  };
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
                style={{fontSize: 25, color: '#fa5f11', margin: 3}}
              />

              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                Order Summery
              </Text>
              <Divider />
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Order Date:</Text>
              <Text style={styles.text}>{orderData.date}</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Order Number:</Text>
              <Text style={styles.text}>{orderData.id}</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Order Total: </Text>
              <Text style={styles.text}>₹{orderData.total.toFixed(2)}</Text>
            </View>

            {/* <Button
              mode="contained"
              onPress={() => console.log('Download Invoice')}
              style={styles.downloadButton}>
              Download Invoice
            </Button> */}
          </Card.Content>
        </View>

        <Card style={styles.section}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Shipment Details</Text>
            {shipmentDetails.map(shipment => (
              <View style={styles.shipmentItem} key={shipment.id}>
                <View style={styles.leftColumn}>
                  <Image
                    source={{uri: shipment.productImage}}
                    style={styles.productImage}
                  />
                </View>
                <View style={styles.rightColumn}>
                  <Text style={styles.title}>{shipment.title}</Text>
                  <Text style={styles.text}>{shipment.status}</Text>
                  <Text style={styles.text}>Date: {shipment.date}</Text>
                  <Text style={styles.text}>
                    Quantity: {shipment.quantity} | Price: ₹ {shipment.price}
                  </Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.section}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Payment Information</Text>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Payment Method:</Text>
              <Text style={styles.text}>
                {paymentInformation.paymentMethod}
              </Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Billing Address:</Text>
            </View>
            <Text style={styles.text}>{paymentInformation.billingAddress}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.section}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Shipping Address </Text>

            <Text style={styles.text}>{paymentInformation.billingAddress}</Text>
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
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    alignItems: 'flex-end',
  },
  downloadButton: {
    marginTop: 10,
  },
  shipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightColumn: {
    flex: 2,
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
  },
  paymentLabel: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentValue: {
    flex: 2,
  },
});
