import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {WindowHeight, WindowWidth} from '../../utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import axios from 'axios';
import AppContext from '../../context/AppContext';

const TextInputComp = ({
  expandSearch,
  setexpandSearch,
  searchQuery,
  setsearchQuery,
  props,
  DisplayData,
}) => {
  const handleSearchQuery = query => {
    setsearchQuery(query);
    console.log('query', query);
  };

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: expandSearch ? 'space-between' : 'flex-end',
        backgroundColor: expandSearch ? '#f2f2f6' : 'white',
        paddingVertical: 10,
        paddingHorizontal: WindowWidth * 0.05,
        borderRadius: 130,
        width: expandSearch ? WindowWidth * 0.9 : WindowWidth * 0.8,
      }}>
      <View onTouchStart={() => setexpandSearch(true)}>
        <AntDesign name={'search1'} size={25} color={'black'} />
      </View>
      {expandSearch && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={{width: WindowWidth * 0.6, height: 40, color: 'black'}}
            value={searchQuery}
            onChangeText={handleSearchQuery}
            placeholder="TV shows, movies and more"
            placeholderTextColor={'gray'}
            onSubmitEditing={() =>
              props.navigation.navigate('SearchResultScreen', {
                data: DisplayData,
              })
            }
          />
          <View
            onTouchStart={() => [setexpandSearch(false), setsearchQuery('')]}>
            <MaterialCommunityIcons name={'close'} size={25} color={'black'} />
          </View>
        </View>
      )}
    </View>
  );
};

const Header = ({searchQuery, setsearchQuery, props, DisplayData}) => {
  const [expandSearch, setexpandSearch] = useState(false);

  return (
    <View style={styles.Header}>
      {!expandSearch && <Text style={styles.HeaderText}>Watch</Text>}
      <TextInputComp
        expandSearch={expandSearch}
        setexpandSearch={setexpandSearch}
        searchQuery={searchQuery}
        setsearchQuery={setsearchQuery}
        props={props}
        DisplayData={DisplayData}
      />
    </View>
  );
};

const SearchView = ({item, props}) => {
  const {configURL} = useContext(AppContext);
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Details', {data: item})}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: '',
          alignItems: 'center',
          width: WindowWidth * 0.95,
          paddingHorizontal: 10,
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
            <Text>{configURL}</Text>
            {/* <Text>{item.backdrop_path}</Text> */}
          </View>
          <Entypo name={'dots-three-horizontal'} size={25} color={'#61C3F2'} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NormalView = ({item, props}) => {
  const {configURL} = useContext(AppContext);
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Details', {data: item})}>
      <View>
        <Text
          style={{
            zIndex: 10,
            position: 'absolute',
            color: 'white',
            fontSize: 23,
            top: WindowHeight * 0.14,
            textShadowColor: 'black',
            textShadowRadius: 10,
            marginLeft: WindowWidth * 0.06,
          }}>
          {item.title}
        </Text>
        <Image
          style={{
            height: WindowWidth * 0.45,
            width: WindowWidth * 0.9,
            borderRadius: WindowWidth * 0.03,
          }}
          source={{uri: String(configURL + item.backdrop_path)}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function Watch(props) {
  const [Data, setData] = useState([]);
  const [DisplayData, setDisplayData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setloading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setsearchQuery] = useState('');
  const key = '73beb2ce011840ee4dc6afc8ea0033a2';

  const getData = async page => {
    try {
      // Only show initial loading on first page
      if (page === 1) {
        setloading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&page=${page}`,
      );

      console.log('res', res.data.results);

      // Update total pages from API response
      if (res.data.total_pages) {
        setTotalPages(res.data.total_pages);
      }

      setloading(false);
      setLoadingMore(false);

      // Append new data to existing data
      setData(prevData => {
        // Avoid duplicates by checking if page data already exists
        const existingIds = new Set(prevData.map(item => item.id));
        const newResults = res.data.results.filter(
          item => !existingIds.has(item.id),
        );
        return [...prevData, ...newResults];
      });
    } catch (error) {
      console.log('error', error);
      setloading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery === '') {
      setDisplayData(Data);
    } else {
      const filteredData = Data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setDisplayData(filteredData);
    }
  }, [searchQuery, Data]);

  const handleLoadMore = () => {
    // Only load more if not currently loading and there are more pages
    if (!loading && !loadingMore && currentPage < totalPages) {
      setcurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={{backgroundColor: '#f6f6fa'}}>
      <Header
        searchQuery={searchQuery}
        setsearchQuery={setsearchQuery}
        props={props}
        DisplayData={DisplayData}
      />
      <View
        style={{
          height: WindowHeight * 0.95,
          width: WindowWidth,
          alignItems: 'center',
        }}>
        <FlatList
          data={DisplayData}
          nestedScrollEnabled
          contentContainerStyle={{
            paddingBottom: WindowHeight * 0.18,
            gap: WindowHeight * 0.02,
          }}
          ListFooterComponent={
            loadingMore && (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: WindowHeight * 0.02,
                }}>
                <ActivityIndicator color={'gray'} />
              </View>
            )
          }
          keyExtractor={item => String(item.id)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          renderItem={({item}) =>
            searchQuery === '' ? (
              <NormalView item={item} props={props} />
            ) : (
              <SearchView item={item} props={props} />
            )
          }
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
  },
  HeaderText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
});
