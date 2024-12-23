import React from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import AnimalCard from '../components/AnimalCard';
import {removeAnimal} from '../redux/animalSlice';

export default function AnimalListScreen({navigation}) {
  const animals = useSelector(state => state.animals); // Get animal list from Redux store
  const dispatch = useDispatch();

  const handleEdit = animal => {
    navigation.navigate('EditAnimal', {animal}); // Navigate to EditAnimal screen
  };

  const handleDelete = id => {
    dispatch(removeAnimal(id)); // Remove animal by ID
  };

  return (
    <View style={styles.container}>
      {/* Add Animal Button */}
      {/* <Button
        title="Add Animal"
        onPress={() => navigation.navigate('AddAnimal')} // Navigate to AddAnimal screen
      /> */}

      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('AddAnimal')}>
        <Text style={styles.buttonText}>Add Animal</Text>
      </TouchableOpacity>

      {/* List of Animals */}
      <FlatList
        data={animals}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <AnimalCard
            animal={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
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
  buttonText: {
    color: '#fff', // White text
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },
});
