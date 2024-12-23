import React from 'react';
import {View, FlatList, StyleSheet, Button} from 'react-native';
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
      <Button
        title="Add Animal"
        onPress={() => navigation.navigate('AddAnimal')} // Navigate to AddAnimal screen
      />

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
});
