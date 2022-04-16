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
import LinearGradient from 'react-native-linear-gradient';
import {
  getBookingInfoById,
  checkReturnItems,
  MissingUpdate,
} from '../../api/Bookings';
import {useRoute} from '@react-navigation/native';
import Header from '../../components/Header';
import {UIStore} from '../../UIStore';
import {SkypeIndicator} from 'react-native-indicators';
import {useDispatch, useSelector} from 'react-redux';
import {calculateAction} from '../../redux/action';
import {CheckBox} from 'react-native-elements';
import WarningModal from '../../components/WarningModal';
import AnimatedLottieView from 'lottie-react-native';

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
  const [view1, setView1] = useState(true);
  const [view2, setView2] = useState(false);
  const route = useRoute();
  const booking_id = route?.params?.booking_id;
  const user_id = UIStore.useState(s => s.userId);
  //Activity Indicator
  const [show, setShow] = useState(true);
  const [check, setCheck] = useState(false);

  // setDate from backend
  const [resMissingBookingData, setResMissingBookingData] = useState(null);
  const TableHead = ['Item Name', 'Taken', 'Given', 'Return'];
  const [tableData, setTableData] = useState([]);

  //Rent Variable
  const [Discount, setDiscount] = useState(0);
  const [rent, setRent] = useState(0);
  const [payment, setPayment] = useState(0);
  const [returnItems, setreturnItems] = useState([]);
  const [paymentMode, setpaymentMode] = useState(false);
  const [nextModal, setnextModal] = useState(false);
  const [nextModalres, setnextModalres] = useState([]);
  const missingModalTableHead = ['Item Name', 'Qty', 'Price'];
  const [extra, setextra] = useState(0);
  const [totalAmount, settotalAmount] = useState(0);
  const [pendingAmount, setpendingAmount] = useState(0);
  const [openMissingWarnModal, setopenMissingWarnModal] = useState(false);
  const [modal, setmodal] = useState(false);
  const [modalData, setmodalData] = useState([]);

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
        setResMissingBookingData(data);
        setRent(data.rent);
        setDiscount(parseInt(data.discount));
        setTableData(items);
        settotalAmount(
          parseInt(data.rent) +
            parseInt(data?.caterer_charge) +
            parseInt(data.extra_charges),
        );
        setpendingAmount(
          parseInt(data.rent) +
            parseInt(data?.caterer_charge) -
            parseInt(data.advanced) -
            (parseInt(data.discount) ? parseInt(data.discount) : 0) -
            parseInt(data.payment) +
            parseInt(data.extra_charges),
        );
        const rtnItems = new Object();
        data?.items?.map((item, index) => {
          if (item[1] != item[2]) {
            rtnItems[item[3].item_id] = item[3].missing;
          }
        });
        setreturnItems(rtnItems);
      }
    });
  };
  console.log('booking_id', booking_id);
  const resetInput = index => {
    var newArr = [];
    for (var i = 0; i < tableData.length; i++) {
      if (index == i) {
        var tmpData = [
          tableData[i][0],
          tableData[i][1],
          tableData[i][2],
          {item_id: tableData[i][3].item_id, missing: ''},
        ];
        newArr.push(tmpData);
      } else {
        newArr.push(tableData[i]);
      }
    }
    setTableData(newArr);
  };
  const AddItems = (key, value) => {
    var oldReturnItems = returnItems;
    for (var i = 0; i < tableData.length; i++) {
      if (tableData[i][3].item_id == key && value != '') {
        oldReturnItems[key] = parseInt(value);
      } else if (tableData[i][3].item_id == key && value == '') {
        oldReturnItems[key] = 0;
      } else {
      }
    }
    setreturnItems(oldReturnItems);
  };
  const checkMissingItems = () => {
    console.log('returnItems', returnItems);
    setShow(true);
    checkReturnItems({
      booking_id: booking_id,
      items: returnItems,
    })
      .then(res => {
        if (res?.data?.status == 'Missing') {
          setnextModalres(res?.data?.data);
          setShow(false);
          setnextModal(true);
          setpaymentMode(true);
        } else {
          setView1(!view1);
          setView2(true);
          setShow(false);
          setpaymentMode(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // missing-update API Call
  const handleMissingUpdate = async () => {
    MissingUpdate({
      user_id,
      booking_id,
      payment,
      items: returnItems,
      is_full_payment: check,
    })
      .then(res => {
        const {data, status} = res.data;
        if (status === 'Success') {
          setmodalData(data);
          setmodal(true);
        }
        console.log('MissingUpdate :', res?.data);
      })
      .catch(err => console.log('err of MissingUpdate :', err));
  };
  console.log('returnItems :', returnItems);

  const calculateBill = extraCharge => {
    setextra(extraCharge);
    let ttlAmt = parseInt(totalAmount) + parseInt(extraCharge);
    settotalAmount(ttlAmt);
    setpendingAmount(
      ttlAmt +
        parseInt(resMissingBookingData?.caterer_charge) -
        parseInt(resMissingBookingData.advanced) -
        (parseInt(resMissingBookingData.discount)
          ? parseInt(resMissingBookingData.discount)
          : 0),
    );
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
                          flexArr={[1.5, 1, 1, 1]}
                        />
                        {tableData.map((rowData, index) => (
                          <TableWrapper key={index} style={styles.row}>
                            {rowData.map((cellData, cellIndex) => (
                              <Cell
                                style={
                                  cellIndex == 0
                                    ? {width: '33.5%'}
                                    : {width: '22%'}
                                }
                                key={cellIndex}
                                data={
                                  cellIndex == 3 ? (
                                    rowData[1] != rowData[2] ? (
                                      <Input
                                        placeholder={`${cellData.missing}`}
                                        placeholderTextColor={Colors.text}
                                        textAlign="center"
                                        onPressIn={() => resetInput(index)}
                                        defaultValue={`${
                                          returnItems[cellData?.item_id]
                                        }`}
                                        onChangeText={txt =>
                                          AddItems(cellData?.item_id, txt)
                                        }
                                        keyboardType="numeric"
                                      />
                                    ) : (
                                      rowData[1] - rowData[2]
                                    )
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
                        setView2(true);
                        checkMissingItems();
                        calculateBill(resMissingBookingData?.extra_charges);
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
                        defaultValue={`${resMissingBookingData.caterer_charge}`}
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
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
                        disabled
                        value={`${extra}`}
                        keyboardType="number-pad"
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
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
                        defaultValue={`${totalAmount}`}
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

                    {/* Pre Payment */}
                    {resMissingBookingData.payment != 0 ? (
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
                          defaultValue={`${resMissingBookingData.payment}`}
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
                        defaultValue={`${pendingAmount}`}
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
              {paymentMode ? (
                <Button
                  onPress={() => setopenMissingWarnModal()}
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
                  textStyle={{
                    fontFamily: Fonts.semibold,
                    color: '#000',
                    fontSize: 16,
                  }}
                  btnName="PAYMENT RECIVED"
                />
              ) : (
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
                    setopenMissingWarnModal(true);
                  }}
                  textStyle={{
                    fontFamily: Fonts.semibold,
                    color: '#fff',
                    fontSize: 16,
                  }}
                  disabled={view1 ? true : false}
                  btnName="ITEM RECIVED"
                />
              )}
            </View>
          </>
        )}
      </View>

      <WarningModal
        h1="Are you want to Due this booking?"
        open={openMissingWarnModal}
        setopen={setopenMissingWarnModal}
        yes={{
          name: 'Yes',
          onPress: () => {
            handleMissingUpdate();
          },
        }}
        no={{
          name: 'No',
        }}
      />

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
              paddingLeft: 15,
              paddingRight: 15,
            }}>
            <Table
              borderStyle={{
                borderColor: Colors.secondary,
                borderWidth: 2,
              }}
              style={{}}>
              <Row
                data={missingModalTableHead}
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
            <Text
              style={[styles.p, {marginBottom: 15, color: 'red', padding: 15}]}>
              Note: Missing product cost added to your bill as an extra charge.
            </Text>
          </View>
          {/* Button */}
          <Button
            btnName="Continue to Payment"
            onPress={() => {
              setnextModal(false);
              setView1(false);
              setView2(true);
              setpaymentMode(true);
              calculateBill(
                resMissingBookingData?.extra_charges +
                  nextModalres?.missing_charge,
              );
            }}
            textStyle={{
              fontFamily: Fonts.semibold,
              color: '#fff',
              fontSize: 16,
            }}
            btnStyle={{
              height: hp(6),
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
              marginTop: 10,
              marginBottom: 15,
            }}
          />
        </View>
      </Model>

      {/* Missing Modal */}
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
