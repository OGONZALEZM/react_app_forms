import React from 'react';
import { StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './screens/navigation/AppNavigator';
import store from './store/store';
import 'react-native-get-random-values';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
