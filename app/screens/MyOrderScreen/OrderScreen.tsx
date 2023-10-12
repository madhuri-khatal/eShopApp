import {ScrollView} from 'react-native-gesture-handler';
import {HeaderBar} from '../../components/ui/HeaderBar';
import {DrawerActions} from '@react-navigation/native';
import React, {useState} from 'react';
import OrderList from './OrderList';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {Button, Card, Divider, TextInput} from 'react-native-paper';
import {OrderApi} from '../../api/OrderApi';
export const OrderScreen = (props: any) => {
  const {navigation} = props;
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [orderData, setOrderData] = useState<any>();
  const getOrderDetailById = async (id: number | string) => {
    const {result} = await OrderApi.getOrderDetailById(id);
    setShowOrderDetail(true);
    setOrderData(result);
    // const billingData = result.data.billing;
  };

  const itemList = orderData?.data?.line_items;
  const billingAddress = `${orderData?.data?.billing?.address_1}, ${orderData?.data?.billing?.address_2}, ${orderData?.data?.billing?.city}, ${orderData?.data?.billing?.state}, ${orderData?.data?.billing?.country}, ${orderData?.data?.billing?.postcode}. `;
  const shippingAddress = `${orderData?.data?.shipping?.address_1}, ${orderData?.data?.shipping?.address_2}, ${orderData?.data?.shipping?.city}, ${orderData?.data?.shipping?.state}, ${orderData?.data?.shipping?.country}, ${orderData?.data?.shipping?.postcode}. `;
  const username = `${orderData?.data?.shipping?.first_name} ${orderData?.data?.shipping?.last_name}`;
  const originalDateStr = orderData?.data?.date_created;
  const originalDate = new Date(originalDateStr);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = monthNames[originalDate.getMonth()];
  const formattedDate = `${monthName} ${originalDate.getDate()}, ${originalDate.getFullYear()}`;

  const [orderID, setOrderID] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const handleTrackOrder = async () => {
    if (!orderID) {
      Alert.alert('Error', 'Please enter a valid Order ID');
    } else {
      try {
        await getOrderDetailById(orderID);
        if (!orderData) {
          // Order ID not found or request failed
          Alert.alert(
            'Error',
            'Order ID not found. Please enter a valid Order ID.',
          );
        }
      } catch (error) {
        console.error('Error fetching order details', error);
        Alert.alert('Error', 'An error occurred while fetching order details.');
      }
    }
  };

  const checkEmailMatch = () => {
    if (orderData?.data?.billing?.email === userEmail) {
      setShowOrderDetail(true);
    } else {
      // Email does not match
      // You can show an error message or handle it as needed
    }
  };
  return (
    <ScrollView style={{backgroundColor: '#FFF'}}>
      {/* <OrderList /> */}
      {!showOrderDetail ? (
        <>
          <HeaderBar
            title="My Orders"
            titleStyle={{fontSize: 18, fontWeight: 'bold', color: '#506574'}}
            backAction={() => navigation.goBack()}
            right1Action={() =>
              navigation
                .getParent('main')
                .dispatch(DrawerActions.toggleDrawer())
            }
            icon1="menu"
          />
          <View style={{padding: 15}}>
            <View>
              <View
                style={{
                  alignSelf: 'center',
                }}>
                <Image
                  source={require('../../../assets/image/trackOrder.png')}
                  height={150}
                  width={150}
                />
              </View>
              <Text
                style={{
                  fontSize: 30,
                  color: '#506574',
                  textAlign: 'left',
                  fontFamily: 'roboto',
                  fontWeight: '700',
                  marginVertical: 30,
                }}>
                Be Always Up To Date With Your Order
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#506574',
                  textAlign: 'left',
                  fontFamily: 'roboto',
                  lineHeight: 30,
                }}>
                To track your order please enter your Order ID in the box below
                and press the "Track" button. This was given to you on your
                receipt and in the confirmation email you should have received.
              </Text>
            </View>
            <TextInput
              style={{marginVertical: 15, color: '#506574'}}
              label="Order ID"
              textColor="#506574"
              mode="outlined"
              value={orderID}
              onChangeText={text => setOrderID(text)}
            />

            <Button
              icon="clock"
              style={{marginVertical: 25, borderRadius: 5}}
              mode="contained"
              onPress={handleTrackOrder}>
              <Text>Track Order</Text>
            </Button>
          </View>
        </>
      ) : orderData ? (
        <>
          <HeaderBar
            title="Order detail screen"
            titleStyle={{fontSize: 18, fontWeight: 'bold', color: '#506574'}}
            backAction={() => navigation.goBack()}
            icon1="menu"
            right1Action={() =>
              navigation.dispatch(DrawerActions.toggleDrawer())
            }
          />
          <View style={{marginBottom: 20, backgroundColor: '#ffffff'}}>
            <Card.Content>
              <View style={{flexDirection: 'row', paddingVertical: 15}}>
                {/* <AntDesign
                  name="checkcircle"
                  style={{fontSize: 22, color: '#fa5f11', margin: 3}}
                /> */}

                <Text
                  style={{color: '#506574', fontSize: 20, fontWeight: 'bold'}}>
                  Order Summery
                </Text>
                <Divider />
              </View>
              <View style={styles.paymentItem}>
                <Text
                  style={{
                    color: '#506574',
                    width: '40%',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Order Date:
                </Text>
                <Text style={{color: '#506574', fontSize: 16}}>
                  {formattedDate}
                </Text>
              </View>
              <View style={styles.paymentItem}>
                <Text
                  style={{
                    color: '#506574',
                    width: '40%',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  status:
                </Text>
                <Text style={{color: '#506574', fontSize: 16}}>
                  {orderData?.data?.status}
                </Text>
              </View>
              <View style={styles.paymentItem}>
                <Text
                  style={{
                    color: '#506574',
                    width: '40%',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Order Number:
                </Text>
                <Text style={{color: '#506574', fontSize: 16}}>
                  {orderData?.data?.id}
                </Text>
              </View>
              <View style={styles.paymentItem}>
                <Text
                  style={{
                    color: '#506574',
                    width: '40%',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Shipping charges:{' '}
                </Text>
                <Text style={{color: '#506574', fontSize: 16}}>
                  {orderData?.data?.shipping_total}
                </Text>
              </View>
              <View style={styles.paymentItem}>
                <Text
                  style={{
                    color: '#506574',
                    width: '40%',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Order Total:{' '}
                </Text>
                <Text style={{color: '#506574', fontSize: 16}}>
                  ₹{orderData?.data?.total}
                </Text>
              </View>
            </Card.Content>
          </View>

          <Card style={{marginBottom: 20, backgroundColor: '#ffffff'}}>
            <Card.Content>
              <Text
                style={{
                  color: '#506574',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}>
                Shipment Details
              </Text>
              {itemList &&
                itemList.map((item: any) => (
                  <>
                    <View style={styles.leftColumn} key={item.id}>
                      <View>
                        <Image
                          source={{uri: item?.image?.src}}
                          style={{width: 100, height: 100, marginRight: 10}}
                        />
                      </View>
                      <View
                        style={{marginTop: 18, marginBottom: 20, width: '70%'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#506574',
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.name}
                        </Text>
                        <Text style={{color: '#506574', fontSize: 16}}>
                          {item.status}
                        </Text>
                        <Text style={{color: '#506574', fontSize: 16}}>
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

          <Card style={{marginBottom: 20, backgroundColor: '#ffffff'}}>
            <Card.Content>
              <Text
                style={{
                  color: '#506574',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}>
                Payment Information
              </Text>
              <Text
                style={{
                  color: '#506574',
                  textTransform: 'capitalize',
                  fontSize: 18,
                  paddingBottom: 2,
                }}>
                {username}
              </Text>
              <View style={styles.paymentItem}>
                <Text
                  style={{
                    color: '#506574',
                    width: '40%',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Payment Method:
                </Text>
                <Text style={{color: '#506574', fontSize: 16}}>
                  {orderData?.data?.payment_method_title}
                </Text>
              </View>
              <View style={styles.paymentItem}>
                <Text
                  style={{
                    color: '#506574',
                    width: '40%',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Billing Address :
                </Text>
              </View>
              <Text style={{color: '#506574', fontSize: 16}}>
                {billingAddress}
              </Text>
            </Card.Content>
          </Card>

          <Card style={{marginBottom: 20, backgroundColor: '#ffffff'}}>
            <Card.Content>
              <Text
                style={{
                  color: '#506574',
                  width: '40%',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Shipping Address :
              </Text>

              <Text style={{color: '#506574', fontSize: 16}}>
                {shippingAddress}
              </Text>
            </Card.Content>
          </Card>
        </>
      ) : (
        <>
          <HeaderBar
            title="Order Not Found"
            titleStyle={{fontSize: 18, fontWeight: 'bold', color: '#506574'}}
            backAction={() => navigation.goBack()}
            icon1="menu"
          />
          <View
            style={{
              padding: 15,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/image/no-results.png')}
              style={{width: 250, height: 250, marginVertical: 50}}
            />
            <Text style={{fontSize: 22, color: '#506574', fontWeight: '500'}}>
              Order not found. Please check the order ID and try again.
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  shipmentItem: {
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1,
    flexDirection: 'row',
  },
  paymentItem: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
  },

  paymentValue: {
    flex: 1,
  },
});
