// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import FeedList from "./src/components/FeedList.jsx"
import styles from "./src/Styles.js"
import {UnsplashFeedProvider} from "./src/appContextStore.jsx"


export default function App() {
  return (
    <UnsplashFeedProvider>
      <View style={styles.container}>
        <FeedList />
      </View>
    </UnsplashFeedProvider>
  );
}
