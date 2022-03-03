import {
  Image,
  Linking,
  PermissionsAndroid,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon, SearchBar} from 'react-native-elements';
import {Colors, Fonts} from '../../constants';
import Header from '../../components/Header';
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const ContactList = () => {
  let [contacts, setContacts] = useState([
    {
      number: '9933785077',
      displayName: 'AAA',
    },
    {
      number: '123',
      displayName: 'BBB',
    },
    {
      number: '123',
      displayName: 'CCC',
    },
  ]);
  let [index, setindex] = useState([]);
  let [count, setCount] = useState();
  const [searchText, setSearchText] = useState('');
  const [loader, setloader] = useState(false);
  //  console.log("LAST",currentLocation);

  const makeCall = phone => {
    Linking.openURL(`tel:${phone}`);
  };

  const sendWPsms = (phone, name) => {
    var SOS_SMS = `Hi`;
    var phone_n = phone.split(' ').join('').replace('+91', '');
    var phone_new = phone_n.charAt(0) === '0' ? phone_n.substring(1) : phone_n;
    Linking.openURL(
      'whatsapp://send?text=' + {SOS_SMS}.SOS_SMS + '&phone=91' + phone_new,
    ).catch(err =>
      ToastAndroid.show(
        "Can't Open Whatsapp.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      ),
    );
    // console.log("WP")
  };
  const data = alphabet.map(c => {
    let filtered = contacts.filter(
      i => i.displayName?.[0]?.toUpperCase() === c.toUpperCase(),
    );
    if (filtered.length === 0) {
      return null;
    } else {
      return {
        title: c.toUpperCase(),
        data: filtered.map(i => {
          return {
            name: i.displayName,
            mobile: i.number,
            photo: i.thumbnailPath,
          };
        }),
      };
    }
  });
  const loadsearchContacts = () => {
    console.log('jj');
  };
  useEffect(() => {
    if (searchText.length < 1) {
      //   loadContacts();
    } else {
      loadsearchContacts();
      setloader(true);
    }
  }, [searchText]);
  //   const getColor = () => {
  //     let r = Math.floor(Math.random() * 256);
  //     let g = Math.floor(Math.random() * 256);
  //     let b = Math.floor(Math.random() * 256);
  //     let o = Math.random() * 2;

  //     return `rgba(${r},${g},${b},${o})`;
  //   };
  return (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <Header name="Contacts" />
      <View>
        <SearchBar
          inputContainerStyle={{
            backgroundColor: '#fff',
            borderWidth: 2,
            width: '80%',
            height: 50,
            borderRadius: 20,
            alignSelf: 'center',
            elevation: 5,
          }}
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
            padding: 10,
          }}
          platform="android"
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
          }}
          showLoading={loader}
          placeholder={'Search Contacts ....'}
          placeholderTextColor="#999"
        />
      </View>
      <SectionList
        sections={data.filter(i => i)}
        keyboardDismissMode="interactive"
        initialNumToRender={100}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => (
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
              }}>
              {item?.photo ? (
                <Image
                  source={{uri: item?.photo}}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    marginHorizontal: 7,
                  }}
                />
              ) : (
                <Icon
                  name="person-outline"
                  type="ionicon"
                  reverse
                  color={Colors.disable}
                />
              )}
              <View>
                <Text
                  style={{
                    fontFamily: Fonts.semibold,
                    color: Colors.TextColor,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    color: Colors.TextColor,
                  }}>
                  {item?.mobile}
                </Text>
              </View>
            </View>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '50%',
                  alignSelf: 'flex-end',
                }}>
                <TouchableOpacity
                  disabled={item.mobile === undefined ? true : false}
                  onPress={() => sendWPsms(item.mobile, item.name)}>
                  <Icon
                    name="logo-whatsapp"
                    type="ionicon"
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={item.mobile === undefined ? true : false}
                  onPress={() => makeCall(item.mobile)}>
                  <Icon name="phone" color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={item.mobile === undefined ? true : false}
                  //   onPress={() => sendMsg(item.mobile, item.name)}
                >
                  <Icon name="sms" color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={{paddingHorizontal: 10, backgroundColor: 'white'}}>
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: 20,
                color: Colors.text,
              }}>
              {title}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
