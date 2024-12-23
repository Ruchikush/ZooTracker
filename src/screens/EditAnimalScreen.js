import React, {useState} from 'react'; // Import React and useState hook for managing local component state
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
import {useDispatch} from 'react-redux'; // Import useDispatch to dispatch actions to Redux store
import {editAnimal} from '../redux/animalSlice'; // Import the editAnimal action from the Redux slice to modify animal details
import {launchImageLibrary} from 'react-native-image-picker'; // Import Image Picker for selecting images from the device

export default function EditAnimalScreen({route, navigation}) {
  const {animal} = route.params; // Get the animal details passed through navigation params
  const [name, setName] = useState(animal.name); // Initialize state for animal name
  const [breed, setBreed] = useState(animal.breed); // Initialize state for animal breed
  const [description, setDescription] = useState(animal.description); // Initialize state for animal description
  const [images, setImages] = useState(animal.images || []); // Initialize state for images with default value from animal or empty array

  const dispatch = useDispatch(); // Initialize dispatch function to send actions to Redux store

  // Function to handle adding new images
  const handleAddImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo', // Only allow photos
      selectionLimit: 0, // Allow multiple images to be selected
    });

    if (result.assets) {
      setImages([...images, ...result.assets.map(asset => asset.uri)]); // Add selected images to state
    }
  };

  // Function to handle removing an image from the selected list
  const handleRemoveImage = index => {
    const updatedImages = images.filter((_, idx) => idx !== index); // Filter out the image at the given index
    setImages(updatedImages); // Update the state with the remaining images
  };

  // Function to handle saving the edited animal details
  const handleEditAnimal = () => {
    if (!name || !breed || !description) {
      alert('Please fill in all fields.'); // Alert if any fields are empty
    } else if (images.length === 0) {
      alert('Please add at least one image.'); // Alert if no image is selected
    } else {
      dispatch(
        editAnimal({
          id: animal.id, // Pass the animal ID for editing
          name, // Updated name
          breed, // Updated breed
          description, // Updated description
          images, // Updated images list
        }),
      );
      navigation.goBack(); // Navigate back to the previous screen (AnimalListScreen)
    }
  };

  return (
    <View style={styles.container}>
      {/* Input field for animal name */}
      <TextInput
        style={styles.input}
        placeholder="Animal Name"
        value={name} // Bind state value to the TextInput
        onChangeText={setName} // Update state value on text input change
      />

      {/* Input field for animal breed */}
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed} // Bind state value to the TextInput
        onChangeText={setBreed} // Update state value on text input change
      />

      {/* Input field for animal description */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description} // Bind state value to the TextInput
        onChangeText={setDescription} // Update state value on text input change
      />

      {/* FlatList to display selected images */}
      <FlatList
        data={images} // Pass images state to the FlatList
        keyExtractor={(item, index) => index.toString()} // Set key extractor to unique index
        horizontal // Display images in horizontal scrolling mode
        renderItem={({item, index}) => (
          <View style={styles.imageContainer}>
            <Image source={{uri: item}} style={styles.image} />
            {/* Render each image */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveImage(index)} // Remove image on press
            >
              <Text style={styles.removeButtonText}>X</Text>
              {/* Remove button text */}
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Button to add new images */}
      <TouchableOpacity style={styles.button1} onPress={handleAddImage}>
        <Text style={styles.buttonText}>Add New Image</Text>
      </TouchableOpacity>

      {/* Button to save the changes to the animal */}
      <TouchableOpacity style={styles.button} onPress={handleEditAnimal}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full screen height
    padding: 16, // Add padding around the container
    backgroundColor: '#fff', // Set background color to white
  },
  button1: {
    backgroundColor: '#1e90ff', // Blue background for the "Add New Image" button
    padding: 12, // Add padding inside the button
    borderRadius: 8, // Make the button's corners rounded
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    shadowColor: '#000', // Shadow color for the button
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Shadow elevation for Android
    marginTop: 10, // Margin at the top
  },
  button: {
    backgroundColor: '#4CAF50', // Green background for the "Save Changes" button
    padding: 12, // Add padding inside the button
    borderRadius: 8, // Make the button's corners rounded
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    shadowColor: '#000', // Shadow color for the button
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Shadow elevation for Android
    marginTop: 10, // Margin at the top
  },
  buttonText: {
    color: '#fff', // White text color for the button text
    fontSize: 16, // Font size for the button text
    fontWeight: 'bold', // Bold button text
  },
  input: {
    borderWidth: 1, // Set border width
    borderColor: '#ccc', // Set border color
    padding: 8, // Add padding inside the input
    marginVertical: 8, // Vertical margin between inputs
    borderRadius: 4, // Rounded corners for the input fields
  },
  imageContainer: {
    marginRight: 10, // Right margin between images
    position: 'relative', // Positioning for the remove button
    marginTop: 10, // Margin from the top
    marginLeft: 5, // Left margin for images
  },
  image: {
    width: 100, // Set image width
    height: 100, // Set image height
    borderRadius: 8, // Rounded corners for images
  },
  removeButton: {
    position: 'absolute', // Position remove button at the top-right of the image
    top: 0,
    right: 0,
    backgroundColor: 'red', // Red background for remove button
    borderRadius: 10, // Rounded corners for the button
    padding: 5, // Padding inside the button
  },
  removeButtonText: {
    color: '#fff', // White text color for the remove button
    fontWeight: 'bold', // Bold text for the button
  },
});
