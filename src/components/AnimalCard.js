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

export default function AnimalCard({animal, onEdit, onDelete}) {
  return (
    <View style={styles.card}>
      <FlatList
        data={animal.images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.image} />
        )}
      />
      <View style={styles.details}>
        <Text style={styles.name}>Name : {animal.name}</Text>
        <Text style={styles.name}>Breed : {animal.breed}</Text>
        <Text style={styles.name}>Description : {animal.description}</Text>
        <View style={styles.actions}>
          {/* <Button title="Edit" onPress={onEdit} /> */}

          <TouchableOpacity style={styles.button1} onPress={onEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          {/* <Button title="Delete" color="red" onPress={onDelete} /> */}

          <TouchableOpacity style={styles.button} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    padding: 10,
  },
  button1: {
    width: '30%',
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
    width: '30%',
    backgroundColor: 'red', // Green background
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
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  details: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  breed: {
    fontSize: 14,
    color: '#555',
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
