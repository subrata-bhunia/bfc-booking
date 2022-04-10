import {
  Linking,
  Pressable,
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
  getBookingInfoById,
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

const ReturnBookingPage = ({navigation}) => {
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
  };
  //--------------------- //

  const [view1, setView1] = useState(true);
  const [view2, setView2] = useState(false);
  const [next2, setnext2] = useState(true);
  const [modalRes, setmodalRes] = useState([]);
  const route = useRoute();
  const booking_id = route?.params?.booking_id;
  const user_id = UIStore.useState(s => s.userId);
  //Activity Indicator
  const [show, setShow] = useState(false);
  // setDate from backend
  const [resReturnData, setResReturnData] = useState(null);
  const TableHead = ['Item Name', 'Taken', 'Return'];
  const TableHead3 = ['Item Name', 'Qty', 'Price'];
  const [tableData, setTableData] = useState([]);
  // ---------- Drop Down ---------- //
  const [_return, setreturn] = useState(false);
  const [_cateres, setcateres] = useState(false);
  const [nextLoader, setnextLoader] = useState(false);

  // ---------- Confirm -------------- //
  const [returnpayment, setreturnpayment] = useState('');
  const [returnItems, setreturnItems] = useState([]);

  //--------------- Return ----------- //
  const [returnbtn, setreturnbtn] = useState(false);
  const [returnBtnDisable, setreturnBtnDisable] = useState(true);

  useEffect(() => {
    handleGetBookingDetails();
  }, []);

  const handleGetBookingDetails = async () => {
    setShow(true);
    getBookingInfoById({booking_id: booking_id})
      .then(res => {
        const {data, status} = res.data;
        if (status === 'Success') {
          setShow(false);
          setResReturnData(data);
          setTableData(res.data.data.items);
          const takenItems = new Object();
          data?.items?.map((item, index) => {
            takenItems[item[2].item_id] = item[2].taken;
          });
          setreturnItems(takenItems);
        }
      })
      .catch(err => console.log('Err of getBooking :', err));
  };

  const resetInput = index => {
    var newArr = [];
    for (var i = 0; i < tableData.length; i++) {
      if (index == i) {
        var tmpData = [
          tableData[i][0],
          tableData[i][1],
          {item_id: tableData[i][2].item_id, taken: ''},
        ];
        newArr.push(tmpData);
      } else if (tableData[i][2].taken == '') {
        var tmpData = [
          tableData[i][0],
          tableData[i][1],
          {
            item_id: tableData[i][2].item_id,
            taken: returnItems[tableData[i][2].item_id],
          },
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
      if (tableData[i][2].item_id == key) {
        oldReturnItems[key] = value;
      }
    }
    setreturnItems(oldReturnItems);
  };

  const [nextModal, setnextModal] = useState(false);
  const [nextModalres, setnextModalres] = useState([]);
  const NextButtonClick = () => {
    setnextLoader(true);
    checkReturnItems({
      booking_id: booking_id,
      items: returnItems,
    })
      .then(res => {
        if (res?.data?.status == 'Missing') {
          // console.log(res?.data);
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
  };
  console.log(nextModalres);
  var radio_props = [
    {label: 'Product Price', value: 0},
    {label: 'Products', value: 1},
  ];
  const [ProductPrice, setProductPrice] = useState(true);
  const [Product, setProduct] = useState(false);

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
      settled_by: Product ? 'Products' : 'Product Price',
      payment: returnpayment,
      discount: Discount,
      extra_charges: extra,
    })
      .then(res => {
        setShow(false);
        setReturnModal(true);
        setmodalRes(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const TodayDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1 < 10
      ? '0' + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1
  }-${
    new Date().getDate() < 10
      ? '0' + new Date().getDate()
      : new Date().getDate()
  }`;
  // console.log('TodayDate',TodayDate);
  return (
    <>
      {resReturnData === null ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SkypeIndicator color={Colors.botton} count={5} size={wp(14)} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.secondary,
            // paddingTop: StatusBar.currentHeight,
            padding: 10,
          }}>
          <Header name="Return Booking Details" backBtn={true} />
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
                                data={
                                  cellIndex == 2 ? (
                                    <Input
                                      placeholder={`${cellData.taken}`}
                                      placeholderTextColor={Colors.text}
                                      onPressIn={() => resetInput(index)}
                                      defaultValue={
                                        returnItems[cellData?.item_id]
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
                      btnName="NEXT"
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
                        defaultValue={`${
                          parseInt(resReturnData.total_amount) + parseInt(extra)
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
                        defaultValue={`${parseInt(resReturnData?.discount)}`}
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
                        keyboardType="number-pad"
                        containerStyle={{width: wp(40), height: hp(10)}}
                        leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                        inputStyle={{
                          fontSize: wp(4),
                        }}
                        placeholder={'0'}
                        value={returnpayment}
                        onChangeText={txt => {
                          setreturnpayment(txt);
                        }}
                      />
                    </View>
                  </View>
                ) : null}
              </View>

              <View style={{height: StatusBar.currentHeight + hp(9) + hp(4)}} />

              {/* </KeyboardAvoidingView> */}
            </ScrollView>
          )}
          {/* Bottons */}
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
              // disabled={true}
              textStyle={{
                fontFamily: Fonts.semibold,
                color: '#000',
                fontSize: 16,
              }}
              onPress={() => {
                navigation.navigate('modifyBooking', {booking_id});
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
              disabled={returnBtnDisable || view1 ? true : false}
              btnName="RETURN"
            />
          </View>
        </View>
      )}

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
      <Model isVisible={nextModal} backdropOpacity={0.4} statusBarTranslucent>
        <View
          style={{
            // height: hp(80),
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: 10,
            paddingTop: hp(2),
            width: '110%',
            alignSelf: 'center',
            position: 'absolute',
            bottom: -hp(3),
            marginTop: 100,
          }}>
          {/* msg */}
          <Text
            style={{
              fontFamily: Fonts.semibold,
              fontSize: 18,
            }}>
            What customer choose
          </Text>
          {/* Price */}
          <Pressable
            onPress={() => {
              setProductPrice(true);
              setProduct(false);
            }}
            style={{
              // height: hp(20),
              borderWidth: 3,
              borderColor: ProductPrice ? Colors.primary : Colors.secondary,
              padding: 10,
              borderRadius: 10,
              paddingVertical: 20,
              marginVertical: 10,
            }}>
            <Text style={styles.H1}>Product Price</Text>
            {/* Price */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Icon name="inr" type="fontisto" />
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 5,
                  fontFamily: Fonts.bold,
                }}>
                {nextModalres?.missing_charge} /-
              </Text>
            </View>
            <View
              style={{
                padding: 7,
                backgroundColor: '#eefbf5',
                marginTop: 10,
                width: wp(60),
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  marginHorizontal: 5,
                  fontFamily: Fonts.bold,
                  color: '#01a955',
                }}>
                Payment within 10 days.
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.medium,
                }}>
                {nextModalres?.fine_description}
              </Text>
            </View>
            {/* Dot */}
            <View
              style={{
                height: 35,
                width: 35,
                borderRadius: 25,
                borderWidth: 10,
                position: 'absolute',
                right: 20,
                top: 20,
                borderColor: ProductPrice ? Colors.primary : Colors.secondary,
              }}
            />
          </Pressable>
          {/* Product */}
          <Pressable
            onPress={() => {
              setProductPrice(false);
              setProduct(true);
            }}
            style={{
              // height: hp(20),
              borderWidth: 3,
              borderColor: Product ? Colors.primary : Colors.secondary,
              padding: 10,
              borderRadius: 10,
              paddingVertical: 20,
              marginVertical: 10,
            }}>
            <Text style={styles.H1}>Product</Text>
            {/* Price */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Icon name="shopping-cart" type="entypo" />
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 5,
                  fontFamily: Fonts.bold,
                }}>
                New Product
              </Text>
            </View>
            <View
              style={{
                padding: 7,
                backgroundColor: '#eefbf5',
                marginTop: 10,
                width: wp(70),
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  marginHorizontal: 5,
                  fontFamily: Fonts.bold,
                  color: '#01a955',
                }}>
                Product return within 10 days.
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.medium,
                }}>
                {nextModalres?.fine_description}
              </Text>
            </View>
            {/* Dot */}
            <View
              style={{
                height: 35,
                width: 35,
                borderRadius: 25,
                borderWidth: 10,
                // backgroundColor: '#000',
                position: 'absolute',
                right: 20,
                top: 20,
                borderColor: Product ? Colors.primary : Colors.secondary,
              }}
            />
          </Pressable>
          {/* Button */}
          <Button
            btnName="Continue to Return"
            onPress={() => {
              setnextModal(false);
              setView1(false);
              setView2(true);
              setnext2(true);
              setreturnBtnDisable(false);
              setextra(nextModalres?.missing_charge);
            }}
            textStyle={{
              fontFamily: Fonts.semibold,
              color: '#fff',
              fontSize: 16,
            }}
            btnStyle={{
              height: hp(6),
              width: wp(50),
              backgroundColor: '#2196F3',
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 1,
              shadowRadius: 3.5,
              elevation: 1,
              borderRadius: wp(66),
              marginTop: 10,
              marginBottom: 15,
            }}
          />
        </View>
      </Model>
    </>
  );
};

export default ReturnBookingPage;

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
  H1: {
    fontFamily: Fonts.bold,
    letterSpacing: 1,
    color: '#999',
    textTransform: 'uppercase',
  },
});
