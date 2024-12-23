import React, {useState} from 'react'; // Import React and useState hook for state management
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'; // Import React Native components
import {useDispatch} from 'react-redux'; // Import useDispatch hook to dispatch actions
import {addAnimal} from '../redux/animalSlice'; // Import addAnimal action to dispatch
import {launchImageLibrary} from 'react-native-image-picker'; // Import image picker for selecting images

export default function AddAnimalScreen({navigation}) {
  const [name, setName] = useState(''); // State to store animal name
  const [breed, setBreed] = useState(''); // State to store animal breed
  const [description, setDescription] = useState(''); // State to store animal description
  const [images, setImages] = useState([]); // State to store selected images

  const dispatch = useDispatch(); // Initialize useDispatch to dispatch actions

  // Function to handle image selection from the gallery
  const handleAddImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0, // Allow multiple images to be selected
    });

    if (result.assets) {
      setImages([...images, ...result.assets.map(asset => asset.uri)]); // Add selected images to the state
    }
  };

  // Function to remove an image from the list
  const handleRemoveImage = index => {
    const updatedImages = images.filter((_, idx) => idx !== index); // Remove image at the specified index
    setImages(updatedImages); // Update the images state
  };

  // Function to handle adding the new animal
  const handleAddAnimal = () => {
    if (!name || !breed || !description) {
      alert('Please fill in all fields.'); // Alert if any field is missing
    } else if (images.length === 0) {
      alert('Please add at least one image.'); // Alert if no image is selected
    } else {
      dispatch(
        addAnimal({
          id: Date.now().toString(), // Generate a unique ID for the animal
          name,
          breed,
          description,
          images,
        }),
      );
      navigation.goBack(); // Navigate back to the AnimalListScreen
    }
  };
  return (
    <View style={styles.container}>
      {/* Input fields for animal details */}
      <TextInput
        style={styles.input}
        placeholder="Animal Name"
        value={name}
        onChangeText={setName} // Update name state on change
      />
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed} // Update breed state on change
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription} // Update description state on change
      />
      {/* FlatList to display selected images */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()} // Set key for each image
        horizontal
        renderItem={({item, index}) => (
          <View style={styles.imageContainer}>
            <Image source={{uri: item}} style={styles.image} />
            {/* Display image */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveImage(index)} // Remove image on press
            >
              <Text style={styles.removeButtonText}>X</Text>
              {/* Remove button */}
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Buttons for adding image and submitting the form */}
      <TouchableOpacity style={styles.button1} onPress={handleAddImage}>
        <Text style={styles.buttonText}>Add Image</Text>
        {/* Button to add image */}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddAnimal}>
        <Text style={styles.buttonText}>Add Animal</Text>
        {/* Button to add animal */}
      </TouchableOpacity>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  button1: {
    backgroundColor: '#1e90ff', // Style for the add image button
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50', // Style for the add animal button
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', // White text for buttons
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  imageContainer: {
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
