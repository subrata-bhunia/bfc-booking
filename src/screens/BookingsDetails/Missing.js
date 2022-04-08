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
import Model from 'react-native-modal';
import AnimatedLottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  cancelBooking,
  checkReturnItems,
  getReturnBookingById,
  pickupBooking,
  ReturnBooking,
} from '../../api/Bookings';
import {useRoute} from '@react-navigation/native';
import Header from '../../components/Header';
import WarningModal from '../../components/WarningModal';
import {UIStore} from '../../UIStore';
import {RadioButton} from 'react-native-simple-radio-button';
import RadioForm from 'react-native-simple-radio-button';
import {SkypeIndicator} from 'react-native-indicators';
import {useDispatch, useSelector} from 'react-redux';
import {calculateAction} from '../../redux/action';

const MissingBookingPage = ({navigation}) => {
  const dispatch = useDispatch();
  //--------Whatsapp Msg------------- //
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
  //--------------------- //

  const [view0, setView0] = useState(true);
  const [view1, setView1] = useState(true);
  const [view2, setView2] = useState(false);
  const [next1, setnext1] = useState(true);
  const [next2, setnext2] = useState(true);
  const [modal, setmodal] = useState(false);
  const [modalCancel, setmodalCancel] = useState(false);
  const [modalRes, setmodalRes] = useState([]);
  const route = useRoute();
  const booking_id = route?.params?.booking_id;
  const user_id = UIStore.useState(s => s.userId);
  //Activity Indicator
  const [show, setShow] = useState(true);
  // setDate from backend
  const [resMissingBookingData, setResMissingBookingData] = useState(null);
  const [returndate, setreturndate] = useState(null);
  const TableHead2 = ['Item Name', 'Stock', 'Need'];
  const TableHead = ['Item Name', 'Missing', 'Given'];
  const TableHead3 = ['Item Name', 'Qty', 'Price'];
  const [tableData, setTableData] = useState([]);
  // ---------- Drop Down ---------- //
  const [_return, setreturn] = useState(false);
  const [_cateres, setcateres] = useState(false);
  const [nextLoader, setnextLoader] = useState(false);

  // ---------- Confirm -------------- //
  const [canclebtn, setcancle] = useState([]);
  const [openCancelModal, setopenCancelModal] = useState(false);

  //Rent Variable
  const [Discount, setDiscount] = useState(0);
  const [rent, setRent] = useState(0);
  const [payment, setPayment] = useState(0);
  const [costOfItems, setCostOfItems] = useState({});

  // To get Booking Details (API CALL)
  useEffect(() => {
    handleGetBookingDetails();
  }, []);

  const handleGetBookingDetails = async () => {
    setShow(true);
    getReturnBookingById({booking_id: booking_id}).then(res => {
      const {data, status, rent} = res.data;
      if (status === 'Success') {
        const items = res.data.data.items;
        setShow(false);
        setResMissingBookingData(data);
        setRent(data.rent);
        setDiscount(parseInt(data.discount));
        setTableData(items);
        setCostOfItems(rent);
        var newObj = new Object();
        for (var i = 0; i < items.length; i++) {
          var key = items[i][2].item_id;
          var value = items[i][2].taken;
          if (value != 0) {
            newObj[key] = value;
          }
        }
      }
    });
  };

  // handle Payment Accept (API CALL)

  console.log('ResData item :', resMissingBookingData);
  console.log('tableData item :', tableData);

  // Rent Calculation

  const reduxData = useSelector(state => state.handleCalCulatePrice);
  console.log('Total Price', reduxData);

  useEffect(() => {
    if (reduxData.uniqueId == booking_id) {
      setRent(reduxData.totalAmount);
    }
  }, [reduxData]);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.secondary,
          // paddingTop: StatusBar.currentHeight,
          padding: 10,
        }}>
        <Header name="Missing Booking Details" backBtn={true} />
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
                              {resMissingBookingData?.pickup_date}
                            </Text>
                          </View>
                        </View>
                        {resMissingBookingData?.pickup_time === 'Morning' ? (
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
                              {resMissingBookingData?.return_date}
                            </Text>
                          </View>
                        </View>
                        {resMissingBookingData?.return_time === 'Morning' ? (
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
                            }>{`${resMissingBookingData?.customer_name}`}</Text>
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
                            }>{`${resMissingBookingData?.customer_address}`}</Text>
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
                              {resMissingBookingData?.gathering}
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
                              {resMissingBookingData?.caterers}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{width: '50%', alignSelf: 'flex-end'}}>
                        <Image
                          source={
                            resMissingBookingData?.status === 'Confirm'
                              ? statusIcon.booked
                              : resMissingBookingData?.status === 'Pickup'
                              ? statusIcon.pickup
                              : resMissingBookingData?.status === 'Due'
                              ? statusIcon.due
                              : resMissingBookingData?.status === 'Paid'
                              ? statusIcon.paid
                              : resMissingBookingData?.status === 'Missing'
                              ? statusIcon.missing
                              : resMissingBookingData?.status === 'Cancel'
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
                        {/* Check By Kaustav Da */}
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
                        setnext2(true);
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
                    setView0(false);
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
                        defaultValue={`${rent}`}
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
                        defaultValue={`${resMissingBookingData.caterer_charge}`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        disabled
                      />
                      {console.log(resMissingBookingData?.caterer_charge)}
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
                          parseInt(rent) +
                          parseInt(resMissingBookingData?.caterer_charge)
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
                        defaultValue={`${Discount}`}
                        value={Discount}
                        onChangeText={txt => {
                          setDiscount(txt);
                        }}
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
                        defaultValue={`${resMissingBookingData.advanced}`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        disabled
                      />
                    </View>

                    {/* Pending Amount */}
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
                        Pending Amount :
                      </Text>
                      <Input
                        disabled
                        defaultValue={`${
                          parseInt(rent) +
                          parseInt(resMissingBookingData?.caterer_charge) -
                          parseInt(resMissingBookingData.advanced) -
                          (parseInt(Discount) ? parseInt(Discount) : 0)
                        }`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
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
                        defaultValue={'0'}
                        keyboardType="number-pad"
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        placeholder={'0'}
                        value={payment}
                        onChangeText={txt => {
                          setPayment(txt);
                        }}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
              <View style={{height: StatusBar.currentHeight + hp(9) + hp(4)}} />

              {/* </KeyboardAvoidingView> */}
            </ScrollView>
            {/* Two Button */}

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                margin: wp(4),
              }}>
              <Button
                btnStyle={{
                  height: hp(7),
                  width: wp(35),
                  backgroundColor: '#fff',
                  shadowColor: Colors.primary,
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3.5,
                  elevation: 10,
                  marginRight: wp(2),
                  borderRadius: wp(66),
                }}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#000',
                  fontSize: 16,
                }}
                btnName="REMIND"
                icon={{
                  name: 'logo-whatsapp',
                  type: 'ionicon',
                }}
              />
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
                  //   setreturnbtn(true);
                }}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#fff',
                  fontSize: 16,
                }}
                btnName="ITEM RECIVED"
              />
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default MissingBookingPage;

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
