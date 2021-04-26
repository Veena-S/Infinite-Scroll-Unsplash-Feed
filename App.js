import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import FeedList from "./src/components/FeedList.jsx"
import styles from "./src/Styles.js"
import {UnsplashFeedProvider} from "./src/appContextStore.jsx"


export default function App() {
  return (
    <UnsplashFeedProvider>
      <View style={styles.container}>
        <Text>Open up App.js provider added !</Text>
        <StatusBar style="auto" />
        <FeedList></FeedList>
      </View>
    </UnsplashFeedProvider>
  );
}
