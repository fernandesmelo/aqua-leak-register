import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLeakScreen from './screens/HomeScreen';
import AddLeakScreen from './screens/AddLeakScreen';
import MapScreen from './screens/MapScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import LeakDetailScreen from './screens/LeakDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeLeakScreen} />
          <Stack.Screen name="Registrar Vazamento" component={AddLeakScreen} />
          <Stack.Screen name="Mapa" component={MapScreen} />
          <Stack.Screen name='Detalhes' component={LeakDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}