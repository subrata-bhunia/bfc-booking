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

const BookingDetails = ({navigation}) => {
  const [view0, setView0] = useState(true);
  const [view1, setView1] = useState(false);
  const [view2, setView2] = useState(false);
  const [next1, setnext1] = useState(true);
  const [next2, setnext2] = useState(true);
  const [modal, setmodal] = useState(false);
  const [modalCancel, setmodalCancel] = useState(false);
  const [modalRes, setmodalRes] = useState([]);
  const [modifyView, setModifyView] = useState(false);
  const [clickModifyBtn, setClickModifyBtn] = useState(false);
  const [clickReturnBtn, setClickReturnBtn] = useState(false);
  const [modifyHandle, setModifyHandle] = useState(true);
  const route = useRoute();
  const booking_id = route?.params?.booking_id;
  const user_id = UIStore.useState(s => s.userId);
  //Activity Indicator
  const [show, setShow] = useState(false);
  // setDate from backend
  const [resReturnData, setResReturnData] = useState(null);
  const [returndate, setreturndate] = useState(null);
  const TableHead2 = ['Item Name', 'Stock', 'Need'];
  const TableHead = ['Item Name', 'Taken', 'Return'];
  const TableHead3 = ['Item Name', 'Qty', 'Price'];
  const [tableData, setTableData] = useState([]);
  // ---------- Drop Down ---------- //
  const [_return, setreturn] = useState(false);
  const [_cateres, setcateres] = useState(false);
  const [nextLoader, setnextLoader] = useState(false);

  // ---------- Confirm -------------- //
  const [canclebtn, setcancle] = useState([]);
  const [openCancelModal, setopenCancelModal] = useState(false);
  const [pickupbtn, setpickup] = useState(false);
  const [pickupitem, setpickupitem] = useState([]);
  const [pickupitemRes, setpickupitemRes] = useState([]);
  const [pickuppayment, setpickuppayment] = useState('');
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
  const CancelClick = () => {
    setShow(true);
    setopenCancelModal(false);
    cancelBooking({
      booking_id: booking_id,
      user_id: user_id,
    })
      .then(res => {
        if (res?.data?.status === 'Success') {
          setcancle(res?.data?.data);
          setmodalCancel(true);
          setmodalRes(res?.data?.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // console.log(modalRes);
  const obj1 = new Object();
  const arr = new Array();
  const AddItems = (key, value) => {
    obj1[key] = value;
    arr.push(obj1);
  };
  const PickupClick = () => {
    setpickup(false);
    setShow(true);
    pickupBooking({
      user_id: user_id,
      booking_id: booking_id,
      items: pickupitem,
      payment: pickuppayment,
    })
      .then(res => {
        if (res?.data?.status === 'Success') {
          setpickupitemRes(res?.data?.data);
          setmodal(true);
          setmodalRes(res?.data?.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  //--------------- Pickup ----------- //
  const [returnbtn, setreturnbtn] = useState(false);
  const [returnBtnDisable, setreturnBtnDisable] = useState(true);
  // const [returnPayment,setreturnPayment]=useState(0)
  // -------------- Due ------------------- //
  // const [modifybtn,setmodifybtn] = useState(false)
  // const [modifybtn,setmodifybtn] = useState(false)
  useEffect(() => {
    handleGetBookingDetails();
    setpickuppayment('');
  }, [canclebtn, pickupitemRes]);
  useEffect(() => {
    if (resReturnData?.status === 'Pickup') {
      setView1(true);
    }
  }, [resReturnData]);

  const handleGetBookingDetails = async () => {
    setShow(true);
    getReturnBookingById({booking_id: booking_id}).then(res => {
      const {data, status} = res.data;
      if (status === 'Success') {
        setShow(false);
        setResReturnData(data);
        setTableData(res.data.data.items);
      }
      // console.log('getData', data);
    });
  };
  // ----------------- Next ----------- //
  const [nextModal, setnextModal] = useState(false);
  const [nextModalres, setnextModalres] = useState([]);
  const NextButtonClick = () => {
    setpickupitem;
    console.log(obj1);
    if (resReturnData?.status === 'Pickup') {
      setnextLoader(true);
      checkReturnItems({
        booking_id: booking_id,
        items: obj1,
      })
        .then(res => {
          if (res?.data?.status === 'Missing') {
            setnextModalres(res?.data?.data);
            setnextLoader(false);
            setnextModal(true);
          } else {
            setView1(!view1);
            setnext2(true);
            setView2(true);
            setnextLoader(false);
            setreturnBtnDisable(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setView1(!view1);
      setnext2(true);
      setView2(true);
    }
  };
  var radio_props = [
    {label: 'Product Price', value: 0},
    {label: 'Products', value: 1},
  ];
  const [chooseByUser, setchooseByuser] = useState('Product Price');
  const [Discount, setDiscount] = useState(0);
  const [ReturnModal, setReturnModal] = useState(false);
  const [extra, setextra] = useState(0);
  const ReturnClick = () => {
    setreturnbtn(false);
    setShow(true);
    ReturnBooking({
      user_id: user_id,
      booking_id: booking_id,
      settled_by: chooseByUser,
      payment: pickuppayment,
      discount: Discount,
      extra_charges: extra,
    })
      .then(res => {
        setShow(false);
        setReturnModal(true);
        setmodalRes(res?.data?.data);
        setpickupitemRes(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      {resReturnData === null ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={hp(7)} color={Colors.primary} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.secondary,
            // paddingTop: StatusBar.currentHeight,
            padding: 10,
          }}>
          <Header name="Booking Details" backBtn={true} />
          {show ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={hp(7)} color={Colors.primary} />
            </View>
          ) : (
            <ScrollView
              keyboardDismissMode="interactive"
              showsVerticalScrollIndicator={false}>
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
                    {/* 1st */}
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
                              {resReturnData?.pickup_date}
                            </Text>
                          </View>
                        </View>
                        {resReturnData?.pickup_time === 'Morning' ? (
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
                              {resReturnData?.return_date}
                            </Text>
                          </View>
                        </View>
                        {resReturnData?.return_time === 'Morning' ? (
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
                    {/* 2nd */}
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
                            }>{`${resReturnData?.customer_name}`}</Text>
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
                            }>{`${resReturnData?.customer_address}`}</Text>
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
                              {resReturnData?.gathering}
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
                              {resReturnData?.caterers}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{width: '50%', alignSelf: 'flex-end'}}>
                        <Image
                          source={
                            resReturnData?.status === 'Confirm'
                              ? statusIcon.booked
                              : resReturnData?.status === 'Pickup'
                              ? statusIcon.pickup
                              : resReturnData?.status === 'Due'
                              ? statusIcon.due
                              : resReturnData?.status === 'Paid'
                              ? statusIcon.paid
                              : resReturnData?.status === 'Missing'
                              ? statusIcon.missing
                              : resReturnData?.status === 'Cancel'
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
              {modifyView === true ? (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setView0(false);
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
                                  data={
                                    cellIndex === 3 ? (
                                      <Input
                                        placeholder="0"
                                        textAlign="center"
                                        value={cellData}
                                        onChangeText={txt =>
                                          console.log(cellData, txt)
                                        }
                                        keyboardType="numeric"
                                      />
                                    ) : (
                                      cellData
                                    )
                                  }
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
                          elevation: 10,
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
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setView0(false);
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
                            data={
                              resReturnData?.status === 'Confirm'
                                ? TableHead2
                                : TableHead
                            }
                            style={styles.head}
                            textStyle={styles.text}
                          />
                          {tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                              {rowData.map((cellData, cellIndex) => (
                                <Cell
                                  key={cellIndex}
                                  data={
                                    cellIndex === 2 ? (
                                      <Input
                                        placeholder={`${cellData.taken}`}
                                        placeholderTextColor={Colors.text}
                                        // value={}
                                        defaultValue={
                                          pickupitem[cellData?.item_id]
                                        }
                                        textAlign="center"
                                        onChangeText={txt =>
                                          AddItems(cellData?.item_id, txt)
                                        }
                                        keyboardType="numeric"
                                      />
                                    ) : (
                                      cellData
                                    )
                                  }
                                  textStyle={styles.text}
                                />
                              ))}
                            </TableWrapper>
                          ))}
                        </Table>
                      </View>
                      <Button
                        onPress={() => {
                          NextButtonClick();
                          setpickupitem(obj1);
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
              )}
              {/* 3rd */}
              {modifyView === true ? (
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
                          defaultValue={'0'}
                          keyboardType="number-pad"
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
                        />
                      </View>
                      {/* Caterer Charge */}
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
                          Caterer Charge :
                        </Text>
                        <Input
                          defaultValue={'0'}
                          keyboardType="number-pad"
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
                        />
                      </View>
                      {/* Extra */}
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
                          Product Prices :
                        </Text>
                        <Input
                          defaultValue={'0'}
                          keyboardType="number-pad"
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
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
                          defaultValue={'0'}
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
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
                          defaultValue={'0'}
                          keyboardType="number-pad"
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
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
                          defaultValue={'0'}
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
                        />
                      </View>
                      {/* <Button
                  onPress={() => {
                    setmodal(true);
                  }}
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
                    elevation: 10,
                  }}
                  textStyle={{
                    fontFamily: Fonts.semibold,
                    color: '#fff',
                    fontSize: wp(4),
                  }}
                  btnName="UPDATE BOOKING"
                /> */}
                    </View>
                  ) : null}
                </View>
              ) : (
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
                          defaultValue={`${resReturnData.rent}`}
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
                      {/* Caterer Charge */}
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
                          Caterer Charge :
                        </Text>
                        <Input
                          defaultValue={`${resReturnData.caterer_charge}`}
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
                      {/* Extra */}
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
                          Extra Charges :
                        </Text>
                        <Input
                          value={`${extra}`}
                          keyboardType="number-pad"
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
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
                            parseInt(resReturnData.total_amount) +
                            parseInt(extra)
                          }`}
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
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
                          defaultValue={`${resReturnData.advanced}`}
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
                          defaultValue={`${resReturnData.pending_payment}`}
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
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
                          value={Discount}
                          onChangeText={txt => {
                            setDiscount(txt);
                          }}
                          keyboardType="number-pad"
                          containerStyle={{width: wp(40), height: hp(10)}}
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
                          placeholder={'0'}
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
                          leftIcon={
                            <Icon name="inr" type="fontisto" size={15} />
                          }
                          inputStyle={{
                            fontSize: wp(4),
                          }}
                          placeholder={'0'}
                          value={pickuppayment}
                          onChangeText={txt => {
                            setpickuppayment(txt);
                          }}
                        />
                      </View>
                    </View>
                  ) : null}
                </View>
              )}

              <View style={{height: StatusBar.currentHeight + hp(9) + hp(4)}} />

              {/* </KeyboardAvoidingView> */}
            </ScrollView>
          )}
          {/* Bottons */}
          {resReturnData?.status === 'Confirm' ? (
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
                  width: wp(45),
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
                onPress={() => {
                  setopenCancelModal(true);
                }}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#000',
                  fontSize: 16,
                }}
                btnName="CANCEL"
              />
              <Button
                onPress={() => {
                  setpickup(true);
                  console.log(pickupitem);
                }}
                btnStyle={{
                  height: hp(7),
                  width: wp(45),
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
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#fff',
                  fontSize: 16,
                }}
                btnName="PICKUP"
              />
            </View>
          ) : resReturnData?.status === 'Pickup' ? (
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
                  width: wp(45),
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
                disabled={true}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#000',
                  fontSize: 16,
                }}
                btnName="MODIFY"
              />
              <Button
                btnStyle={{
                  height: hp(7),
                  width: wp(45),
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
                  setreturnbtn(true);
                }}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#fff',
                  fontSize: 16,
                }}
                disabled={returnBtnDisable}
                btnName="RETURN"
              />
            </View>
          ) : resReturnData?.status === 'Due' ? (
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
                  setreturnbtn(true);
                }}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#fff',
                  fontSize: 16,
                }}
                btnName="PAYMENT RECIVED"
              />
            </View>
          ) : resReturnData?.status === 'Missing' ? (
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
                  setreturnbtn(true);
                }}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#fff',
                  fontSize: 16,
                }}
                btnName="ITEM RECIVED"
              />
            </View>
          ) : resReturnData?.status === 'Paid' ? (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                margin: wp(4),
                alignSelf: 'center',
              }}>
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
                  setreturnbtn(true);
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
            </View>
          ) : null}
        </View>
      )}
      <WarningModal
        h1="Are you want to cancel this booking?"
        open={openCancelModal}
        setopen={setopenCancelModal}
        yes={{
          name: 'Yes',
          onPress: () => {
            CancelClick();
          },
        }}
        no={{
          name: 'No',
        }}
      />
      <WarningModal
        h1="Are you sure to confirm pickup this booking?"
        open={pickupbtn}
        setopen={setpickup}
        yes={{
          name: 'Yes',
          onPress: () => {
            setpickup(!pickupbtn);
            PickupClick();
          },
        }}
        no={{
          name: 'No',
        }}
      />
      <WarningModal
        h1="Are you sure to confirm return this booking?"
        open={returnbtn}
        setopen={setreturnbtn}
        yes={{
          name: 'Yes',
          onPress: () => {
            ReturnClick();
          },
        }}
        no={{
          name: 'No',
        }}
      />
      {/* Pickup Modal */}
      <Model
        isVisible={modal}
        statusBarTranslucent
        // onBackdropPress={() => setmodal(!modal)}
        backdropOpacity={0.6}
        focusable
        onBackButtonPress={() => {
          setmodal(false);
          // navigation.navigate('Home');
        }}
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
            Pickup Successful
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
              }}>
              <Text style={styles.h2}>Date</Text>
              <Text style={styles.h3}>{modalRes?.date}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
              }}>
              <Text style={styles.h2}>Booking Id</Text>
              <Text style={styles.h3}>{modalRes?.booking_id}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
              }}>
              <Text style={styles.h2}>Advanced</Text>
              <Text style={styles.h3}>{modalRes?.advanced} /-</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
              }}>
              <Text style={styles.h2}>Total Amount</Text>
              <Text style={styles.h3}>{modalRes?.total_amount} /-</Text>
            </View>
          </View>
          {/*  */}
          <View>
            {/* <Text
              style={[
                styles.h1,
                {
                  textAlign: 'center',
                  marginVertical: hp(7),
                  fontSize: 30,
                },
              ]}>
              {modalRes?.pending_amount} /-
            </Text> */}
            {modalRes?.have_whatsapp == 1 ? (
              <Button
                onPress={() => {
                  sendWPsms(modalRes?.customer_phone, modalRes?.wa_message);
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
                btnName="Share on Whatsapp"
                icon={{
                  name: 'logo-whatsapp',
                  type: 'ionicon',
                }}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => {
                setmodal(false);
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
      {/* Cancel Modal */}
      <Model
        isVisible={modalCancel}
        statusBarTranslucent
        // onBackdropPress={() => setmodal(!modal)}
        backdropOpacity={0.6}
        focusable
        onBackButtonPress={() => {
          setmodalCancel(false);
          // navigation.navigate('Home');
        }}
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
            Cancel Successful
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
              }}>
              <Text style={styles.h2}>Date</Text>
              <Text style={styles.h3}>{modalRes?.date}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
              }}>
              <Text style={styles.h2}>Booking Id</Text>
              <Text style={styles.h3}>{modalRes?.booking_id}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
              }}>
              <Text style={styles.h2}>Advanced</Text>
              <Text style={styles.h3}>{modalRes?.advanced} /-</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
              }}>
              <Text style={styles.h2}>Total Amount</Text>
              <Text style={styles.h3}>{modalRes?.total_amount} /-</Text>
            </View>
          </View>
          {/*  */}
          <View>
            {/* <Text
              style={[
                styles.h1,
                {
                  textAlign: 'center',
                  marginVertical: hp(7),
                  fontSize: 30,
                },
              ]}>
              {modalRes?.pending_amount} /-
            </Text> */}
            {modalRes?.have_whatsapp == 1 ? (
              <Button
                onPress={() => {
                  sendWPsms(modalRes?.customer_phone, modalRes?.wa_message);
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
                btnName="Share on Whatsapp"
                icon={{
                  name: 'logo-whatsapp',
                  type: 'ionicon',
                }}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => {
                setmodalCancel(false);
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
      {/* Return Modal */}
      <Model
        isVisible={ReturnModal}
        statusBarTranslucent
        // onBackdropPress={() => setmodal(!modal)}
        backdropOpacity={0.6}
        focusable
        onBackButtonPress={() => {
          setReturnModal(false);
          // navigation.navigate('Home');
        }}
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
            Return Successful
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
          </View>
          <View style={{paddingHorizontal: wp(10), marginTop: -10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
              }}>
              <Text style={styles.h2}>Date</Text>
              <Text style={styles.h3}>{modalRes?.date}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
              }}>
              <Text style={styles.h2}>Booking Id</Text>
              <Text style={styles.h3}>{modalRes?.booking_id}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
              }}>
              <Text style={styles.h2}>Payment</Text>
              <Text style={styles.h3}>{modalRes?.payment} /-</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: hp(2),
              }}>
              <Text style={styles.h2}>Total Amount</Text>
              <Text style={styles.h3}>{modalRes?.total_amount} /-</Text>
            </View>
          </View>
          {/*  */}
          <View>
            {modalRes?.have_whatsapp == 1 ? (
              <Button
                onPress={() => {
                  sendWPsms(modalRes?.customer_phone, modalRes?.wa_message);
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
                btnName="Share on Whatsapp"
                icon={{
                  name: 'logo-whatsapp',
                  type: 'ionicon',
                }}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => {
                setReturnModal(false);
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
      {/* Retrun Missing Modal */}
      <Model isVisible={nextModal}>
        <View
          style={{
            // height: hp(80),
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: 10,
            paddingTop: hp(3.5),
          }}>
          {/* msg */}
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 22,
              textAlign: 'center',
              letterSpacing: 1,
            }}>
            Missing Item Details
          </Text>
          {/* Missing Table */}
          <View
            style={{
              marginVertical: 20,
            }}>
            <Table
              borderStyle={{
                borderColor: Colors.secondary,
                borderWidth: 2,
              }}
              style={{}}>
              <Row
                data={TableHead3}
                style={styles.head}
                textStyle={styles.text}
              />
              {nextModalres?.missing_items?.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={cellData}
                      textStyle={[styles.text, {padding: 10}]}
                    />
                  ))}
                </TableWrapper>
              ))}
            </Table>
            <Table
              borderStyle={{
                borderColor: Colors.disable,
                borderWidth: 2,
                borderTopColor: '#000',
              }}
              style={{
                marginVertical: 10,
              }}>
              <Row
                data={['Total', nextModalres?.missing_charge]}
                style={{height: 30}}
                textStyle={styles.text}
              />
            </Table>
          </View>
          {/* Choose  */}
          <View>
            <Text style={[styles.h3, {marginBottom: 20}]}>
              What You choose?
            </Text>
            <RadioForm
              accessibilityLabel="Test"
              animation={true}
              radio_props={radio_props}
              initial={0}
              buttonColor={Colors.disable}
              onPress={val => {
                val === 0
                  ? setchooseByuser('Product Price')
                  : setchooseByuser('Products');
              }}
            />
          </View>
          {/* Button */}
          <TouchableOpacity
            onPress={() => {
              setnextModal(false);
              setView1(false);
              setView2(true);
              setnext2(true);
              setreturnBtnDisable(false);
              setextra(nextModalres?.missing_charge);
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
      </Model>
    </>
  );
};

export default BookingDetails;

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
