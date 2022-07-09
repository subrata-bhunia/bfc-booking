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
import {CheckBox, Icon, Input} from 'react-native-elements';
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
import {getBookingInfoById, PaymentUpdate} from '../../api/Bookings';
import {useRoute} from '@react-navigation/native';
import Header from '../../components/Header';
import WarningModal from '../../components/WarningModal';
import {UIStore} from '../../UIStore';
import {RadioButton} from 'react-native-simple-radio-button';
import RadioForm from 'react-native-simple-radio-button';
import {SkypeIndicator} from 'react-native-indicators';
import {useDispatch, useSelector} from 'react-redux';
import {calculateAction} from '../../redux/action';

const DueBookingPage = ({navigation}) => {
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

  const [view1, setView1] = useState(true);
  const [view2, setView2] = useState(false);
  const [next1, setnext1] = useState(true);
  const [next2, setnext2] = useState(true);
  const [modal, setmodal] = useState(false);
  const [modalRes, setmodalRes] = useState([]);
  const route = useRoute();
  const booking_id = route?.params?.booking_id;
  const user_id = UIStore.useState(s => s.userId);
  //Activity Indicator
  const [show, setShow] = useState(true);
  // setDate from backend
  const [resDueData, setResDueData] = useState(null);
  const TableHead = ['Item Name', 'Taken', 'Return'];
  const [tableData, setTableData] = useState([]);
  // ---------- Drop Down ---------- //
  const [nextLoader, setnextLoader] = useState(false);
  const [check, setCheck] = useState(false);

  //Rent Variable
  const [Discount, setDiscount] = useState(0);
  const [rent, setRent] = useState(0);
  const [payment, setPayment] = useState(0);
  const [prePayment, setPrePayment] = useState(0);
  const [costOfItems, setCostOfItems] = useState({});
  const [modalData, setmodalData] = useState([]);
  const [openDueWarnModal, setopenDueWarnModal] = useState(false);

  // To get Booking Details (API CALL)
  useEffect(() => {
    handleGetBookingDetails();
  }, []);

  const handleGetBookingDetails = async () => {
    setShow(true);
    getBookingInfoById({booking_id: booking_id}).then(res => {
      const {data, status} = res.data;
      if (status === 'Success') {
        const items = res.data.data.items;
        setShow(false);
        setResDueData(data);
        setRent(parseInt(data.rent));
        setDiscount(parseInt(data.discount));
        setPrePayment(parseInt(data.payment));
        setTableData(items);
        // console.log('handleGetBookingDetails res :', data);
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

  // Payment Update API call
  const handlePaymentUpdate = async () => {
    PaymentUpdate({
      user_id,
      booking_id,
      payment,
      is_full_payment: check,
    })
      .then(res => {
        const {data, status} = res.data;
        if (status === 'Success') {
          setmodalData(data);
          setmodal(true);
        }
        // console.log('PaymentUpdate :', res?.data);
      })
      .catch(err => console.log('err of paymentUpdate :', err));
  };

  // Rent Calculation
  const reduxData = useSelector(state => state.handleCalCulatePrice);
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
        <Header name="Due Booking Details" backBtn={true} />
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
                              {resDueData?.pickup_date}
                            </Text>
                          </View>
                        </View>
                        {resDueData?.pickup_time === 'Morning' ? (
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
                              {resDueData?.return_date}
                            </Text>
                          </View>
                        </View>
                        {resDueData?.return_time === 'Morning' ? (
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
                            }>{`${resDueData?.customer_name}`}</Text>
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
                            }>{`${resDueData?.customer_address}`}</Text>
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
                              {resDueData?.gathering}
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
                              {resDueData?.caterers}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{width: '50%', alignSelf: 'flex-end'}}>
                        <Image
                          source={
                            resDueData?.status === 'Confirm'
                              ? statusIcon.booked
                              : resDueData?.status === 'Pickup'
                              ? statusIcon.pickup
                              : resDueData?.status === 'Due'
                              ? statusIcon.due
                              : resDueData?.status === 'Paid'
                              ? statusIcon.paid
                              : resDueData?.status === 'Missing'
                              ? statusIcon.missing
                              : resDueData?.status === 'Cancel'
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
                        defaultValue={`${resDueData.caterer_charge}`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        disabled
                      />
                    </View>

                    {/* Extra Charges */}
                    {resDueData.extra_charges != 0 ? (
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
                          Extra Charge :
                        </Text>
                        <Input
                          //   placeholder={'0'}
                          keyboardType="number-pad"
                          defaultValue={`${resDueData.extra_charges}`}
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
                          disabled
                        />
                      </View>
                    ) : null}

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
                          parseInt(resDueData?.caterer_charge) +
                          parseInt(resDueData.extra_charges)
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
                        defaultValue={`${resDueData.advanced}`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        disabled
                      />
                    </View>

                    {/* Pre Payment */}
                    {resDueData.payment != 0 ? (
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
                          Previous Payment :
                        </Text>
                        <Input
                          defaultValue={`${resDueData.payment}`}
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
                          disabled
                        />
                      </View>
                    ) : null}

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
                          parseInt(resDueData?.caterer_charge) +
                          parseInt(resDueData.extra_charges) -
                          parseInt(resDueData.advanced) -
                          (parseInt(Discount) ? parseInt(Discount) : 0) -
                          parseInt(resDueData.payment)
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
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: hp(3),
                        // alignSelf: 'center',
                      }}>
                      <CheckBox
                        checked={check}
                        onPress={() => setCheck(!check)}
                        containerStyle={{
                          margin: 0,
                          padding: 0,
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts.semibold,
                          fontSize: wp(3.5),
                          color: Colors.red,
                        }}>
                        Mark as payment full
                      </Text>
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
                  // setreturnbtn(true);
                  setopenDueWarnModal(true);
                }}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#fff',
                  fontSize: 16,
                }}
                btnName="PAYMENT RECIVED"
                disabled={payment ? false : true}
              />
            </View>
          </>
        )}
      </View>
      <WarningModal
        h1="Are you want to Due this booking?"
        open={openDueWarnModal}
        setopen={setopenDueWarnModal}
        yes={{
          name: 'Yes',
          onPress: () => {
            handlePaymentUpdate();
          },
        }}
        no={{
          name: 'No',
        }}
      />

      {/* Due Modal */}
      <Model
        isVisible={modal}
        statusBarTranslucent
        // onBackdropPress={() => setmodal(!modal)}
        backdropOpacity={0.6}
        focusable
        onBackButtonPress={() => {
          setmodal(false);
          navigation.goBack();
        }}
        customBackdrop={
          <View
            style={{
              backgroundColor: '#000',
              height: hp(200),
            }}
          />
        }
        avoidKeyboard>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
            paddingTop: hp(3.5),
          }}>
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 22,
              textAlign: 'center',
              letterSpacing: 1,
            }}>
            Payment Successful
          </Text>
          <View style={{alignItems: 'center'}}>
            <AnimatedLottieView
              autoPlay
              loop={false}
              style={{
                height: hp(20),
                width: wp(10),
              }}
              source={require('./complete.json')}
            />
            {/* <Image
              source={statusIcon.cancel}
              style={{
                height: hp(25),
                width: wp(25),
                resizeMode: 'center',
              }}
            /> */}
          </View>
          <View style={{paddingHorizontal: wp(10), marginTop: -10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
                alignItems: 'center',
              }}>
              <Text style={styles.h2}>Date</Text>
              <Text style={styles.h3}>{modalData?.date}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
                alignItems: 'center',
              }}>
              <Text style={styles.h2}>Booking Id</Text>
              <Text style={[styles.h3]}>{modalData?.booking_id}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
                alignItems: 'center',
              }}>
              <Text style={styles.h2}>Total Amount</Text>
              <Text style={styles.h3}>
                <Icon
                  name="inr"
                  type="fontisto"
                  size={wp(3)}
                  style={{
                    marginRight: 1,
                  }}
                />
                {modalData?.total_amount} /-
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
                alignItems: 'center',
              }}>
              <Text style={styles.h2}>Discount</Text>
              <Text style={styles.h3}>
                <Icon
                  name="inr"
                  type="fontisto"
                  size={wp(3)}
                  style={{
                    marginRight: 1,
                  }}
                />
                {modalData?.discount} /-
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
                alignItems: 'center',
              }}>
              <Text style={styles.h2}>Total Payment</Text>
              <Text style={styles.h3}>
                <Icon
                  name="inr"
                  type="fontisto"
                  size={wp(3)}
                  style={{
                    marginRight: 1,
                  }}
                />
                {modalData?.payment} /-
              </Text>
            </View>
          </View>
          {/*  */}
          <View>
            {/* <Text
              style={[
                styles.h1,
                {textAlign: 'center', marginVertical: hp(5), fontSize: 30},
              ]}>
              {parseInt(modalData?.total_amount) -
                parseInt(modalData?.advanced)}{' '}
              /-
            </Text> */}
            {modalData?.have_whatsapp == 1 ? (
              <Button
                onPress={() => {
                  sendWPsms(modalData?.customer_phone, modalData?.wa_message);
                }}
                btnStyle={{
                  height: 50,
                  width: wp(60),
                  borderRadius: 10,
                  marginVertical: hp(4),
                  backgroundColor: Colors.secondary,
                  // marginVertical: hp(2),
                }}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#000',
                }}
                btnName="Get Bill And Share"
                icon={{
                  name: 'logo-whatsapp',
                  type: 'ionicon',
                }}
              />
            ) : null}
            <TouchableOpacity
              onPress={event => {
                setmodal(false);
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                });
                event.preventDefault();
              }}>
              <View
                style={{
                  height: wp(15),
                  width: wp(15),
                  borderRadius: wp(7.5),
                  borderColor: Colors.red,
                  borderWidth: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  margin: 20,
                }}>
                <Icon
                  name="cross"
                  type="entypo"
                  color={Colors.red}
                  size={wp(10)}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Model>
    </>
  );
};

export default DueBookingPage;

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
