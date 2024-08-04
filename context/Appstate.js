import {StyleSheet, Text, View} from 'react-native';
import AppContext from './AppContext';
import {useState} from 'react';
import React from 'react';
import axios from 'axios';
import {Header} from 'react-native/Libraries/NewAppScreen';

const AppState = props => {
  const [name, setname] = useState('trying');
  const [configURL, setconfigURL] = useState('')

  const getConfig = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2JlYjJjZTAxMTg0MGVlNGRjNmFmYzhlYTAwMzNhMiIsIm5iZiI6MTcyMjU5MDQ4OC40NDA3MDIsInN1YiI6IjY2YWNhMGU0ZGNiMjY3MWE5NmJkNTQ4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xI3kjFDQ63ZNIA4SJonhAN3sMYhMwafJu--YIWaBOpA'; // Replace with your actual Bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get(
        'https://api.themoviedb.org/3/configuration',
        config,
      );

      console.log(res?.data?.images?.base_url); // Log the response to the console
      setconfigURL(res?.data?.images?.base_url+'original')
    } catch (error) {
      console.error('Error fetching configuration:', error);
   
    }
  };

  return (
    <AppContext.Provider
      value={{
        name,
        setname,
        getConfig,
        configURL
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
