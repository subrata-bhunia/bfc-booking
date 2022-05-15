import {
  FlatList,
  Image,
  Linking,
  PermissionsAndroid,
  Pressable,
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
import {getContact} from '../../api/Contacts';
import {SkypeIndicator} from 'react-native-indicators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StaticHeader from '../../components/StaticHeader';
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
    // {
    //   number: '9933785077',
    //   displayName: 'AAA',
    // },
    // {
    //   number: '123',
    //   displayName: 'BBB',
    // },
    // {
    //   number: '123',
    //   displayName: 'CCC',
    // },
  ]);
  let [index, setindex] = useState([]);
  let [count, setCount] = useState();
  const [searchText, setSearchText] = useState('');
  const [loader, setloader] = useState(false);
  const [loader2, setloader2] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedTabNo, setSelectedTabNo] = useState(1);
  const colors = [
    '#fa756b',
    '#d2fa6b',
    '#6bfa88',
    '#6bd4fa',
    '#d96bfa',
    '#fa6b6b',
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#B366CC',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#E666FF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
  ];
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

  // Api call

  const handleGetContact = async () => {
    setloader2(true);
    getContact()
      .then(res => {
        const {status, message, data} = res?.data;

        if (status == 'Success' && data) {
          const newData = data.slice().map(item => {
            return {
              number: item.phone,
              displayName: item.name,
            };
          });
          setContacts(newData);
          setloader2(false);
        } else {
          setloader2(false);
        }
      })
      .catch(err => {
        console.log('Err of get Contact :', err);
        setloader2(false);
      });
  };

  useEffect(() => {
    handleGetContact();
  }, []);

  const FirstTab = () => {
    return (
      <>
        {!loader2 ? (
          <FlatList
            data={contacts}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => (
              <Pressable
                style={[styles.container, {marginBottom: hp(1)}]}
                onPress={() => setChecked(true)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: wp(90),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: wp(10),
                        width: wp(10),
                        backgroundColor:
                          colors[Math.floor(Math.random() * colors.length)],
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: wp(3),
                      }}>
                      <Icon name="person" color={Colors.white} />
                    </View>
                    <Text
                      style={{
                        fontFamily: Fonts.semibold,
                        color: Colors.TextColor,
                      }}>
                      {item.displayName}
                    </Text>
                  </View>
                  {checked ? (
                    <View
                      style={{
                        height: wp(6),
                        width: wp(6),
                        borderRadius: 100,
                        backgroundColor: 'green',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon name="check" size={wp(5)} color={Colors.white} />
                    </View>
                  ) : (
                    //   </View>
                    <View
                      style={{
                        height: wp(6),
                        width: wp(6),
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: Colors.disable,
                      }}
                    />
                  )}
                </View>
              </Pressable>
            )}
          />
        ) : (
          <View
            style={{
              marginTop: hp(30),
            }}>
            <SkypeIndicator color={Colors.botton} count={5} size={wp(12)} />
          </View>
        )}
      </>
    );
  };
  const SecondTab = () => {
    return (
      <>
        {!loader2 ? (
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
                    width: wp(60),
                  }}>
                  {item?.photo ? (
                    <Image
                      source={{uri: item?.photo}}
                      style={{
                        height: wp(12),
                        width: wp(12),
                        borderRadius: 25,
                        marginHorizontal: 7,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        height: wp(12),
                        width: wp(12),
                        backgroundColor:
                          colors[Math.floor(Math.random() * colors.length)],
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: wp(3),
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: wp(5),
                          fontFamily: Fonts.semibold,
                        }}>
                        {item.name[0]}
                      </Text>
                    </View>
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: wp(30),
                    alignSelf: 'flex-end',
                  }}>
                  <TouchableOpacity
                    disabled={item.mobile === undefined ? true : false}
                    onPress={() => sendWPsms(item.mobile, item.name)}
                    style={{
                      backgroundColor: '#04b026',
                      height: wp(10.5),
                      width: wp(10.5),
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name="logo-whatsapp"
                      type="ionicon"
                      color={Colors.white}
                      size={wp(6)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={item.mobile === undefined ? true : false}
                    onPress={() => makeCall(item.mobile)}
                    style={{
                      backgroundColor: Colors.secondary,
                      height: wp(10.5),
                      width: wp(10.5),
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="phone" color={Colors.primary} size={wp(6)} />
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                  disabled={item.mobile === undefined ? true : false}
                  //   onPress={() => sendMsg(item.mobile, item.name)}
                >
                  <Icon name="sms" color={Colors.primary} />
                </TouchableOpacity> */}
                </View>
              </View>
            )}
            renderSectionHeader={({section: {title}}) => (
              <View
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  marginTop: hp(1),
                  padding: wp(3),
                  paddingBottom: wp(1),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    fontSize: wp(3),
                    color: Colors.text,
                  }}>
                  {title}
                </Text>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              marginTop: hp(30),
            }}>
            <SkypeIndicator color={Colors.botton} count={5} size={wp(12)} />
          </View>
        )}
      </>
    );
  };

  console.log('checked Item Are :', checked);

  return (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <StaticHeader />
      <View
        style={{
          height: 1,
          backgroundColor: Colors.disable,
          width: wp(100),
        }}
      />
      <View
        style={{
          height: hp(6),
          width: wp(65),
          borderRadius: wp(40),
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          borderColor: Colors.primary,
          borderWidth: 2,
          marginVertical: hp(2.5),
        }}>
        <Pressable
          style={{
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: selectedTabNo == 1 ? Colors.primary : '#fff',
            borderTopLeftRadius: wp(40),
            borderBottomLeftRadius: wp(40),
            height: '100%',
          }}
          onPress={() => setSelectedTabNo(1)}>
          <Text
            style={{
              color: selectedTabNo == 1 ? Colors.white : '#000',
              fontSize: wp(4),
              fontFamily: Fonts.semibold,
            }}>
            Members
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: selectedTabNo == 2 ? Colors.primary : '#fff',
            height: '100%',
            borderTopRightRadius: wp(40),
            borderBottomRightRadius: wp(40),
          }}
          onPress={() => setSelectedTabNo(2)}>
          <Text
            style={{
              color: selectedTabNo == 2 ? Colors.white : '#000',
              fontSize: wp(4),
              fontFamily: Fonts.semibold,
            }}>
            Contacts
          </Text>
        </Pressable>
      </View>
      {selectedTabNo == 2 ? <SecondTab /> : <FirstTab />}
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
    backgroundColor: Colors.white,
  },
});
