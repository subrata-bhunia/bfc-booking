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
import React, {useState} from 'react';
import {Colors, Fonts} from '../../constants';
import {CheckBox, Icon, Input} from 'react-native-elements';
import {TouchableOpacity, Image} from 'react-native';
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

const BookingDetails = ({navigation}) => {
  const [view0, setView0] = useState(true);
  const [view1, setView1] = useState(false);
  const [view2, setView2] = useState(false);
  const [next1, setnext1] = useState(true);
  const [next2, setnext2] = useState(true);
  const [modal, setmodal] = useState(false);
  const [modifyView, setModifyView] = useState(false);
  const [pickupdate, setpickupdate] = useState(null);
  const [returndate, setreturndate] = useState(null);
  const TableHead2 = ['Item Name', 'Stock', 'Need'];
  const TableHead = ['Item Name', 'Taken', 'Return'];
  const tableData = [
    ['কড়া', '200', 'kara'],
    ['বালতি', '100', 'balti'],
    ['ডেক', '2000', 'dek'],
    ['কড়া', '200', 'kara'],
    ['বালতি', '100', 'balti'],
    ['ডেক', '2000', 'dek'],
    ['কড়া', '200', 'kara'],
    ['বালতি', '100', 'balti'],
    ['ডেক', '2000', 'dek'],
    ['কড়া', '200', 'kara'],
    ['বালতি', '100', 'balti'],
    ['ডেক', '2000', 'dek'],
    ['কড়া', '200', 'kara'],
    ['বালতি', '100', 'balti'],
    ['ডেক', '2000', 'dek'],
    ['কড়া', '200', 'kara'],
    ['বালতি', '100', 'balti'],
    ['ডেক', '2000', 'dek'],
  ];
  // -------- Date Picker --------------- //
  const [isDatePickerVisibleP, setDatePickerVisibilityP] = useState(false);
  const [isDatePickerVisibleR, setDatePickerVisibilityR] = useState(false);
  // ---------- Drop Down ---------- //
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [_return, setreturn] = useState(false);
  const [rvalue, setrvalue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Morning', value: 'Morning'},
    {label: 'Evening', value: 'Evening'},
  ]);
  const [_cateres, setcateres] = useState(false);
  const [caterersvalue, setcaterersvalue] = useState(null);
  const [Catitems, setCatitems] = useState([
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'},
  ]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingTop: StatusBar.currentHeight,
        padding: 10,
      }}>
      <ScrollView keyboardDismissMode="interactive">
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
                height: hp(22),
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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.date}>22-02-2022</Text>
                    </View>
                  </View>
                  {true === 'Morning' ? (
                    <Icon name="sunny-sharp" type="ionicon" raised size={20} />
                  ) : (
                    <Icon name="moon" type="ionicon" reverse size={20} />
                  )}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    <Text style={styles.textH1}>Return</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.date}>77-02-2022</Text>
                    </View>
                  </View>
                  {true === 'Morning' ? (
                    <Icon name="sunny-sharp" type="ionicon" raised size={20} />
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
                  <Text style={styles.textH2}>Rahi Khan</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Icon name="home" />
                  <Text style={styles.textH2}>Debpur,Debra</Text>
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
                    <Text style={styles.textH2}> 20000</Text>
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
                    <Text style={styles.textH2}>yes</Text>
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
                              cellIndex === 2 ? (
                                <Input
                                  placeholder="0"
                                  // value={}
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
                    fontSize: 20,
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
                    fontSize: 20,
                  }}
                  btnName="Next"
                />
              </View>
            ) : null}
          </View>
        )}

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
                    defaultValue={'0'}
                    containerStyle={{width: wp(40)}}
                    leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                    inputStyle={{
                      fontSize: 20,
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
                      fontSize: 20,
                      width: wp(40),
                      textAlign: 'right',
                    }}>
                    Caterer Charge :
                  </Text>
                  <Input
                    defaultValue={'0'}
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
                    defaultValue={'0'}
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
                    defaultValue={'0'}
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
                    defaultValue={'0'}
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
                    defaultValue={'0'}
                    containerStyle={{width: wp(40)}}
                    leftIcon={<Icon name="inr" type="fontisto" size={15} />}
                    inputStyle={{
                      fontSize: 20,
                    }}
                  />
                </View>
                <Button
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
                    fontSize: 20,
                  }}
                  btnName="UPDATE BOOKING"
                />
              </View>
            ) : null}
          </View>
        ) : null}

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
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
        }}>
        <Button
          onPress={() => {
            setModifyView(true), setView1(true);
          }}
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
          btnName="MODIFY"
        />
        <Button
          onPress={() => {
            setModifyView(false), setView1(true);
          }}
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
          btnName="RETURN"
        />
      </View>
    </View>
  );
};

export default BookingDetails;

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
  head: {height: 40, backgroundColor: '#808B97', textAlign: 'center'},
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
    fontSize: 20,
  },
});
