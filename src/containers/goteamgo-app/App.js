import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import GoAccess from './app/screens/GoAccess';
import GoLogin from './app/screens/GoLogin';
import GoButton from './app/components/GoButton';
import GoButtonOutlined from './app/components/GoButtonOutlined';

export default function App() {

  return (
    <View style={styles.container}>
      <GoLogin />
    </View>
  );

}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 15,
    width: 295,
    height: 61,
    backgroundColor: "#79BFFF",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSpace: {
    paddingBottom: 10,

  }
});
