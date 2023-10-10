import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Appbar, Button, List} from 'react-native-paper';
import RandomAvatar from '../../components/ui/RandomAvtar';
import {ScrollView} from 'react-native-gesture-handler';
import {useCartContext} from '../../context/CartContext';

export default function ProfileScreen(props: any) {
  const navigation: any = useNavigation();
  const _goBack = () => console.log('Went back');
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());

  const {cartItems} = useCartContext();
  const shipping = cartItems?.shipping_address;

  const firstNameInitial = shipping?.first_name?.charAt(0);
  const lastNameInitial =
    shipping?.last_name?.charAt(0) ||
    cartItems?.billing_address?.last_name?.charAt(0);
  const initials = `${firstNameInitial}${lastNameInitial}`;

  const [myProfileOpen, setMyProfileOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [faqOpen, setFAQOpen] = useState(false);

  const toggleMyProfile = () => {
    setMyProfileOpen(!myProfileOpen);
    setAboutUsOpen(false);
    setFAQOpen(false);
  };

  const toggleAboutUs = () => {
    setAboutUsOpen(!aboutUsOpen);
    setMyProfileOpen(false);
    setFAQOpen(false);
  };
  const toggleFAQ = () => {
    setFAQOpen(!faqOpen);
    setAboutUsOpen(false);
    setMyProfileOpen(false);
  };
  return (
    <ScrollView>
      <View>
        <Appbar.Header>
          <Appbar.Content title="Profile" titleStyle={{fontSize: 18}} />
          <Appbar.Action icon="menu" onPress={_handleMore} />
        </Appbar.Header>

        <View style={{marginVertical: 15}}>
          <View style={{alignItems: 'center', marginBottom: 30}}>
            <RandomAvatar label={initials} />
            <Text style={styles.userName}>
              {shipping?.first_name}{' '}
              {shipping?.last_name || cartItems?.billing_address?.last_name}
            </Text>
          </View>

          <List.Accordion
            title="My Profile"
            expanded={myProfileOpen}
            onPress={toggleMyProfile}
            left={props => <List.Icon {...props} icon="account" />}>
            <List.Item
              title="Current Address"
              description={shipping?.address_1}
            />
            <List.Item
              title="Email Id"
              description={cartItems?.billing_address?.email}
            />
            <List.Item
              title="Contact Number"
              description={cartItems?.billing_address?.phone}
            />
          </List.Accordion>

          <List.Accordion
            title="About Us"
            expanded={aboutUsOpen}
            onPress={toggleAboutUs}
            left={props => <List.Icon {...props} icon="folder" />}>
            <List.Item
              title="Empower Self-Help Groups :"
              description="We strive to empower self-help groups by providing them with a reliable and accessible marketplace to showcase and sell their products, helping them gain recognition and generate sustainable income."
              descriptionNumberOfLines={10}
            />
            <List.Item
              title="Foster Economic Independence :"
              description="We are committed to promoting economic independence by connecting self-help groups directly with consumers, eliminating intermediaries, and ensuring fair and transparent pricing for their products."
              descriptionNumberOfLines={10}
            />
            <List.Item
              title="Support Sustainable Livelihoods : "
              description=" We support the creation of sustainable livelihoods by promoting environmentally friendly practices, encouraging the use of locally sourced materials, and fostering a culture of innovation and skill development within self-help groups."
              descriptionNumberOfLines={10}
            />
            <List.Item
              title="Promote Social Impact : "
              description=" We believe in the power of social impact and aspire to create a positive change in the lives of self-help groups. Through our platform, we aim to raise awareness about their work, promote inclusivity, and contribute to community development initiatives."
              descriptionNumberOfLines={10}
            />
            <List.Item
              title="Enhance Access and Convenience :"
              description=" We are dedicated to creating a seamless and convenient shopping experience for customers, allowing them to explore and purchase unique products made by self-help groups, while supporting a noble cause."
              descriptionNumberOfLines={10}
            />
            <List.Item
              title="Build Trust and Transparency :"
              description=" We prioritize trust and transparency in all our operations. We ensure that customers can make informed choices by providing detailed information about the self-help groups, their products, and the impact their purchase can have."
              descriptionNumberOfLines={10}
            />
          </List.Accordion>
          <List.Accordion
            title="FAQ's"
            expanded={faqOpen}
            onPress={toggleFAQ}
            left={props => <List.Icon {...props} icon="question" />}>
            <List.Item
              title="How do I enter a shipping address?"
              description="Add products to your cart.
              Proceed to checkout.
              Fill out the shipping information, including your name, address, city, state/province, ZIP/postal code, country, and phone number.
              Review the address for accuracy.
              Select a shipping method.
              Complete the purchase by providing payment details."
              descriptionNumberOfLines={10}
            />
            <List.Item
              title="When will my credit card charged?"
              description="Your credit card will typically be charged at the time of purchase or shortly after placing your order on an eCommerce website. The specific timing of the charge may vary depending on the policies of the website or the payment processor being used. In some cases, the charge may appear as a pre-authorization or pending transaction on your credit card statement until the payment is fully processed."
              descriptionNumberOfLines={10}
            />
            <List.Item
              title="How will the charge show up on my credit card?"
              description="The charge will appear as a line item on your credit card statement.
              It will typically display the name of the company or website from which you made the purchase.
              Additional details such as a transaction ID or reference number may be included.
              The format and specifics of the charge may vary based on the merchant and payment processor.
              Refer to the payment confirmation or receipt provided by the merchant for accurate information.
              Contact the merchant’s customer support or your credit card issuer for any inquiries or concerns about a specific charge."
              descriptionNumberOfLines={10}
            />
            <List.Item
              title="Why are you not accepting my card?"
              description="Incorrect card details: Double-check that you entered the correct card number, expiration date, CVV code, and billing address.
              Insufficient funds: Make sure you have enough available credit or funds to cover the transaction.
              Card restrictions: Some cards have limitations on certain types of transactions, such as online or international purchases. Contact your card issuer to inquire about any restrictions.
              Card expiration: Verify that your card is still valid and has not expired."
              descriptionNumberOfLines={10}
            />
          </List.Accordion>
          <View style={{alignItems: 'center', marginRight: 5}}>
            <Button
              style={{
                width: 190,
                height: 50,
                margin: 8,
                backgroundColor: '#efa31d',
                borderRadius: 10,
              }}
              mode="contained"
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text
                style={{
                  fontWeight: 'bold',
                  justifyContent: 'center',
                  fontSize: 17,
                  textTransform: 'capitalize',
                  color: '#ffffff',
                }}>
                Log Out
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userName: {
    fontSize: 18,
    marginTop: 10,
    color: '#506574',
  },
  editProfileText: {
    color: 'blue',
    marginTop: 5,
  },
  divider: {
    marginVertical: 15,
  },
  section: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#506574',
  },
  addressSection: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  addressText: {
    fontSize: 16,
    marginTop: 10,
    color: '#506574',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
