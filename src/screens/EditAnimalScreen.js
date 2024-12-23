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
      <Button title="Add New Image" onPress={handleAddImage} />
      <Button title="Save Changes" onPress={handleEditAnimal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
