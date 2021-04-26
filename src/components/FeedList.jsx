import React, {useContext, useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import styles from "../Styles.js"
import {UnsplashFeedContext, getUnsplashImageList} from '../appContextStore.jsx'


export default function FeedList() {

  /**
   * useContext accepts a context object and returns the current context
   * Current context value is determined by the Provider above the calling component
   * When the Provider component gets updated, useContext hook will render with latest
   * context value passed to "UnsplashFeedContext"
   */
  const { store, dispatch } = useContext(UnsplashFeedContext);
  
  useEffect(() => {
    getUnsplashImageList(dispatch);
  }, [])

  return (
    <SafeAreaView >
      <Text>{`Number of Images returned: ${store.unsplashImageList.length}`}</Text>
      
    </SafeAreaView>
  );
}