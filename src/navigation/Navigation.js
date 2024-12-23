import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AnimalListScreen from '../screens/AnimalListScreen';
import AddAnimalScreen from '../screens/AddAnimalScreen';
import EditAnimalScreen from '../screens/EditAnimalScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AnimalList">
        <Stack.Screen name="AnimalList" component={AnimalListScreen} />
        <Stack.Screen name="AddAnimal" component={AddAnimalScreen} />
        <Stack.Screen name="EditAnimal" component={EditAnimalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
