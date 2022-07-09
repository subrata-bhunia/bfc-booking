import {
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts} from '../../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {Icon, Input} from 'react-native-elements';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
import BlankSpace from '../../components/BlankSpace';
import {CommonInput} from '../../components/Input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {addKhataEntry, getKhataEntry} from '../../api/KhataEntry';
import {UIStore} from '../../UIStore';
import {SkypeIndicator} from 'react-native-indicators';
import DropDownPicker from 'react-native-dropdown-picker';

const AllEntry = () => {
  const [modal, setmodal] = useState(false);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [txnType, setTxnType] = useState('');
  const [datefrompicker, setDatefrompicker] = useState(false);
  const [entryDate, setEntryDate] = useState(new Date());
  const [btnLoader, setBtnLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [allKhataEntryDetails, setAllKhataEntryDetails] = useState([]);
  const userId = UIStore.useState(s => s.userId);
  const [types, setTypes] = useState([
    {label: 'Credit', value: 'Credit'},
    {label: 'Debit', value: 'Debit'},
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const StructuralDate = date =>
    `${
      new Date(date).getDate() < 10
        ? '0' + new Date(date).getDate()
        : new Date(date).getDate()
    }-${
      new Date(date).getMonth() + 1 < 10
        ? '0' + (new Date(date).getMonth() + 1)
        : new Date(date).getMonth() + 1
    }-${new Date(date).getFullYear()}`;

  // Create Khata Entry Api Call
  const handleCreateEntry = () => {
    setBtnLoader(true);
    // console.log(txnType)
    addKhataEntry({
      user_id: userId,
      date: entryDate,
      description: description,
      amount: amount,
      type: txnType,
    })
      .then(res => {
        // console.log('success of Create Khata Entry', res.data);
        const {status, message} = res.data;
        if (status == 'Success') {
          setmodal(false);
        } else {
          // setCheckAvailabilityMsg(message);
        }
        setBtnLoader(false);
        getAllKhataEntry();
      })
      .catch(err => {
        // console.log('Err Of Create Khata Entry :', err);
        setBtnLoader(false);
      });
    
  };

  // Create Khata Entry Api Call
  const getAllKhataEntry = () => {
    getKhataEntry({
      user_id: userId,
    })
      .then(res => {
        // console.log('success of GetAll Khata Entry', res.data);
        const {status, message, data, total} = res.data;
        if (status == 'Success') {
          setAllKhataEntryDetails(data);
          setTotalAmount(total);
          setIsLoader(false);
        } else {
          // setCheckAvailabilityMsg(message);
        }
      })
      .catch(err => {
        // console.log('Err Of GetAll Khata Entry :', err);
      });
    setTimeout(() => {
      // setCheckAvailabilityMsg(null);
    }, 5000);
  };
  useEffect(() => {
    getAllKhataEntry();
  }, []);
  useEffect(() => {
    setDescription('');
    setAmount(0);
    setTxnType('');
    setDatefrompicker(false);
    setEntryDate(new Date());
  }, [modal]);
  const CommonView = ({item}) => {
    return (
      <>
        <LinearGradient
          colors={['#eee', '#eee', '#fff']}
          style={{
            paddingHorizontal: wp(5),
            paddingVertical: wp(3),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: wp(2),
            }}>
            <Text
              style={{
                fontSize: wp(3.5),
                fontFamily: Fonts.regular,
              }}>
              {item?.date}
            </Text>
            <Text
              style={{
                fontSize: wp(3.5),
                fontFamily: Fonts.semibold,
                color: (item?.type == 'Debit')? "#dc3545": "#146c43"
              }}>
              <Icon name="inr" type="fontisto" size={wp(2.3)} /> {(item?.type == 'Debit')? '-': ''}{item?.amount}{' '}
            </Text>
          </View>
          <Text
            style={{
              fontSize: wp(4),
              fontFamily: Fonts.semibold,
              width: wp(70),
            }}>
            {item?.description}
          </Text>
        </LinearGradient>
      </>
    );
  };
  return (
    <>
      <View style={{ backgroundColor: '#fff', flex: 1, }}>
      <Header name="Khata Book" backBtn={true} />
      <LinearGradient
        colors={['#eee', '#eee', '#fff']}
        style={{
          paddingHorizontal: wp(5),
          paddingVertical: wp(3),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: wp(2),
          }}>
            <Text
              style={{
                fontSize: wp(4.5),
                fontFamily: Fonts.semibold,
                width: wp(70),
              }}>
              Total Amount:
            </Text>
          <Text
            style={{
              fontSize: wp(4.5),
              fontFamily: Fonts.semibold
            }}>
            <Icon name="inr" type="fontisto" size={wp(3)} /> {totalAmount}
          </Text>
        </View>
      </LinearGradient>
        {isLoader ? (
          <View
            style={{
              flex: 1,
              height: hp(20),
              alignItems: 'center',
              justifyContent: 'center',
              width: wp(100),
            }}>
            <SkypeIndicator color={Colors.botton} count={5} size={wp(12)} />
          </View>
        ) : (
          
          <ScrollView
            style={{
              flex: 1,
            }}
            showsVerticalScrollIndicator={false}>
            {allKhataEntryDetails.length != 0 ? (
              <>
                
                <BlankSpace height={hp(1)} />
                {allKhataEntryDetails.map((item, ind) => {
                  return <CommonView item={item} key={ind} />;
                })}
                <BlankSpace height={hp(13)} />
              </>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: hp(70),
                }}>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    fontFamily: Fonts.semibold,
                  }}>
                  No Entry Found
                </Text>
              </View>
            )}
          </ScrollView>
        )}
        <Pressable
          style={{
            backgroundColor: Colors.primary,
            height: wp(14),
            width: wp(14),
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: hp(14),
            right: wp(8),
          }}
          onPress={() => setmodal(true)}>
          <Icon
            name="plus"
            type="ant-design"
            color={Colors.white}
            size={wp(7)}
          />
        </Pressable>
      </View>
      <Modal
        isVisible={modal}
        statusBarTranslucent
        // onBackdropPress={() => setmodal(!modal)}
        backdropOpacity={0.6}
        focusable
        customBackdrop={
          <View
            style={{
              backgroundColor: '#000',
              height: hp(200),
            }}
          />
        }
        onBackButtonPress={() => {
          setmodal(false);
          navigation.navigate('Home');
        }}
        avoidKeyboard>
        <View
          style={{
            backgroundColor: '#fff',
            // flex: 1,
            padding: wp(3),
            paddingVertical: wp(7),
            borderRadius: wp(4),
          }}>
          <Input
            label="Description"
            placeholder="Enter Description"
            value={description}
            onChangeText={txt => {
              setDescription(txt);
            }}
            inputStyle={{
              fontFamily: Fonts.regular,
              textAlign: 'auto',
              marginLeft: 10,
              fontSize: wp(4),
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
          <Input
            label="Amount"
            placeholder="Enter Amount"
            value={amount}
            onChangeText={txt => {
              setAmount(txt);
            }}
            keyboardType="number-pad"
            inputStyle={{
              fontFamily: Fonts.regular,
              textAlign: 'auto',
              marginLeft: 10,
              fontSize: wp(4),
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
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                setDatefrompicker(true);
                // setEntryDateV(true);
              }}>
              <Input
                label="Select Date"
                disabled
                defaultValue={'Select Date'}
                inputStyle={{
                  fontFamily: Fonts.regular,
                  textAlign: 'auto',
                  marginLeft: 10,
                  fontSize: wp(4),
                }}
                value={
                  entryDate === null ? null : StructuralDate(entryDate)

                  // : getDate(entryDate, {format: 'D MMMM, YYYY'})
                }
                containerStyle={{
                  width: wp(43),
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
                  <Icon name="calendar" type="antdesign" style={{padding: 5}} />
                }
              />
            </TouchableOpacity>
            <DropDownPicker
              open={open}
              value={value}
              items={types}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setTypes}
              onChangeValue={() => {
                setTxnType(value);
              }}
              placeholder="Type"
              style={{
                width: wp(30),
                borderColor: '#999',
                marginTop: hp(3.5)
              }}

            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: wp(3.5),
            }}>
            <Button
              btnStyle={{
                height: hp(6),
                width: wp(35),
                backgroundColor: Colors.red,
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
                color: '#fff',
                fontSize: 16,
              }}
              btnName="CANCEL"
              onPress={() => setmodal(false)}
            />
            <Button
              btnStyle={{
                height: hp(6),
                width: wp(35),
                backgroundColor: Colors.primary,
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
              btnName="ADD"
              onPress={() => {
                !description || !amount || !entryDate || !txnType
                  ? alert('fill requird value')
                  : handleCreateEntry();
              }}
              isLoader={btnLoader}
            />
          </View>
        </View>
      </Modal>
      <DateTimePickerModal
        isVisible={datefrompicker}
        mode="date"
        onConfirm={date => {
          setDatefrompicker(false);
          setEntryDate(new Date(date));
        }}
        onCancel={() => setDatefrompicker(false)}
      />
    </>
  );
};

export default AllEntry;

const styles = StyleSheet.create({});
