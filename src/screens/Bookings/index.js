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
import {TouchableOpacity} from 'react-native';
import Button from '../../components/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getDate} from 'bangla-calendar';
import DropDownPicker from 'react-native-dropdown-picker';

const Booking = () => {
  const [view0, setView0] = useState(true);
  const [view1, setView1] = useState(true);
  const [view2, setView2] = useState(true);
  const [next1, setnext1] = useState(false);
  const [next2, setnext2] = useState(false);
  const [pickupdate, setpickupdate] = useState(null);
  const [returndate, setreturndate] = useState(null);
  const TableHead = ['Item Name', 'Stock', 'Need'];
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
  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };
  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };
  // const handleConfirm = date => {
  //   setpickupdate(new Date(date));
  //   hideDatePicker();
  // };
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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingTop: StatusBar.currentHeight,
        padding: 10,
      }}
      keyboardDismissMode="interactive">
      {/* <KeyboardAvoidingView
        enabled={true}
        behavior="position"
        style={{flex: 1}}> */}
      {/* Personal */}
      <View>
        <TouchableOpacity
          onPress={() => {
            setView0(!view0);
            setView1(false);
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
          <View>
            <Text style={styles.h1}>Personal Details</Text>
            <Text style={styles.sub}>Pickup Date,Time,Name,Address ...</Text>
          </View>
          <Icon name="arrow-drop-down-circle" type="material" size={30} />
        </TouchableOpacity>
        {view0 ? (
          <View
            style={{
              // marginHorizontal: 15,
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
            {/* Pick UP Date && TIME */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setDatePickerVisibilityP(true)}>
                <Input
                  label="Pickup Date & Time"
                  disabled
                  caretHidden={true}
                  defaultValue={'Select Date'}
                  inputStyle={{
                    fontFamily: Fonts.regular,
                    textAlign: 'auto',
                    marginLeft: 10,
                  }}
                  value={
                    pickupdate === null
                      ? null
                      : getDate(pickupdate, {format: 'D MMMM, YYYY'})
                  }
                  containerStyle={{
                    width: wp(55),
                    borderBottomWidth: 0,
                  }}
                  inputContainerStyle={{
                    borderWidth: 1,
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                  labelStyle={{
                    fontFamily: Fonts.semibold,
                    color: '#000',
                  }}
                  rightIcon={
                    <Icon
                      name="calendar"
                      type="antdesign"
                      style={{padding: 5}}
                    />
                  }
                />
              </TouchableOpacity>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                zIndex={5000}
                zIndexInverse={6000}
                style={{
                  width: wp(30),
                  borderColor: '#999',
                }}
                flatListProps={{
                  style: {
                    width: wp(30),
                  },
                }}
                containerStyle={{
                  width: wp(30),
                  borderColor: 'red',
                }}
                labelStyle={{
                  fontFamily: Fonts.regular,
                  fontSize: 15,
                }}
                placeholder={'Time'}
                placeholderStyle={{
                  fontFamily: Fonts.regular,
                  fontSize: 15,
                }}
                listItemLabelStyle={{
                  fontFamily: Fonts.regular,
                  fontSize: 15,
                }}
                dropDownDirection="TOP"
                dropDownContainerStyle={{
                  backgroundColor: '#eee',
                  position: 'absolute',
                  // elevation: 10,
                  borderColor: '#999',
                }}
              />
            </View>
            {/* Return */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setDatePickerVisibilityR(true)}>
                <Input
                  label="Return Date & Time"
                  disabled
                  caretHidden={true}
                  defaultValue={'Select Date'}
                  inputStyle={{
                    fontFamily: Fonts.regular,
                    textAlign: 'auto',
                    marginLeft: 10,
                  }}
                  value={
                    returndate === null
                      ? null
                      : getDate(returndate, {format: 'D MMMM, YYYY'})
                  }
                  containerStyle={{
                    width: wp(55),
                    borderBottomWidth: 0,
                  }}
                  inputContainerStyle={{
                    borderWidth: 1,
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                  labelStyle={{
                    fontFamily: Fonts.semibold,
                    color: '#000',
                  }}
                  rightIcon={
                    <Icon
                      name="calendar"
                      type="antdesign"
                      style={{padding: 5}}
                    />
                  }
                />
              </TouchableOpacity>
              <DropDownPicker
                open={_return}
                value={rvalue}
                items={items}
                setOpen={setreturn}
                setValue={setrvalue}
                setItems={setItems}
                style={{
                  width: wp(30),
                  borderColor: '#999',
                }}
                flatListProps={{
                  style: {
                    width: wp(30),
                  },
                }}
                containerStyle={{
                  width: wp(30),
                  borderColor: 'red',
                }}
                labelStyle={{
                  fontFamily: Fonts.regular,
                  fontSize: 15,
                }}
                placeholder={'Time'}
                placeholderStyle={{
                  fontFamily: Fonts.regular,
                  fontSize: 15,
                }}
                listItemLabelStyle={{
                  fontFamily: Fonts.regular,
                  fontSize: 15,
                }}
                dropDownDirection="TOP"
                dropDownContainerStyle={{
                  backgroundColor: '#eee',
                  position: 'absolute',
                  // elevation: 10,
                  borderColor: '#999',
                }}
              />
            </View>
            {/* Gathering & Catterr */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Input
                label="Gathering"
                caretHidden={true}
                inputStyle={{
                  fontFamily: Fonts.regular,
                  textAlign: 'auto',
                  marginLeft: 10,
                }}
                keyboardType="number-pad"
                placeholder="Gathering"
                value={
                  returndate === null
                    ? null
                    : getDate(returndate, {format: 'D MMMM, YYYY'})
                }
                containerStyle={{
                  width: wp(55),
                  borderBottomWidth: 0,
                }}
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 5,
                }}
                labelStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#000',
                }}
                rightIcon={
                  <Icon
                    name="users"
                    type="feather"
                    size={20}
                    style={{padding: 5}}
                  />
                }
              />
              <View style={{marginTop: -hp(3)}}>
                <Text
                  style={{
                    fontFamily: Fonts.semibold,
                    fontSize: 16,
                    marginVertical: 4,
                  }}>
                  Caterers
                </Text>
                <DropDownPicker
                  open={_cateres}
                  value={caterersvalue}
                  items={Catitems}
                  setOpen={setcateres}
                  setValue={setcaterersvalue}
                  setItems={setCatitems}
                  // zIndex={1000}
                  // zIndexInverse={1000}
                  style={{
                    width: wp(30),
                    borderColor: '#999',
                  }}
                  flatListProps={{
                    style: {
                      width: wp(30),
                    },
                  }}
                  containerStyle={{
                    width: wp(30),
                    borderColor: 'red',
                  }}
                  labelStyle={{
                    fontFamily: Fonts.regular,
                    fontSize: 15,
                  }}
                  placeholder={'Caterers'}
                  placeholderStyle={{
                    fontFamily: Fonts.regular,
                    fontSize: 15,
                  }}
                  listItemLabelStyle={{
                    fontFamily: Fonts.regular,
                    fontSize: 15,
                  }}
                  dropDownDirection="TOP"
                  dropDownContainerStyle={{
                    backgroundColor: '#eee',
                    position: 'absolute',
                    // elevation: 10,
                    borderColor: '#999',
                  }}
                />
              </View>
            </View>
            {/* Customer Name */}
            <Input
              label="Customer Name"
              caretHidden={true}
              placeholder="Enter Customer Name"
              inputStyle={{
                fontFamily: Fonts.regular,
                textAlign: 'auto',
                marginLeft: 10,
              }}
              containerStyle={{
                width: '100%',
                borderBottomWidth: 0,
              }}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 5,
              }}
              labelStyle={{
                fontFamily: Fonts.semibold,
                color: '#000',
              }}
            />
            {/* Customer Phone */}
            <Input
              label="Customer Phone"
              caretHidden={true}
              keyboardType="number-pad"
              placeholder="Enter Customer Phone"
              inputStyle={{
                fontFamily: Fonts.regular,
                textAlign: 'auto',
                marginLeft: 10,
              }}
              containerStyle={{
                width: '100%',
                borderBottomWidth: 0,
              }}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 5,
              }}
              labelStyle={{
                fontFamily: Fonts.semibold,
                color: '#000',
              }}
            />
            <CheckBox
              title={'Have Whatsapp?'}
              textStyle={{fontFamily: Fonts.bold}}
              titleProps={{
                style: {
                  fontFamily: Fonts.bold,
                },
              }}
              checked={true}
              containerStyle={{
                marginTop: -10,
                marginBottom: 10,
              }}
            />
            {/* Customer Addresss */}
            <Input
              label="Customer Address"
              caretHidden={true}
              multiline
              placeholder="Enter Customer Address"
              inputStyle={{
                fontFamily: Fonts.regular,
                textAlign: 'auto',
                marginLeft: 10,
              }}
              containerStyle={{
                width: '100%',
                borderBottomWidth: 0,
              }}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 5,
              }}
              labelStyle={{
                fontFamily: Fonts.semibold,
                color: '#000',
              }}
            />
            {/* -------------------- */}
            <DateTimePickerModal
              isVisible={isDatePickerVisibleP}
              mode="date"
              onConfirm={date => {
                setDatePickerVisibilityP(false);
                setpickupdate(new Date(date));
              }}
              onCancel={() => setDatePickerVisibilityP(false)}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisibleR}
              mode="date"
              onConfirm={date => {
                setDatePickerVisibilityR(false);
                setreturndate(new Date(date));
              }}
              onCancel={() => setDatePickerVisibilityR(false)}
            />
            <Button
              onPress={() => {
                setView0(!view0);
                setnext1(true);
                setView1(true);
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

      {/* 2nd  Items*/}
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
            <View>
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
                                onChangeText={txt => console.log(cellData, txt)}
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
            <View>
              <Text style={styles.h1}>Payment Details</Text>
              <Text style={styles.sub}>Advanced,Full Payment,Fine ...</Text>
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
            </View>
          ) : null}
        </View>
      ) : null}

      {/* Add Booking Button */}
      {next1 && next2 ? (
        <Button
          // onPress={() => {
          //   setView0(!view0);
          //   setnext1(true);
          //   setView1(true);
          // }}
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
          btnName="Add Book"
        />
      ) : null}
      <View style={{height: StatusBar.currentHeight + hp(9) + hp(4)}} />
      {/* </KeyboardAvoidingView> */}
    </ScrollView>
  );
};

export default Booking;

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
});
