import { StyleSheet } from 'react-native';

const thumbWidth = 300;

const styles = StyleSheet.create({
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
    height: 200,
  },
  imageRow: { 
    justifyContent: 'space-between',
  },
  imageColumn: {
    margin: 5,
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
    
  },
  // same as image row
  columnContainer: {
    justifyContent: 'space-between',
    margin: 5,
  },
  
});

export default styles;