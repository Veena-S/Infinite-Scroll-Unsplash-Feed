import React, {useContext, useEffect} from 'react';
import { SafeAreaView, View, FlatList, Image, Text, StatusBar } from 'react-native';
import styles from "../Styles.js"
import {UnsplashFeedContext, getUnsplashImageList, setPageCount} from '../appContextStore.jsx'

/**
 * FeedList is the application component defined to support the display of
 * feed list. This component uses the FlatList react native component.
 * It supports infinte scrolling and pull to refresh features
 * @returns - Returns the list of photos from Unsplash
 */
export default function FeedList() {

  /**
   * useContext accepts a context object and returns the current context
   * Current context value is determined by the Provider above the calling component
   * When the Provider component gets updated, useContext hook will render with latest
   * context value passed to "UnsplashFeedContext"
   */
  const { store, dispatch } = useContext(UnsplashFeedContext);
  
  /**
   * Get the first set of images from Unsplash
   */
  useEffect(() => {
    getUnsplashImageList(dispatch, store.page);
  }, [])

  /**
   * Create component to display the list of images
   */
  const SingleImageItem = ({imageData}) => (
      <View style={styles.imageColumn}>
        <Image style={styles.thumb} source={{ uri: imageData.urls.thumb }} />
      </View>
  )

  const renderImage = ({item}) => (
    <View 
    // style={styles.imageRow}
    >
      <SingleImageItem imageData={item}/>
    </View>
  )

  /**
   * Function that handles the "onEndReached" of FlatList
   * This is invoked when when the scroll position gets within the 
   * onEndReachedThreshold of the rendered content.
   * 
   * This funtion increments the page count by 1 and set in the state
   */
  const handleEndReached = () => {
    const pageCount = store.page + 1;
    dispatch(setPageCount({pageCount}));
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList numColumns={3}
                data={store.unsplashImageList}
                renderItem={renderImage}
                keyExtractor={item => item.id}
                onEndReached={() => handleEndReached()}
                onEndReachedThreshold={0}
                columnWrapperStyle={styles.columnContainer}
      />
    </SafeAreaView>
  );
}