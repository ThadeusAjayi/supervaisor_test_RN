import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    backgroundColor: '#f8f8f8',
    flex: 1,
    paddingHorizontal: 20,
  },
  listItemParent: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,

elevation: 10,
  },
});
