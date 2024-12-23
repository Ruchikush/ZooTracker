// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   Button,
//   Image,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import {useDispatch} from 'react-redux';
// import {addAnimal} from '../redux/animalSlice';
// import {nanoid} from '@reduxjs/toolkit';
// import * as ImagePicker from 'react-native-image-picker';

// export default function AddAnimalScreen({navigation}) {
//   const [name, setName] = useState('');
//   const [breed, setBreed] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);
//   const dispatch = useDispatch();

//   const handleAddAnimal = () => {
//     if (name && breed && description && images.length > 0) {
//       dispatch(
//         addAnimal({
//           id: nanoid(),
//           name,
//           breed,
//           description,
//           images,
//         }),
//       );
//       navigation.goBack();
//     } else {
//       alert('Please fill in all fields and add at least one image.');
//     }
//   };

//   const handlePickImage = () => {
//     ImagePicker.launchImageLibrary(
//       {mediaType: 'photo', selectionLimit: 0},
//       response => {
//         if (response.assets) {
//           setImages([...images, ...response.assets.map(asset => asset.uri)]);
//         }
//       },
//     );
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Animal Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Breed"
//         value={breed}
//         onChangeText={setBreed}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//       />
//       <Button title="Pick Images" onPress={handlePickImage} />
//       <ScrollView horizontal>
//         {images.map((uri, index) => (
//           <Image key={index} source={{uri}} style={styles.image} />
//         ))}
//       </ScrollView>
//       <Button title="Add Animal" onPress={handleAddAnimal} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     marginVertical: 8,
//     borderRadius: 4,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginRight: 8,
//   },
// });

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
import {addAnimal} from '../redux/animalSlice';
import {launchImageLibrary} from 'react-native-image-picker';

export default function AddAnimalScreen({navigation}) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); // Store selected images

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

  // Handle removing an image
  const handleRemoveImage = index => {
    const updatedImages = images.filter((_, idx) => idx !== index);
    setImages(updatedImages);
  };

  // Handle adding a new animal
  const handleAddAnimal = () => {
    if (name && breed && description) {
      dispatch(
        addAnimal({
          id: Date.now().toString(),
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
      <Button title="Add Image" onPress={handleAddImage} />
      <Button title="Add Animal" onPress={handleAddAnimal} />
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
