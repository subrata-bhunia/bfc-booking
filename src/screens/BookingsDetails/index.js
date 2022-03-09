import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts} from '../../constants';
import {CheckBox, Icon, Input} from 'react-native-elements';
import {TouchableOpacity, Image, ActivityIndicator} from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';
import {getReturnBookingById} from '../../api/Bookings';

const BookingDetails = ({navigation}) => {
  const [view0, setView0] = useState(true);
  const [view1, setView1] = useState(false);
  const [view2, setView2] = useState(false);
  const [next1, setnext1] = useState(true);
  const [next2, setnext2] = useState(true);
  const [modal, setmodal] = useState(false);
  const [modifyView, setModifyView] = useState(false);
  const [clickModifyBtn, setClickModifyBtn] = useState(false);
  const [clickReturnBtn, setClickReturnBtn] = useState(false);
  const [modifyHandle, setModifyHandle] = useState(true);

  //Activity Indicator
  const [show, setShow] = useState(false);

  // setDate from backend
  const [resReturnData, setResReturnData] = useState({
    pickupDate: '00/00/00',
    returnData: '',
    customerName: '',
    customerAddress: '',
    gathering: '',
    caterers: '',
    pickupTime: '',
    returnTime: '',
    rent: 0,
    advanced: 0,
    caterer_charge: 0,
    extra_charges: 0,
    total_amount: 0,
    payment: 0,
    pending_payment: 0,
  });
  const [returndate, setreturndate] = useState(null);
  const TableHead2 = ['Item Name', 'Stock', 'Need'];
  const TableHead = ['Item Name', 'Taken', 'Return'];
  const [tableData, setTableData] = useState([
    // ['কড়া', '200', {key: '1', value: '34'}],
    // ['বালতি', '100', {key: '2', value: '70'}],
    // ['ডেক', '2000', {key: '3', value: '100'}],
  ]);
  // ---------- Drop Down ---------- //
  const [_return, setreturn] = useState(false);
  const [_cateres, setcateres] = useState(false);
  useEffect(() => {
    handleGetBookingDetails();
  }, []);
  const handleGetBookingDetails = async () => {
    setShow(true);
    getReturnBookingById({booking_id: 'ORD1646572638'}).then(res => {
      const {data} = res.data;
      setShow(false),
        setResReturnData({
          ...resReturnData,
          pickupDate: data.pickup_date,
          returnData: data.return_date,
          customerName: data.customer_name,
          customerAddress: data.customer_address,
          gathering: data.gathering,
          caterers: data.caterers,
          pickupTime: data.pickup_time,
          returnTime: data.return_time,
          rent: data.rent,
          advanced: data.advanced,
          caterer_charge: data.caterer_charge,
          extra_charges: data.extra_charges,
          total_amount: data.total_amount,
          payment: data.payment,
          pending_payment: data.pending_payment,
        });
      setTableData(res.data.data.items);
      console.log('getData', data);
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingTop: StatusBar.currentHeight,
        padding: 10,
      }}>
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
          {/* <KeyboardAvoidingView
        enabled={true}
        behavior="position"
        style={{flex: 1}}> */}
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
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.date}>
                          {resReturnData.pickupDate}
                        </Text>
                      </View>
                    </View>
                    {resReturnData.pickupTime === 'Morning' ? (
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                      <Text style={styles.textH1}>Return</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.date}>
                          {resReturnData.returnData}
                        </Text>
                      </View>
                    </View>
                    {resReturnData.returnTime === 'Morning' ? (
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
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon name="person" />
                    <Text style={styles.textH2}>
                      {resReturnData.customerName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon name="home" />
                    <Text style={styles.textH2}>
                      {resReturnData.customerAddress}
                    </Text>
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
                        {resReturnData.gathering}
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
                        source={require('../../../assets/images/icons/catering.png')}
                        style={{
                          height: 25,
                          width: 25,
                        }}
                      />
                      <Text style={styles.textH2}>
                        {resReturnData.caterers}
                      </Text>
                    </View>
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
                    <Table
                      borderStyle={{
                        borderColor: Colors.secondary,
                        borderWidth: 2,
                      }}
                      style={{}}>
                      <Row
                        data={TableHead2}
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
                                cellIndex === 2 ? (
                                  <Input
                                    placeholder="0"
                                    // value={}
                                    value={`${cellData.taken}`}
                                    textAlign="center"
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
                        fontSize: wp(4),
                        width: wp(40),
                        textAlign: 'right',
                      }}>
                      Rent :
                    </Text>
                    <Input
                      defaultValue={'0'}
                      containerStyle={{width: wp(40), height: hp(10)}}
                      leftIcon={<Icon name="inr" type="fontisto" size={15} />}
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
                      containerStyle={{width: wp(40), height: hp(10)}}
                      leftIcon={<Icon name="inr" type="fontisto" size={15} />}
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
                      Extra Charges :
                    </Text>
                    <Input
                      defaultValue={'0'}
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
                      defaultValue={'0'}
                      containerStyle={{width: wp(40), height: hp(10)}}
                      leftIcon={<Icon name="inr" type="fontisto" size={15} />}
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
                      containerStyle={{width: wp(40), height: hp(10)}}
                      leftIcon={<Icon name="inr" type="fontisto" size={15} />}
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
                      leftIcon={<Icon name="inr" type="fontisto" size={15} />}
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
                        fontSize: wp(4),
                        width: wp(40),
                        textAlign: 'right',
                      }}>
                      Rent :
                    </Text>
                    <Input
                      defaultValue={`${resReturnData.rent}`}
                      containerStyle={{width: wp(40), height: hp(10)}}
                      leftIcon={<Icon name="inr" type="fontisto" size={15} />}
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
                      defaultValue={`${resReturnData.extra_charges}`}
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
                      defaultValue={`${resReturnData.total_amount}`}
                      containerStyle={{width: wp(40), height: hp(10)}}
                      leftIcon={<Icon name="inr" type="fontisto" size={15} />}
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
                      defaultValue={`${resReturnData.pending_payment}`}
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
                      containerStyle={{width: wp(40), height: hp(10)}}
                      leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                      inputStyle={{
                        fontSize: wp(4),
                      }}
                    />
                  </View>
                  {/* Payment Accepted By
                <View
                  style={
                    {
                      // flexDirection: 'row',
                      // alignItems: 'center',
                      // justifyContent: 'space-between',
                    }
                  }>
                  <Text
                    style={{
                      fontFamily: Fonts.semibold,
                      fontSize: wp(4),
                      textAlign: 'left',
                      marginBottom: hp(2),
                    }}>
                    Payment Accepted By :
                  </Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    // zIndex={5000}
                    // zIndexInverse={6000}
                    style={{
                      width: wp(80),
                      borderColor: '#999',
                      height: hp(6),
                    }}
                    // flatListProps={{
                    //   style: {

                    //     // height: hp(10),
                    //   },
                    // }}
                    listMode="SCROLLVIEW"
                    containerStyle={{
                      width: wp(80),
                      height: hp(6),
                      marginLeft: wp(3),
                      borderColor: 'red',
                    }}
                    labelStyle={{
                      fontFamily: Fonts.regular,
                      fontSize: 15,
                    }}
                    placeholder={'SELECTE NAME'}
                    placeholderStyle={{
                      fontFamily: Fonts.regular,
                      fontSize: 15,
                    }}
                    listItemLabelStyle={{
                      fontFamily: Fonts.regular,
                      fontSize: 15,
                    }}
                    dropDownDirection="TOP"
                    // dropDownContainerStyle={{
                    //   backgroundColor: '#eee',
                    //   position: 'absolute',
                    //   // elevation: 10,
                    //   borderColor: '#999',
                    // }}
                  />
                </View> */}
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
          )}

          <View style={{height: StatusBar.currentHeight + hp(9) + hp(4)}} />
          <Model
            isVisible={modal}
            statusBarTranslucent
            // onBackdropPress={() => setmodal(!modal)}
            backdropOpacity={0.6}
            focusable
            onBackButtonPress={() => {
              setmodal(false);
              navigation.navigate('Home');
            }}
            avoidKeyboard>
            <View
              style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 25,
                  textAlign: 'center',
                  letterSpacing: 2,
                }}>
                Thank You
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
              <View style={{paddingHorizontal: wp(10)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: hp(2),
                  }}>
                  <Text style={styles.h2}>Date</Text>
                  <Text style={styles.h3}>2022-03-04</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: hp(2),
                  }}>
                  <Text style={styles.h2}>Booking Id</Text>
                  <Text style={styles.h3}>123456789</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: hp(2),
                  }}>
                  <Text style={styles.h2}>Advanced</Text>
                  <Text style={styles.h3}>{500} /-</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: hp(2),
                  }}>
                  <Text style={styles.h2}>Total Amount</Text>
                  <Text style={styles.h3}>1200 /-</Text>
                </View>
              </View>
              {/*  */}
              <View>
                <Text
                  style={[
                    styles.h1,
                    {textAlign: 'center', marginVertical: hp(7), fontSize: 30},
                  ]}>
                  700 /-
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setmodal(false);
                    navigation.navigate('Home');
                  }}>
                  <View
                    style={{
                      height: wp(15),
                      width: wp(15),
                      borderRadius: wp(7.5),
                      backgroundColor: Colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      margin: 20,
                    }}>
                    <Icon
                      name="cross"
                      type="entypo"
                      color={Colors.white}
                      size={wp(10)}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Model>
          {/* </KeyboardAvoidingView> */}
        </ScrollView>
      )}
      {modifyHandle ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            margin: wp(4),
          }}>
          <Button
            onPress={() => {
              clickModifyBtn
                ? setClickModifyBtn(false)
                : (setModifyView(true),
                  setView1(true),
                  setClickModifyBtn(true));
            }}
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
            textStyle={{
              fontFamily: Fonts.semibold,
              color: '#000',
              fontSize: 16,
            }}
            btnName={clickModifyBtn ? 'CANCLE' : 'MODIFY'}
          />
          <Button
            onPress={() => {
              clickModifyBtn
                ? null
                : (setModifyView(false),
                  setView1(true),
                  setModifyHandle(false));
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
            btnName={clickModifyBtn ? 'UPDATE' : 'RETURN'}
          />
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
          }}>
          <Button
            // onPress={() => {
            //   clickReturnBtn
            //     ? setClickReturnBtn(false)
            //     : (setModifyView(true),
            //       setView1(true),
            //       setClickReturnBtn(true));
            // }}
            btnStyle={{
              height: hp(7),
              width: wp(50),
              backgroundColor: Colors.botton,
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
              fontSize: 16,
            }}
            btnName={clickReturnBtn ? null : 'PAY LATER'}
          />
          <Button
            // onPress={() => {
            //   clickReturnBtn
            //     ? null
            //     : (setModifyView(false),
            //       setView1(true),
            //       setModifyHandle(false));
            // }}
            btnStyle={{
              height: hp(7),
              width: wp(50),
              backgroundColor: '#fca903',
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
              fontSize: 16,
            }}
            btnName={clickReturnBtn ? null : 'PAY NOW'}
          />
        </View>
      )}
    </View>
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