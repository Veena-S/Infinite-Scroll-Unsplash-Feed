import { StyleSheet, Dimensions } from 'react-native';


export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const numberOfImagesPerRow = 2

export const thumbWidth =  windowWidth * 0.2; // 200;
export const thumbHeight =  thumbWidth; //windowHeight * 0.4 ; // 200;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#289',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  thumb: {
    width: thumbWidth,
    height: thumbHeight,
    backgroundColor: '#fff0f0',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  imageRow: { 
    justifyContent: 'space-between',
  },
  imageColumn: {
    margin: 5,
    paddingHorizontal: 3,
  },
  imageCaptionView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageCaption: {
    width: thumbWidth,
    backgroundColor: '#fff0f0',
    alignItems: 'center',
    
  },
  // same as image row
  columnContainer: {
    justifyContent: 'space-between',
    // marginBottom: 5,
    // marginLeft: 10,
    // marginRight: 10,
    // paddingLeft: 2,
    // paddingRight: 2,
  },
  flatListContainer: {
    flex: 1, 
    height: windowHeight,
  },
});

export default styles;