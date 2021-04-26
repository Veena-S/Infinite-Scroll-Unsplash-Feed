import React, {useContext, useEffect} from 'react';
import { SafeAreaView, View, FlatList,Text, Image, ActivityIndicator, Dimensions  } from 'react-native';
import styles from "../Styles.js"
import {UnsplashFeedContext, getUnsplashImageList, setRefreshingStatus,
         setPageCount, unsetUnsplashImageList} from '../appContextStore.jsx'

  const {height} = Dimensions.get('window');

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
  // Commented - causes duplication of data
  // useEffect(() => {
  //   getUnsplashImageList(dispatch, store.page);
  // }, [])

  useEffect(() => {
    getUnsplashImageList(dispatch, store.page);
  }, [store.page])

  /**
   * Create component to display the list of images
   */
  const SingleImageItem = ({imageData}) => (
      <View style={styles.imageColumn}>
        <Image style={styles.thumb} source={{ uri: imageData.urls.thumb }} 
              PlaceholderContent={<ActivityIndicator />}/>
         <View style={ styles.imageCaptionView}>
          <Text style={styles.imageCaption}>{imageData.description !== null ? imageData.description : imageData.alt_description}</Text>
        </View>   
      </View>
  )

  const renderImage = ({item}) => (
    <View >
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
    const pageCount = Number(store.page) + 1;
    dispatch(setPageCount(pageCount));
  }

  const handleRefresh = () => {
    dispatch(setRefreshingStatus(true));
    dispatch(setPageCount(1));
    dispatch(unsetUnsplashImageList());
  }
  
  return (
    <View style={{flex: 1, height: height}}>
      <FlatList 
                // data is the image list from store
                data={store.unsplashImageList}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                // for infinite scroll support
                onEndReached={() =>{ handleEndReached()}}
                onEndReachedThreshold={1}
                // for supporting display in multiple columns
                columnWrapperStyle={styles.columnContainer}
                numColumns={2}
                // for activity indicator
                ListFooterComponent={() =>
                  store.loading ? null : <ActivityIndicator size="large" animating />}
                // for handling refresh on page pull
                onRefresh={() =>{ handleRefresh()}}
                refreshing={store.refreshing}
                renderItem={renderImage}
      />
    </View>
  );
}