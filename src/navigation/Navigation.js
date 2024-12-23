import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AnimalListScreen from '../screens/AnimalListScreen'; // Screen displaying the list of animals
import AddAnimalScreen from '../screens/AddAnimalScreen'; // Screen for adding a new animal
import EditAnimalScreen from '../screens/EditAnimalScreen'; // Screen for editing an existing animal

const Stack = createStackNavigator(); // Create a stack navigator for screen navigation

export default function Navigation() {
  return (
    <NavigationContainer>
      {/* Define the navigation stack */}
      <Stack.Navigator initialRouteName="AnimalList">
        {/* Set initial screen */}
        <Stack.Screen name="AnimalList" component={AnimalListScreen} />
        {/* List screen */}
        <Stack.Screen name="AddAnimal" component={AddAnimalScreen} />
        {/* Add screen */}
        <Stack.Screen name="EditAnimal" component={EditAnimalScreen} />
        {/* Edit screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
