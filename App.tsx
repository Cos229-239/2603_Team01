import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import JournalEntryScreen from './src/screens/JournalEntryScreen';
import MoodScreen from './src/screens/MoodScreen';
import RubberDuckScreen from './src/screens/RubberDuckScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const JournalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="JournalList" component={JournalScreen} options={{ title: 'My Journal' }} />
      <Stack.Screen name="JournalEntry" component={JournalEntryScreen} options={{ title: 'New Entry' }} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#007AFF', headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Journal" component={JournalStack} />
      <Tab.Screen name="Mood" component={MoodScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Rubber Duck" component={RubberDuckScreen} options={{ headerShown: true }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
