import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts, Icons, statusIcon} from '../../constants';
import {CheckBox, Icon, Input} from 'react-native-elements';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Button from '../../components/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getDate} from 'bangla-calendar';
import DropDownPicker from 'react-native-dropdown-picker';
import Model from 'react-native-modal';
import AnimatedLottieView from 'lottie-react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {AvailableItems} from '../../api/Inventory';
import Vaildation from '../../components/Vaildation';
import {
  UpdateBooking,
  getReturnBookingById,
  getModifyBookingInfo,
} from '../../api/Bookings';
import {UIStore} from '../../UIStore';
import {PacmanIndicator, SkypeIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';

const Modify = () => {
  const navigation = useNavigation();
  const [view0, setView0] = useState(true);
  const [view1, setView1] = useState(true);
  const [view2, setView2] = useState(true);
  const [next1, setnext1] = useState(true);
  const [next2, setnext2] = useState(false);
  const [modal, setmodal] = useState(false);
  const [pickupdate, setpickupdate] = useState(null);
  const [returndate, setreturndate] = useState(null);
  const [resReturnData, setResReturnData] = useState(null);
  const [pickupdateV, setpickupdateV] = useState(true);
  const [returndateV, setreturndateV] = useState(true);
  const TableHead = ['Item Name', 'Stock', 'Taken', 'Need'];
  const [tableData, setTableDate] = useState([]);
  const [addBiookingStatus, setaddBiookingStatus] = useState(null);
  const [modalData, setmodalData] = useState(null);
  const userId = UIStore.useState(s => s.userId);
  const [btnLoader, setBtnLoader] = useState(false);
  const route = useRoute();
  const booking_id = route?.params?.booking_id;

  console.log('tableData', tableData);

  //------- API ----------- //
  const handleGetBookingDetails = async () => {
    // setShow(true);
    getModifyBookingInfo({booking_id: booking_id})
      .then(res => {
        const {data, status} = res.data;
        if (status === 'Success') {
          // setShow(false);
          setResReturnData(data);
          setTableDate(res.data.data.items);
        }
        console.log('getData', data);
      })
      .catch(err => console.log('-----', JSON.stringify(err)));
  };
  useEffect(() => {
    handleGetBookingDetails();
  }, [isFocused]);
  // ------------------ //
  const isFocused = useIsFocused();
  // -------- Date Picker --------------- //
  const [isDatePickerVisibleP, setDatePickerVisibilityP] = useState(false);
  const [isDatePickerVisibleR, setDatePickerVisibilityR] = useState(false);
  // ---------- Drop Down ---------- //
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [valueV, setValueV] = useState(true);
  const [_return, setreturn] = useState(false);
  const [rvalue, setrvalue] = useState(null);
  const [rvalueV, setrvalueV] = useState(true);
  const [items, setItems] = useState([
    {label: 'Morning', value: 'Morning'},
    {label: 'Evening', value: 'Evening'},
  ]);
  const [_cateres, setcateres] = useState(false);
  const [caterersvalue, setcaterersvalue] = useState('');
  const [Catitems, setCatitems] = useState([
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'},
  ]);
  const [gathering, setgathering] = useState('');
  const [gatheringV, setgatheringV] = useState(true);
  const [cname, setcname] = useState('');
  const [cnameV, setcnameV] = useState(true);
  const [cphone, setcphone] = useState('');
  const [cphoneV, setcphoneV] = useState(true);
  const [cadd, setcadd] = useState('');
  const [caddV, setcaddV] = useState(true);
  const [whp, setwhp] = useState(true);
  // ---------- //
  const [rent, setrent] = useState(0);
  const [cat_rate, setcat_rate] = useState(0);
  const [extra, setextra] = useState(0);
  const [Advanced, setAdvanced] = useState(0);
  const [total, settotal] = useState(0);
  const [Pending, setPending] = useState(0);
  const [rentV, setrentV] = useState(true);
  const [book_items, setbook_items] = useState([]);

  const [returnItems, setreturnItems] = useState([]);

  console.log('returnItems', returnItems);

  // ------------- //
  useEffect(() => {
    // ------ Style ---------- //
    setView0(true);
    setView1(true);
    setView2(true);
    setnext2(false);
    setnext1(true);
    // ------ Personal ------- //
    setpickupdate(null);
    setValue(null);
    setrvalue(null);
    setreturndate(null);
    setcadd('');
    setcname('');
    setcphone('');
    setgathering('');
    // ------- Booking Items ------ //
    setbook_items([]);
    // -------- Payments ----------- //
    setPending(0);
    settotal(0);
    setAdvanced(0);
    setPending(0);
    setcat_rate(0);
    setextra(0);
  }, [isFocused]);
  useEffect(() => {
    settotal(rent === 0 ? 0 : rent + extra + cat_rate);
    setPending(Advanced && rent === 0 ? 0 : total - Advanced);
  }, [rent, extra, cat_rate, Advanced, total, Pending]);

  const AddItems = (key, value) => {
    var oldReturnItems = returnItems;
    for (var i = 0; i < tableData.length; i++) {
      if (tableData[i][3] == key) {
        oldReturnItems[key] = value;
      }
    }
    setreturnItems(oldReturnItems);
  };

  const setValueOnReturnItems = () => {
    var newObj = new Object();
    for (var i = 0; i < tableData.length; i++) {
      var key = tableData[i][3];
      var value = 0;

      newObj[key] = value;
    }
    setreturnItems(newObj);
    console.log('newObj', newObj);
  };

  useEffect(() => {
    setValueOnReturnItems();
  }, [tableData]);

  const obj1 = new Object();
  const arr = new Array();

  const _UpdateBooking = () => {
    console.log(book_items);
    setBtnLoader(true);
    console.log('userId', userId);
    UpdateBooking({
      items: returnItems,
      booking_id: booking_id,
      user_id: userId,
    })
      .then(res => {
        // console.log('res', res);
        if (res?.data?.status === 'Success') {
          setmodal(true);
          setmodalData(res?.data?.data);
          setBtnLoader(false);
        } else {
          setaddBiookingStatus(res?.data?.message);
          console.log(res?.data?.message);
          setBtnLoader(false);
          setTimeout(() => {
            setaddBiookingStatus(null);
          }, 5000);
        }
      })
      .catch(err => {
        console.log(err, 'TTTT');
        setBtnLoader(false);
        setTimeout(() => {
          setaddBiookingStatus(null);
        }, 5000);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.secondary,
        // paddingTop: StatusBar.currentHeight,
        padding: 10,
      }}>
      <Header name="Modify Booking" backBtn={true} />
      <ScrollView keyboardDismissMode="interactive">
        {/* Personal */}

        <View>
          <TouchableOpacity style={{alignSelf: 'center'}} activeOpacity={10}>
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    <Icon name="sunny-sharp" type="ionicon" raised size={20} />
                  ) : (
                    <Icon name="moon" type="ionicon" reverse size={20} />
                  )}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    <Icon name="sunny-sharp" type="ionicon" raised size={20} />
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
                      <Icon name="users" type="font-awesome-5" size={20} />
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

        {/* items */}
        {/* 2nd  Items*/}

        {/* Items */}
        {next1 === true ? (
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
              <Icon name="arrow-drop-down-circle" type="material" size={30} />
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
                  {tableData.length == 0 ? (
                    <SkypeIndicator
                      color={Colors.botton}
                      count={5}
                      size={wp(12)}
                    />
                  ) : (
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
                                    defaultValue={returnItems[cellData]}
                                    textAlign="center"
                                    onChangeText={txt =>
                                      AddItems(cellData, txt)
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
                  )}
                </View>
                <Button
                  onPress={() => {
                    setView1(!view1);
                    setnext2(true);
                    setView2(true);
                    setbook_items(obj1);
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
                    fontSize: 20,
                  }}
                  btnName="Next"
                />
              </View>
            ) : null}
          </View>
        ) : null}

        {/* 3rd */}
        {next2 === true ? (
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
              <Icon name="arrow-drop-down-circle" type="material" size={30} />
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
                      fontSize: 20,
                      width: wp(40),
                      textAlign: 'right',
                    }}>
                    Rent :
                  </Text>
                  <Input
                    placeholder={'0'}
                    keyboardType="number-pad"
                    containerStyle={{width: wp(40)}}
                    leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                    value={rent}
                    onChangeText={txt => {
                      setrent(parseInt(txt));
                      setrentV(true);
                    }}
                    inputStyle={{
                      fontSize: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    // marginTop: -hp(2),
                    marginHorizontal: -wp(8),
                    alignSelf: 'center',
                  }}>
                  {rentV ? null : <Vaildation errormsg="Enter Rent " />}
                </View>
                {/* Caterer Charge */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: -wp(4),
                    display: caterersvalue === 'Yes' ? 'flex' : 'none',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.semibold,
                      fontSize: 20,
                      width: wp(40),
                      textAlign: 'right',
                    }}>
                    Caterer Charge :
                  </Text>
                  <Input
                    placeholder={'0'}
                    keyboardType="number-pad"
                    value={cat_rate}
                    onChangeText={txt => {
                      setcat_rate(parseInt(txt));
                    }}
                    containerStyle={{width: wp(40)}}
                    leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                    inputStyle={{
                      fontSize: 20,
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
                      fontSize: 20,
                      width: wp(40),
                      textAlign: 'right',
                    }}>
                    Extra Charges :
                  </Text>
                  <Input
                    placeholder={'0'}
                    keyboardType="number-pad"
                    value={extra}
                    onChangeText={txt => {
                      setextra(parseInt(txt));
                    }}
                    containerStyle={{width: wp(40)}}
                    leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                    inputStyle={{
                      fontSize: 20,
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
                      fontSize: 20,
                      width: wp(40),
                      textAlign: 'right',
                    }}>
                    Total Amount :
                  </Text>
                  <Input
                    disabled
                    defaultValue={total.toString()}
                    // value={total}
                    containerStyle={{width: wp(40)}}
                    leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                    inputStyle={{
                      fontSize: 20,
                    }}
                  />
                </View>
                {/* Advanced */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.semibold,
                      fontSize: 20,
                      width: wp(40),
                      textAlign: 'right',
                    }}>
                    Advanced :
                  </Text>
                  <Input
                    placeholder={'0'}
                    value={Advanced}
                    keyboardType="number-pad"
                    onChangeText={txt => {
                      setAdvanced(parseInt(txt));
                    }}
                    containerStyle={{width: wp(40)}}
                    leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                    inputStyle={{
                      fontSize: 20,
                    }}
                  />
                </View>
                {/* Pending Amount */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.semibold,
                      fontSize: 20,
                      width: wp(40),
                      textAlign: 'right',
                    }}>
                    Pending Amount :
                  </Text>
                  <Input
                    disabled
                    defaultValue={Pending.toString()}
                    containerStyle={{width: wp(40)}}
                    leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                    inputStyle={{
                      fontSize: 20,
                    }}
                  />
                </View>
                {/* Add Booking Button */}
                {next1 && next2 ? (
                  <>
                    <View
                      style={{
                        // marginBottom: addBiookingStatus === null ? 0 : -hp(2),
                        alignItems: 'center',
                      }}>
                      {addBiookingStatus === null ? null : (
                        <Vaildation errormsg={addBiookingStatus} />
                      )}
                    </View>
                    <Button
                      onPress={() => {
                        _UpdateBooking();
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
                        elevation: btnLoader ? 0 : 10,
                      }}
                      textStyle={{
                        fontFamily: Fonts.semibold,
                        color: '#fff',
                        fontSize: 20,
                      }}
                      btnName="Add Book"
                      isLoader={btnLoader}
                    />
                  </>
                ) : null}
              </View>
            ) : null}
          </View>
        ) : null}

        <View style={{height: StatusBar.currentHeight + hp(9) + hp(4)}} />
        <Model
          isVisible={modal}
          statusBarTranslucent
          onBackdropPress={() => {
            setmodal(false);
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          }}
          backdropOpacity={0.6}
          focusable
          onBackButtonPress={() => {
            setmodal(false);
            navigation.navigate('Home');
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
              Booking Successful
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
                <Text style={styles.h3}>{modalData?.total_amount} /-</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: hp(2),
                  alignItems: 'center',
                }}>
                <Text style={styles.h2}>Advanced</Text>
                <Text style={styles.h3}>{modalData?.advanced} /-</Text>
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
              {whp ? (
                <Button
                  // onPress={() => navigation.navigate('Booking')}
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
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </View>
  );
};

export default Modify;

const styles = StyleSheet.create({
  h1: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  sub: {
    fontFamily: Fonts.regular,
    color: Colors.disable,
    letterSpacing: 2,
  },
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {backgroundColor: '#808B97', textAlign: 'center'},
  text: {margin: 6, textAlign: 'center', fontFamily: Fonts.bold},
  row: {flexDirection: 'row', backgroundColor: '#fff'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
  h2: {
    fontFamily: Fonts.semibold,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 20,
  },
  h3: {
    fontFamily: Fonts.semibold,
    color: 'rgba(0,0,0,1)',
    fontSize: 15,
    // fontFamily: Fonts.medium,
    // fontSize: 15,
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
