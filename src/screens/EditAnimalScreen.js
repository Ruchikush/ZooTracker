import React, {useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {editAnimal} from '../redux/animalSlice';
import {launchImageLibrary} from 'react-native-image-picker';

export default function EditAnimalScreen({route, navigation}) {
  const {animal} = route.params; // Get animal details from route parameters
  const [name, setName] = useState(animal.name);
  const [breed, setBreed] = useState(animal.breed);
  const [description, setDescription] = useState(animal.description);
  const [images, setImages] = useState(animal.images || []); // Keep previously added images

  const dispatch = useDispatch();

  // Handle image selection
  const handleAddImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0, // Allow multiple images
    });

    if (result.assets) {
      setImages([...images, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const handleRemoveImage = index => {
    const updatedImages = images.filter((_, idx) => idx !== index);
    setImages(updatedImages);
  };

  const handleEditAnimal = () => {
    if (name && breed && description) {
      dispatch(
        editAnimal({
          id: animal.id,
          name,
          breed,
          description,
          images,
        }),
      );
      navigation.goBack(); // Navigate back to the AnimalListScreen
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Animal Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({item, index}) => (
          <View style={styles.imageContainer}>
            <Image source={{uri: item}} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveImage(index)}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* <Button title="Add New Image" onPress={handleAddImage} /> */}
      <TouchableOpacity style={styles.button1} onPress={handleAddImage}>
        <Text style={styles.buttonText}>Add New Image</Text>
      </TouchableOpacity>
      {/* <Button title="Save Changes" color="#4CAF50" onPress={handleEditAnimal} /> */}
      <TouchableOpacity style={styles.button} onPress={handleEditAnimal}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  button1: {
    backgroundColor: '#1e90ff', // Green background
    padding: 12, // Padding inside the button
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // For Android shadow
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50', // Green background
    padding: 12, // Padding inside the button
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // For Android shadow
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
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
    // backgroundColor: 'blue',
    marginTop: 10,
    marginLeft: 5,
  },
  AddnewImage: {
    backgroundColor: 'green',
    marginBottom: 10,
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
