import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {WindowHeight, WindowWidth} from '../../utils/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import {useState} from 'react';

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
          props.navigation.navigate('Details', {
            data: props.route.params.data,
          })
        }>
        <Entypo name={'chevron-left'} size={25} color={'black'} />
      </TouchableOpacity>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.HeaderText}>{props.route.params.data.title} </Text>
        <Text style={styles.HeaderText2}>
          In Theaters {convertDateFormat(props.route.params.data.release_date)}{' '}
        </Text>
      </View>
    </View>
  );
};

const TimeItemView = ({item, setselectedTime, selectedTime}) => {
  return (
    <TouchableOpacity onPress={() => setselectedTime(item)}>
      <View style={{opacity: selectedTime === item ? 1 : 0.5}}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
            {item}
          </Text>
          <Text style={{color: 'gray', fontSize: 15}}>Cinetech + Hall 1</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: WindowWidth * 0.1,
            paddingVertical: WindowHeight * 0.02,
            borderRadius: 20,
            marginTop: 10,
            borderColor: selectedTime === item ? '#61C3F2' : 'black',
          }}>
          <Image
            style={{width: WindowWidth * 0.4, height: WindowHeight * 0.2}}
            source={require('../Assets/Map_Mobile.jpg')}
          />
        </View>
        <View>
          <Text style={{fontSize: 15, color: 'gray'}}>
            From{' '}
            <Text style={{fontSize: 15, color: 'black', fontWeight: '500'}}>
              50$
            </Text>{' '}
            or{' '}
            <Text style={{fontSize: 15, color: 'black', fontWeight: '500'}}>
              {' '}
              2500 bonus
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const TimeView = ({selectedTime, setselectedTime}) => {
  const timelist = ['12:30', '13:30', '14:30', '15;30'];

  return (
    <View
      style={{
        paddingLeft: WindowWidth * 0.085,
        // gap: WindowHeight * 0.05,
        // backgroundColor: 'red',
        height: WindowHeight * 0.4,
      }}>
      <FlatList
        data={timelist}
        horizontal
        contentContainerStyle={{gap: WindowWidth * 0.1}}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => {
          return (
            <TimeItemView
              item={item}
              setselectedTime={setselectedTime}
              selectedTime={selectedTime}
            />
          );
        }}
      />
    </View>
  );
};

const DateItemView = ({item, setselectedDate, selectedDate}) => {
  return (
    <TouchableOpacity onPress={() => setselectedDate(item)}>
      <Text
        style={{
          backgroundColor: selectedDate === item ? '#61C3F2' : '#A6A6A6',
          width: WindowWidth * 0.25,
          textAlign: 'center',
          height: WindowHeight * 0.04,
          borderRadius: WindowHeight * 0.04,
          textAlignVertical: 'center',
          color: selectedDate === item ? 'white' : 'black',
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

const DateView = ({selectedDate, setselectedDate}) => {
  const getNextTenDates = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const today = new Date();
    let dates = [];

    for (let i = 0; i < 10; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const day = nextDate.getDate();
      const month = months[nextDate.getMonth()];
      dates.push(`${day} ${month}`);
    }

    return dates;
  };

  const nextDateList = getNextTenDates();

  return (
    <View
      style={{
        paddingLeft: WindowWidth * 0.085,
        gap: WindowHeight * 0.02,
        //   backgroundColor: 'red',
        height: WindowHeight * 0.15,
      }}>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          fontWeight: '500',
        }}>
        Date
      </Text>
      <FlatList
        data={nextDateList}
        horizontal
        contentContainerStyle={{gap: 10}}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => {
          return (
            <DateItemView
              item={item}
              setselectedDate={setselectedDate}
              selectedDate={selectedDate}
            />
          );
        }}
      />
    </View>
  );
};

const ButtonView = ({props, selectedDate, selectedTime}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('SelectSeat', {
          data: {
            selectedDate: selectedDate,
            selectedTime: selectedTime,
            MovieName: props.route.params.data.title,
            data: props.route.params.data,
          },
        })
      }>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            textAlignVertical: 'center',
            color: 'white',
            fontSize: 16,
            fontWeight: '500',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor:
              selectedDate === '' || selectedDate === '' ? 'gray' : '#61C3F2',
            width: WindowWidth * 0.65,
            height: WindowHeight * 0.05,
            opacity: selectedDate === '' || selectedTime === '' ? 0.5 : 1,
          }}>
          Select Seats
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function SelectTime(props) {
  const [selectedDate, setselectedDate] = useState('');
  const [selectedTime, setselectedTime] = useState('');

  useEffect(() => {
    console.log('PropsData', props.route.params.data);
  }, [props.route.params.data]);

  useEffect(() => {
    console.log('selectedTime', selectedTime);
    console.log('selectedDate', selectedDate);
  }, [selectedDate, selectedTime]);

  return (
    <View
      style={{
        width: WindowWidth,
        height: WindowHeight,
        backgroundColor: '#F6F6FA',
      }}>
      <Header props={props} />
      <View
        style={{
          width: WindowWidth,
          height: WindowHeight * 0.8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <DateView
          selectedDate={selectedDate}
          setselectedDate={setselectedDate}
        />
        <TimeView
          selectedTime={selectedTime}
          setselectedTime={setselectedTime}
        />
      </View>
      <View style={{width: WindowWidth, height: WindowHeight * 0.1}}>
        <ButtonView
          props={props}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      </View>
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
