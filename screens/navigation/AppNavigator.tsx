import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../HomeScreen';
import CreatePollScreen from '../poll/CreatePollScreen';
import CreateFormScreen from '../form/CreateFormScreen';
import AnswerPollScreen from '../poll/AnswerPollScreen';
import AnswerFormScreen from '../form/AnswerFormScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreatePoll" options={{ title: 'Poll' }} component={CreatePollScreen} />
        <Stack.Screen name="AnswerPoll" options={{ title: 'Poll' }} component={AnswerPollScreen} />
        <Stack.Screen name="CreateForm" options={{ title: 'Form' }} component={CreateFormScreen} />
        <Stack.Screen name="AnswerForm" options={{ title: 'Form' }} component={AnswerFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;