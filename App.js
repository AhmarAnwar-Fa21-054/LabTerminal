import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import MainApp from './MainApp';

export default function App() {
  return (
    <Provider store={store}>
      <MainApp/>
    </Provider>
  );
}

