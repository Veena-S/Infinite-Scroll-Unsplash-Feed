import { StyleSheet, Dimensions } from 'react-native';


export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const numberOfImagesPerRow = 2

export const thumbWidth =  windowWidth * 0.2; // 200;
export const thumbHeight =  thumbWidth; 

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#289',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header:{
    width: '100%',
    height: '10%',    
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1,
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
  },
  flatListContainer: {
    flex: 1, 
    height: windowHeight,
    marginVertical: 20,
  },
});

export default styles;