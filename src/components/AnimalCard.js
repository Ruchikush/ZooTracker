import React from 'react';
// Import necessary components from react-native for building the UI
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

// Define the AnimalCard component
// Props:
// - animal: an object containing details about the animal (name, breed, description, images)
// - onEdit: a callback function triggered when the Edit button is pressed
// - onDelete: a callback function triggered when the Delete button is pressed
export default function AnimalCard({animal, onEdit, onDelete}) {
  return (
    <View style={styles.card}>
      {/* Display a horizontal scrollable list of animal images */}
      <FlatList
        data={animal.images} // Array of image URIs
        keyExtractor={(item, index) => index.toString()} // Unique key for each image
        horizontal // Enables horizontal scrolling
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.image} /> // Render each image
        )}
      />
      <View style={styles.details}>
        {/* Display animal details: name, breed, and description */}
        <Text style={styles.name}>Name : {animal.name}</Text>
        <Text style={styles.name}>Breed : {animal.breed}</Text>
        <Text style={styles.name}>Description : {animal.description}</Text>
        <View style={styles.actions}>
          {/* Button to trigger the onEdit callback */}
          <TouchableOpacity style={styles.button1} onPress={onEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          {/* Button to trigger the onDelete callback */}
          <TouchableOpacity style={styles.button} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Define styles for the AnimalCard component
const styles = StyleSheet.create({
  card: {
    flexDirection: 'column', // Layout elements vertically
    marginVertical: 8, // Vertical margin between cards
    backgroundColor: '#fff', // White card background
    borderRadius: 8, // Rounded corners
    elevation: 3, // Shadow elevation for Android
    overflow: 'hidden', // Clip content outside the card boundaries
    padding: 10, // Padding inside the card
  },
  button1: {
    width: '30%', // Button width as a percentage of the container
    backgroundColor: '#1e90ff', // Blue background for Edit button
    padding: 12, // Padding inside the button
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Center-align text horizontally
    justifyContent: 'center', // Center-align text vertically
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5, // Android shadow
    marginTop: 10, // Top margin
  },
  button: {
    width: '30%', // Button width as a percentage of the container
    backgroundColor: 'red', // Red background for Delete button
    padding: 12, // Padding inside the button
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Center-align text horizontally
    justifyContent: 'center', // Center-align text vertically
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5, // Android shadow
    marginTop: 10, // Top margin
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold font style
  },
  image: {
    width: 100, // Image width
    height: 100, // Image height
    marginRight: 10, // Space between images
  },
  details: {
    padding: 10, // Padding inside the details container
  },
  name: {
    fontSize: 18, // Font size for name
    fontWeight: 'bold', // Bold font style
  },
  breed: {
    fontSize: 14, // Font size for breed
    color: '#555', // Grey color for breed text
  },
  description: {
    fontSize: 12, // Font size for description
    color: '#777', // Lighter grey color for description text
    marginVertical: 4, // Vertical margin
  },
  actions: {
    flexDirection: 'row', // Layout buttons horizontally
    justifyContent: 'space-between', // Space out buttons equally
    marginTop: 8, // Top margin
  },
});
