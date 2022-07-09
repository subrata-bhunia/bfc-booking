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
import React, {useState, useEffect} from 'react';
import {Colors, Fonts} from '../../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import StaticHeader from '../../components/StaticHeader';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import Button from '../../components/Button';
import BlankSpace from '../../components/BlankSpace';
import {UIStore} from '../../UIStore';
import {SkypeIndicator} from 'react-native-indicators';
import {eventParticipation, getAllEvent} from '../../api/Events';
import {useIsFocused} from '@react-navigation/native';

const Events = () => {
  const userId = UIStore.useState(s => s.userId);
  const [loader, setLoader] = useState(true);
  const [allData, setAllData] = useState([]);
  const isFocused = useIsFocused();
  //
  //All events get Api
  useEffect(() => {
    handlegetEvents();
  }, [isFocused]);
  const handlegetEvents = async () => {
    setLoader(true);
    getAllEvent({
      user_id: userId,
    })
      .then(res => {
        const {status, data} = res.data;
        // console.log('Res of getAlEvents', res.data);
        if (status == 'Success') {
          setAllData(data);
        }
        setLoader(false);
      })
      .catch(err => {
        // console.log('Err of getAllEvents', err);
        setLoader(false);
      });
  };
  const handleEventParticipation = async (Id,status) => {
    eventParticipation({
      user_id: userId,
      event_id:Id,
      interested:status
    })
      .then(res => {
        const {status, data} = res.data;
        // console.log('Res of handleEventParticipation', res.data);
      })
      .catch(err => {
        console.log('Err of handleEventParticipation', err);
      });
  };

  const RenderItem = ({
    heading,
    description,
    participants,
    picture,
    type,
    remaining_days,
    member_type,
    interested,
    interested_msg,
    eventId,
    bgColor,
    date_title
  }) => {
  const [InterestedState,seInterestedState] = useState("Not Participate")

    return (
      <View>
        <View style={[styles.cardView,{backgroundColor:bgColor?bgColor:"#0A96EA"}]}>
          <View
            style={{
              padding: wp(7),
              paddingBottom: hp(2.5)
            }}>
            <Text
              style={{
                fontFamily: Fonts.semibold,
                color: Colors.white,
                fontSize: wp(5),
              }}>
              {heading}
            </Text>
            <BlankSpace height={hp(1)} />
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              style={{
                color: Colors.white,
                fontFamily: Fonts.regular,
                fontSize: wp(3.4),
                lineHeight: wp(5),
              }}>
              {description}
            </Text>
            <BlankSpace height={hp(2)} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
              }}>
              <View
                style={{
                  width: '50%',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.medium,
                    fontSize: wp(4),
                    color: Colors.white,
                    textAlign: 'center',
                  }}>
                  {date_title}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    color: Colors.white,
                    fontSize: wp(3.7),
                    textAlign: 'center',
                  }}>
                  {remaining_days}
                </Text>
              </View>
              <View
                style={{
                  borderLeftColor: Colors.white,
                  borderLeftWidth: wp(0.5),
                  paddingLeft: wp(3),
                  width: '50%',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.medium,
                    fontSize: wp(4),
                    color: Colors.white,
                    textAlign: 'center',
                  }}>
                  {member_type}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    color: Colors.white,
                    fontSize: wp(3.7),
                    textAlign: 'center',
                  }}>
                  {participants}
                </Text>
              </View>
            </View>
          </View>
          {type == 'Confirmation' ? (
            interested == 'Not Participate' && InterestedState == "Not Participate" ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(90),
                }}>
                <Button
                  btnName={'INTERESTED'}
                  btnStyle={{
                    backgroundColor: Colors.disable,
                    height: hp(7),
                    width: wp(45),
                    borderBottomLeftRadius: wp(7),
                  }}
                  textStyle={{
                    fontSize: wp(3.7),
                    fontFamily: Fonts.semibold,
                  }}
                  onPress={()=>{seInterestedState("Yes"),handleEventParticipation(eventId,"Yes")}}
                />
                <Button
                  btnName={'NOT INTERESTED'}
                  btnStyle={{
                    backgroundColor: Colors.text,
                    height: hp(7),
                    width: wp(45),
                    border: wp(2),
                    borderBottomRightRadius: wp(7),
                  }}
                  textStyle={{
                    color: Colors.white,
                    fontSize: wp(3.6),
                    fontFamily: Fonts.semibold,
                  }}
                  onPress={()=>{seInterestedState("No"),handleEventParticipation(eventId,"No")}}
                />
              </View>
            ) : (
              <View
                style={{
                  backgroundColor:interested=="Yes" || InterestedState == "Yes" ? Colors.disable:Colors.text,
                  height: hp(7),
                  width: wp(90),
                  borderBottomLeftRadius: wp(7),
                  borderBottomRightRadius: wp(7),
                  alignItems:"center",
                  justifyContent:"center"
                }}
                disabled={true}>
                <Text
                  style={{
                    fontSize: wp(3.7),
                    fontFamily: Fonts.semibold,
                    color:interested == "Yes"  || InterestedState == "Yes" ? Colors.text:Colors.white
                  }}>
                  { InterestedState == "Yes" ? "You are interested" :InterestedState == "No" ?"You are not interested":interested_msg}
                </Text>
              </View>
            )
          ) : null}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <StaticHeader />
      {loader ? (
        <View
          style={{
            marginTop: hp(30),
          }}>
          <SkypeIndicator color={Colors.botton} count={5} size={wp(12)} />
        </View>
      ) : allData.length > 0 ? 
      <ScrollView showsVerticalScrollIndicator={false}>
      {
        allData.map((item, ind) => {
          return (
            <>
            <RenderItem
              heading={item.heading}
              description={item.description}
              participants={item.participants}
              picture={item.picture}
              member_type={item.member_type}
              type={item.type}
              action={item.action}
              remaining_days={item.remaining_days}
              interested={item.interested}
              interested_msg={item.interested_msg}
              eventId={item.id}
              bgColor={item?.card_color}
              date_title={item?.date_title}
            />
            {
              allData.length == ind+1 ?<BlankSpace height={hp(15)}/>:null
            }
            </>
          );
        })
 }
 </ScrollView>
  : (
        <Text
          style={{
            fontFamily: Fonts.medium,
            fontSize: 16,
            textAlign: 'center',
            marginTop: 25,
          }}>
          No Events Found
        </Text>
      )}
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  cardView: {
    width: wp(90),
    alignSelf: 'center',
    backgroundColor: '#0A96EA',
    marginTop: hp(2),
    // padding:wp(8),
    // paddingVertical:hp(3),
    borderRadius: wp(7),
  },
});
