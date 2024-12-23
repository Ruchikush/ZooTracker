import React from 'react'; // Import React
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'; // Import necessary React Native components
import {useSelector, useDispatch} from 'react-redux'; // Import Redux hooks for accessing and dispatching state
import AnimalCard from '../components/AnimalCard'; // Import custom AnimalCard component for displaying individual animals
import {removeAnimal} from '../redux/animalSlice'; // Import the removeAnimal action to dispatch

export default function AnimalListScreen({navigation}) {
  const animals = useSelector(state => state.animals); // Access the list of animals from Redux store using useSelector hook
  const dispatch = useDispatch(); // Initialize dispatch function to send actions to Redux store

  // Function to handle navigation to the EditAnimal screen with the selected animal data
  const handleEdit = animal => {
    navigation.navigate('EditAnimal', {animal}); // Pass the selected animal to the EditAnimal screen
  };

  // Function to handle deleting an animal by its ID
  const handleDelete = id => {
    dispatch(removeAnimal(id)); // Dispatch the removeAnimal action to remove the animal from the Redux store
  };

  return (
    <View style={styles.container}>
      {/* Add Animal Button */}
      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('AddAnimal')}>
        {/* Navigate to AddAnimal screen */}
        <Text style={styles.buttonText}>Add Animal</Text>
        {/* Display button text */}
      </TouchableOpacity>

      {/* List of Animals */}
      <FlatList
        data={animals} // Data passed to the FlatList to render animal items
        keyExtractor={item => item.id} // Key extractor to uniquely identify each animal by its ID
        renderItem={({item}) => (
          <AnimalCard
            animal={item} // Pass individual animal data to AnimalCard component
            onEdit={() => handleEdit(item)} // Function to edit the animal when the edit button is pressed
            onDelete={() => handleDelete(item.id)} // Function to delete the animal when the delete button is pressed
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up all available space
    padding: 16, // Adds padding inside the container
    backgroundColor: '#f5f5f5', // Set background color to light gray
  },
  button1: {
    backgroundColor: '#1e90ff', // Set button background color to blue
    padding: 12, // Adds padding inside the button
    borderRadius: 8, // Makes the button's corners rounded
    alignItems: 'center', // Centers the text horizontally
    justifyContent: 'center', // Centers the text vertically
    shadowColor: '#000', // Sets the shadow color for the button
    shadowOffset: {width: 0, height: 2}, // Sets the shadow offset
    shadowOpacity: 0.25, // Sets the shadow opacity
    shadowRadius: 3.84, // Sets the shadow radius
    elevation: 5, // Adds shadow for Android devices
    marginTop: 10, // Adds top margin to the button
  },
  buttonText: {
    color: '#fff', // Set button text color to white
    fontSize: 16, // Set font size for the button text
    fontWeight: 'bold', // Make the button text bold
  },
});
