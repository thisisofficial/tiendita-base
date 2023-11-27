import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    button:{
      justifyContent: 'center',
      margin:5
    },
  
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 8,
      overflow: 'hidden'
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    addButton: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    scroll:{
      maxHeight: '50%',
      margin: 10
    },
  
    listitem:{
      margin: 1,
      borderWidth:1,
      backgroundColor:'mint cream',
      borderColor: 'silver',
      borderRadius: 5,
      padding: 3,
      paddingHorizontal: 7
    },

    image:{
        margin:10,
    }
  });