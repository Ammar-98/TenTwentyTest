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
      <View>
        <Text style={styles.HeaderText}>{props.route.params.data.title} </Text>
        <Text style={styles.HeaderText2}>
          In Theaters {convertDateFormat(props.route.params.data.release_date)}{' '}
        </Text>
      </View>
      <View></View>
    </View>
  );
};

const TimeView = () => {
  const [Selected, setSelected] = useState('');
  const timelist = ['12:30', '13:30', '14:30', '15;30'];

  const TimeItemView = ({item}) => {
    return (
      <TouchableOpacity onPress={() => setSelected(item)}>
        <View>
          <View>
            <Text>{item}</Text>
            <Text>Cinetech + Hall 1</Text>
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
              borderColor: Selected == item ? '#61C3F2' : 'black',
            }}>
            <Image
              style={{width: WindowWidth * 0.4, height: WindowHeight * 0.2}}
              source={require('../Assets/Map_Mobile.jpg')}
            />
          </View>
          <View>
            <Text>From 50$ or 2500 bonus</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
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
          return <TimeItemView item={item} setSelected={setSelected} />;
        }}
      />
    </View>
  );
};

const DateView = () => {
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

  const [Selected, setSelected] = useState('');
  const nextDateList = getNextTenDates();

  const DateItemView = ({item, setSelected}) => {
    return (
      <TouchableOpacity onPress={() => setSelected(item)}>
        <Text
          style={{
            backgroundColor: Selected == item ? '#61C3F2' : '#A6A6A6',
            width: WindowWidth * 0.25,
            textAlign: 'center',
            height: WindowHeight * 0.04,
            borderRadius: WindowHeight * 0.04,
            textAlignVertical: 'center',
            color: Selected == item ? 'white' : 'black',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        paddingLeft: WindowWidth * 0.085,
        gap: WindowHeight * 0.02,
        //   backgroundColor: 'red',
        height: WindowHeight * 0.15,
      }}>
      <Text style={styles.HeaderText}>Date</Text>
      <FlatList
        data={nextDateList}
        horizontal
        contentContainerStyle={{gap: 10}}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => {
          return <DateItemView item={item} setSelected={setSelected} />;
        }}
      />
    </View>
  );
};

export default function SelectTime(props) {
  useEffect(() => {
    console.log('PropsData', props.route.params.data);
  }, []);

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
        <DateView />
        <TimeView />
      </View>
      <View style={{width: WindowWidth, height: WindowHeight * 0.1}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              textAlignVertical: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: '500',
              borderRadius: 10,
              textAlign: 'center',
              backgroundColor: '#61C3F2',
              width: WindowWidth * 0.65,
              height: WindowHeight * 0.05,
            }}>
            Select Seats
          </Text>
        </View>
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
  },
  HeaderText2: {
    fontSize: 13,
    color: '#61C3F2',
    fontWeight: '500',
  },
});
