import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {WindowHeight, WindowWidth} from '../../utils/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import {useState} from 'react';
import SeatIcon from '../Assets/SeatIcon';
export default function SelectSeat(props) {
  function convertDateFormat(dateString) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const [year, month, day] = dateString.split('-');
    const monthName = months[parseInt(month, 10) - 1]; // Convert month to 0-based index

    return `${monthName} ${parseInt(day, 10)}, ${year}`;
  }
  const Header = ({props}) => {
    return (
      <View style={styles.Header}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('SelectTime', {
              data: props.route.params.data.data,
            })
          }>
          <Entypo name={'chevron-left'} size={25} color={'black'} />
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.HeaderText}>
            {props.route.params.data.MovieName}{' '}
          </Text>
          <Text style={styles.HeaderText2}>
            {props.route.params.data.selectedDate} |{' '}
            {props.route.params.data.selectedTime}
          </Text>
        </View>
        <View></View>
      </View>
    );
  };
  const Footer = () => {
    return (
      <View
        style={{
          width: WindowWidth,
          height: WindowHeight * 0.4,
          backgroundColor: 'white',
          borderTopWidth:2,
          borderTopColor:'#EFEFEF',
          paddingHorizontal: WindowWidth * 0.1,
        }}>
        <View
          style={{
            width: WindowWidth * 0.8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: WindowHeight * 0.02,
          }}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <SeatIcon color={'#CD9D0F'} />
            <Text style={{color: '#8F8F8F', fontSize: 15, fontWeight: '500'}}>
              Selected
            </Text>
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            <SeatIcon color={'#A6A6A6'} />
            <Text style={{color: '#8F8F8F', fontSize: 15, fontWeight: '500'}}>
              Not Available
            </Text>
          </View>
        </View>
        <View
          style={{
            width: WindowWidth * 0.8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: WindowHeight * 0.02,
          }}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <SeatIcon color={'#564CA3'} />
            <Text style={{color: '#8F8F8F', fontSize: 15, fontWeight: '500'}}>
              VIP (150$)
            </Text>
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            <SeatIcon color={'#61C3F2'} />
            <Text style={{color: '#8F8F8F', fontSize: 15, fontWeight: '500'}}>
              Regular (50$)
            </Text>
          </View>
        </View>
        <Text
          style={{
            width: WindowWidth * 0.35,
            paddingVertical: 10,
            textAlignVertical: 'center',
            textAlign: 'center',
            borderRadius: 10,
            backgroundColor: '#A6A6A6',
            fontSize: 20,
            fontWeight: '500',
            marginTop: WindowHeight * 0.02,
          }}>
          4/ <Text style={{fontSize: 15, fontWeight: '400'}}>3 row</Text>
        </Text>
        <View
          style={{
            width: WindowWidth * 0.8,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: WindowHeight * 0.02,
          }}>
          <View
            style={{
              width: WindowWidth * 0.25,
              height: WindowHeight * 0.07,
              borderRadius: 10,
              //   alignItems: 'center',
              backgroundColor: '#A6A6A6',
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black'}}>Total Price</Text>
            <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
              $ 50
            </Text>
          </View>
          <View
            style={{
              width: WindowWidth * 0.52,
              height: WindowHeight * 0.07,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              
              backgroundColor: '#61C3F2',
            }}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
              Proceed to pay
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Header props={props} />
      <View style={{width: WindowWidth, height: WindowHeight * 0.5}}>
        <Image
        source={require('../Assets/ScreenSeat.png')}
        style={{width:WindowWidth,height: WindowHeight * 0.4,resizeMode:'contain'}} />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: WindowWidth,
    height: WindowHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WindowWidth * 0.05,
    backgroundColor: 'white',
    gap: 10,
  },
  HeaderText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  HeaderText2: {
    fontSize: 15,
    color: '#61C3F2',
    fontWeight: '500',
    textAlign: 'center',
  },
});
