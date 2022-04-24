import {
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts, Icons, statusIcon} from '../../constants';
import {Icon, Input} from 'react-native-elements';
import {TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import Button from '../../components/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import LinearGradient from 'react-native-linear-gradient';
import {getBookingInfoById} from '../../api/Bookings';
import {useRoute} from '@react-navigation/native';
import Header from '../../components/Header';
import {UIStore} from '../../UIStore';
import {SkypeIndicator} from 'react-native-indicators';
import {useDispatch, useSelector} from 'react-redux';

const PaidBooking = ({navigation}) => {
  const dispatch = useDispatch();

  const [view1, setView1] = useState(false);
  const [view2, setView2] = useState(true);
  const route = useRoute();
  const booking_id = route?.params?.booking_id;
  const user_id = UIStore.useState(s => s.userId);
  //Activity Indicator
  const [show, setShow] = useState(true);
  // setDate from backend
  const [resCancelData, setResCancelData] = useState(null);
  const TableHead = ['Item Name', 'Available', 'Taken'];
  const [tableData, setTableData] = useState([]);
  // ---------- Drop Down ---------- //
  const [_return, setreturn] = useState(false);
  const [_cateres, setcateres] = useState(false);
  const [nextLoader, setnextLoader] = useState(false);

  // To get Booking Details (API CALL)
  useEffect(() => {
    handleGetBookingDetails();
  }, []);
  const sendWPsms = (phone, msg) => {
    var phone_n = phone.split(' ').join('').replace('+91', '');
    var phone_new = phone_n.charAt(0) === '0' ? phone_n.substring(1) : phone_n;
    Linking.openURL(
      'whatsapp://send?text=' + msg + '&phone=91' + phone_new,
    ).catch(err =>
      ToastAndroid.show(
        "Can't Open Whatsapp.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      ),
    );
    // console.log("WP")
  };
  const handleGetBookingDetails = async () => {
    setShow(true);
    getBookingInfoById({booking_id: booking_id, user_id: user_id}).then(res => {
      const {data, status} = res.data;
      if (status === 'Success') {
        const items = res.data.data.items;
        setShow(false);
        setResCancelData(data);
        setTableData(items);
      }
      console.log(data);
    });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.secondary,
          // paddingTop: StatusBar.currentHeight,
          padding: 10,
        }}>
        <Header name="Paid Booking Details" backBtn={true} />
        {show ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SkypeIndicator color={Colors.botton} count={5} size={wp(14)} />
          </View>
        ) : (
          <>
            <ScrollView
              keyboardDismissMode="interactive"
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}>
              {/* Personal */}
              <View>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  activeOpacity={10}>
                  <LinearGradient
                    colors={['#eee', '#eee', '#fff']}
                    style={{
                      // height: hp(30),
                      paddingVertical: hp(3),
                      width: wp(90),
                      elevation: 2,
                      borderRadius: hp(1),
                      margin: 10,
                      opacity: 1,
                      padding: 10,
                      paddingHorizontal: wp(6),
                    }}>
                    {/* personal first sec */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                          <Text style={styles.textH1}>Pickup</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={styles.date}>
                              {resCancelData?.pickup_date}
                            </Text>
                          </View>
                        </View>
                        {resCancelData?.pickup_time === 'Morning' ? (
                          <Icon
                            name="sunny-sharp"
                            type="ionicon"
                            raised
                            size={20}
                          />
                        ) : (
                          <Icon name="moon" type="ionicon" reverse size={20} />
                        )}
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                          <Text style={styles.textH1}>Return</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={styles.date}>
                              {resCancelData?.return_date}
                            </Text>
                          </View>
                        </View>
                        {resCancelData?.return_time === 'Morning' ? (
                          <Icon
                            name="sunny-sharp"
                            type="ionicon"
                            raised
                            size={20}
                          />
                        ) : (
                          <Icon name="moon" type="ionicon" reverse size={20} />
                        )}
                      </View>
                    </View>
                    {/* Personal second sec */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{width: '75%'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <Icon name="person" />
                          <Text
                            style={
                              styles.textH2
                            }>{`${resCancelData?.customer_name}`}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <Icon name="home" />
                          <Text
                            style={
                              styles.textH2
                            }>{`${resCancelData?.customer_address}`}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '70%',
                            marginTop: 5,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // width: wp(19),
                              // justifyContent: 'space-between',
                            }}>
                            <Icon
                              name="users"
                              type="font-awesome-5"
                              size={20}
                            />
                            <Text style={styles.textH2}>
                              {' '}
                              {resCancelData?.gathering}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: wp(15),
                              justifyContent: 'space-between',
                            }}>
                            <Image
                              source={Icons.catering}
                              style={{
                                height: 25,
                                width: 25,
                              }}
                            />
                            <Text style={styles.textH2}>
                              {resCancelData?.caterers}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{width: '50%', alignSelf: 'flex-end'}}>
                        <Image
                          source={
                            resCancelData?.status === 'Confirm'
                              ? statusIcon.booked
                              : resCancelData?.status === 'Pickup'
                              ? statusIcon.pickup
                              : resCancelData?.status === 'Due'
                              ? statusIcon.due
                              : resCancelData?.status === 'Paid'
                              ? statusIcon.paid
                              : resCancelData?.status === 'Missing'
                              ? statusIcon.missing
                              : resCancelData?.status === 'Cancel'
                              ? statusIcon.cancel
                              : statusIcon.booked
                          }
                          style={{
                            height: hp(11),
                            resizeMode: 'center',
                            width: hp(11),
                            marginBottom: -hp(1),
                          }}
                          PlaceholderContent={
                            <ActivityIndicator
                              size={30}
                              color={Colors.yellow}
                              style={{alignSelf: 'center'}}
                            />
                          }
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* 2nd  Items*/}

              <View>
                <TouchableOpacity
                  onPress={() => {
                    setView1(!view1);
                    setView2(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    justifyContent: 'space-between',
                    backgroundColor: Colors.white,
                    padding: 20,
                    borderRadius: 10,
                    shadowColor: '#0f0',
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 10,
                    width: wp(93),
                    alignSelf: 'center',
                  }}>
                  <View style={{width: wp(70)}}>
                    <Text style={styles.h1}>Items Details</Text>
                    <Text style={styles.sub}>
                      কড়া, ডেক, বালতি, Mixer Grinder ...
                    </Text>
                  </View>
                  <Icon
                    name="arrow-drop-down-circle"
                    type="material"
                    size={30}
                  />
                </TouchableOpacity>
                {view1 ? (
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: Colors.white,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      borderRadius: 10,
                      shadowColor: '#999',
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.5,
                      // elevation: 10,
                      width: wp(93),
                      alignSelf: 'center',
                      marginTop: -hp(1.5),
                    }}>
                    {/* Table */}
                    <View>
                      <Table
                        borderStyle={{
                          borderColor: Colors.secondary,
                          borderWidth: 2,
                        }}
                        style={{}}>
                        <Row
                          data={TableHead}
                          style={styles.head}
                          textStyle={styles.text}
                        />

                        {tableData.map((rowData, index) => (
                          <TableWrapper key={index} style={styles.row}>
                            {rowData.map((cellData, cellIndex) => (
                              <Cell
                                key={cellIndex}
                                data={cellData}
                                textStyle={styles.text}
                              />
                            ))}
                          </TableWrapper>
                        ))}
                      </Table>
                    </View>
                    <Button
                      onPress={() => {
                        setView1(!view1);
                        setView2(true);
                      }}
                      isLoader={nextLoader}
                      btnStyle={{
                        height: hp(6),
                        width: wp(80),
                        borderRadius: 50,
                        backgroundColor: Colors.botton,
                        marginVertical: hp(2),
                        shadowColor: Colors.primary,
                        shadowOffset: {
                          width: 0,
                          height: 10,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 3.5,
                        // elevation: 10,
                      }}
                      textStyle={{
                        fontFamily: Fonts.semibold,
                        color: '#fff',
                        fontSize: wp(4),
                      }}
                      btnName="Next"
                    />
                  </View>
                ) : null}
              </View>

              {/* 3rd */}

              <View>
                <TouchableOpacity
                  onPress={() => {
                    setView1(false);
                    setView2(!view2);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    justifyContent: 'space-between',
                    backgroundColor: Colors.white,
                    padding: 20,
                    borderRadius: 10,
                    shadowColor: '#0f0',
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 10,
                    width: wp(93),
                    alignSelf: 'center',
                    // marginBottom: hp(2),
                  }}>
                  <View style={{width: wp(70)}}>
                    <Text style={styles.h1}>Payment Details</Text>
                    <Text style={styles.sub}>Advanced,Full Payment ...</Text>
                  </View>
                  <Icon
                    name="arrow-drop-down-circle"
                    type="material"
                    size={30}
                  />
                </TouchableOpacity>
                {view2 ? (
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: Colors.white,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      borderRadius: 10,
                      shadowColor: '#999',
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.5,
                      // elevation: 10,
                      width: wp(93),
                      alignSelf: 'center',
                      marginTop: -hp(1.5),
                    }}>
                    {/* Rent */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.semibold,
                          fontSize: wp(4),
                          width: wp(40),
                          textAlign: 'right',
                        }}>
                        Rent :
                      </Text>
                      <Input
                        defaultValue={`${resCancelData?.rent}`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        disabled
                      />
                    </View>

                    {/* Caterers Charges */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: -wp(4),
                        // display: caterersvalue === 'Yes' ? 'flex' : 'none',
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.semibold,
                          fontSize: wp(4),
                          width: wp(40),
                          textAlign: 'right',
                        }}>
                        Caterer Charge :
                      </Text>
                      <Input
                        //   placeholder={'0'}
                        keyboardType="number-pad"
                        defaultValue={`${resCancelData?.caterer_charge}`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        disabled
                      />
                    </View>

                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#000',
                        opacity: 0.1,
                      }}
                    />

                    {/* Total */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.semibold,
                          fontSize: wp(4),
                          width: wp(40),
                          textAlign: 'right',
                        }}>
                        Total Amount :
                      </Text>
                      <Input
                        disabled
                        defaultValue={`${
                          parseInt(resCancelData?.rent) +
                          parseInt(resCancelData?.caterer_charge)
                        }`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                      />
                    </View>

                    {/* Discount */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: -wp(4),
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.semibold,
                          fontSize: wp(4),
                          width: wp(40),
                          textAlign: 'right',
                        }}>
                        Discount :
                      </Text>
                      <Input
                        disable
                        defaultValue={`${resCancelData?.discount}`}
                        keyboardType="number-pad"
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        placeholder={'0'}
                        disabled={true}
                      />
                    </View>

                    {/* Advanced */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: -wp(4),
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.semibold,
                          fontSize: wp(4),
                          width: wp(40),
                          textAlign: 'right',
                        }}>
                        Advanced :
                      </Text>
                      <Input
                        defaultValue={`${resCancelData?.advanced}`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        disabled
                      />
                    </View>

                    {/* Payment*/}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: -wp(4),
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.semibold,
                          fontSize: wp(4),
                          width: wp(40),
                          textAlign: 'right',
                        }}>
                        Payment :
                      </Text>
                      <Input
                        disabled
                        defaultValue={'0'}
                        keyboardType="number-pad"
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        placeholder={'0'}
                        value={resCancelData?.payment}
                        onChangeText={txt => {
                          setPayment(txt);
                        }}
                      />
                    </View>
                    {/* Refund */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: -wp(4),
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.semibold,
                          fontSize: wp(4),
                          width: wp(40),
                          textAlign: 'right',
                        }}>
                        Refund :
                      </Text>
                      <Input
                        disabled
                        defaultValue={`${
                          parseInt(resCancelData?.payment) +
                          parseInt(resCancelData?.advanced)
                        }`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  margin: wp(4),
                  alignSelf: 'center',
                }}>
                {resCancelData?.have_whatsapp == 1 ? (
                  <Button
                    btnStyle={{
                      height: hp(7),
                      width: wp(55),
                      backgroundColor: '#2196F3',
                      shadowColor: Colors.primary,
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3.5,
                      elevation: 10,
                      borderRadius: wp(66),
                    }}
                    onPress={() => {
                      sendWPsms(resCancelData?.customer_phone, 'Test To Msg.');
                    }}
                    textStyle={{
                      fontFamily: Fonts.semibold,
                      color: '#fff',
                      fontSize: 16,
                    }}
                    icon={{
                      name: 'logo-whatsapp',
                      type: 'ionicon',
                      color: Colors.white,
                    }}
                    btnName="SHARE INVOICE"
                  />
                ) : null}
              </View>
              <View style={{height: StatusBar.currentHeight + hp(9)}} />

              {/* </KeyboardAvoidingView> */}
            </ScrollView>
            {/* Two Button */}

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                margin: wp(4),
              }}></View>
          </>
        )}
      </View>
    </>
  );
};

export default PaidBooking;

const styles = StyleSheet.create({
  h1: {
    fontFamily: Fonts.bold,
    fontSize: wp(4),
  },
  sub: {
    fontFamily: Fonts.regular,
    color: Colors.disable,
    letterSpacing: 2,
  },
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#808B97', textAlign: 'center'},
  text: {margin: 6, textAlign: 'center', fontFamily: Fonts.bold},
  row: {flexDirection: 'row', backgroundColor: '#fff'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
  h2: {
    fontFamily: Fonts.semibold,
    color: 'rgba(0,0,0,0.4)',
    fontSize: wp(4),
  },
  h3: {
    fontFamily: Fonts.semibold,
    color: 'rgba(0,0,0,1)',
    fontSize: wp(4),
  },
  textH1: {
    fontFamily: Fonts.bold,
    color: Colors.text,
    fontSize: 16,
    textAlign: 'left',
  },
  date: {
    fontFamily: Fonts.medium,
  },
  textH2: {
    fontFamily: Fonts.semibold,
  },
});
