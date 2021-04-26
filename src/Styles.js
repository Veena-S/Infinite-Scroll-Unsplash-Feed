import { StyleSheet } from 'react-native';

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
    width: 200,
    height: 200,
  },
  imageRow: { 
    justifyContent: 'space-between',
  },
  imageColumn: {
    margin: 5,
  },
  // same as image row
  columnContainer: {
    justifyContent: 'space-between',
    margin: 5,
  }
});

export default styles;