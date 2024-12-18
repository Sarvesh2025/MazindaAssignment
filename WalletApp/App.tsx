import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/store';
import LoginScreen from './src/screens/LoginScreen';
import WalletScreen from './src/screens/WalletScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import TransactionHistoryScreen from './src/screens/HistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
          <Stack.Screen name="History" component={TransactionHistoryScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
