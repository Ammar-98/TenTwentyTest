import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {WindowWidth, WindowHeight} from '../../utils/Dimensions';
import AppContext from '../../context/AppContext';
import Entypo from 'react-native-vector-icons/Entypo';

export default function SearchResultScreen(props) {
  const Header = () => {
    return (
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Watch')}>
          <Entypo name={'chevron-left'} size={25} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>
          {props.route.params.data.length} results found
        </Text>
      </View>
    );
  };

  const {configURL} = useContext(AppContext);
  const SearchView = ({item}) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('Details')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: '',
            alignItems: 'center',
            width: WindowWidth * 0.95,
            paddingHorizontal: 10,
            //   backgroundColor: 'red',
            gap: 10,
          }}>
          <Image
            style={{
              height: WindowWidth * 0.35,
              width: WindowWidth * 0.45,
              borderRadius: WindowWidth * 0.03,
            }}
            source={{uri: String(configURL + item.backdrop_path)}}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '45%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 600,
                  width: WindowWidth * 0.3,
                }}>
                {item.title}
              </Text>
              {/* <Text
                  style={{
                    color: 'gray',
                    fontSize: 13,
               
                  }}>
                  {item.title}
                </Text> */}
            </View>
            <Entypo
              name={'dots-three-horizontal'}
              size={25}
              color={'#61C3F2'}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        height: WindowHeight * 0.95,
        // backgroundColor:'red',
        marginTop: WindowHeight * 0.01,
        width: WindowWidth,
        alignItems: 'center',
      }}>
      <Header />

      <FlatList
        data={props.route.params.data}
        contentContainerStyle={{
          paddingBottom: WindowHeight * 0.18,
          gap: WindowHeight * 0.02,
        }}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => <SearchView item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: WindowWidth,
    height: WindowHeight * 0.1,
    flexDirection: 'row',
    //   justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WindowWidth * 0.05,
    backgroundColor: 'white',
    gap: 10,
  },
  HeaderText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
});
