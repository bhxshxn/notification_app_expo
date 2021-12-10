import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Register from './components/Register';
import Sendnoti from './components/Sendnoti';
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Regsiter" component={Register} />
        <Stack.Screen name="Sendnoti" component={Sendnoti} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


