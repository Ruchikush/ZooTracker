import React from 'react';
import {View, Text, Image, Button, StyleSheet, FlatList} from 'react-native';

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
        <Text style={styles.name}>{animal.name}</Text>
        <Text style={styles.breed}>{animal.breed}</Text>
        <Text style={styles.description}>{animal.description}</Text>
        <View style={styles.actions}>
          <Button title="Edit" onPress={onEdit} />
          <Button title="Delete" color="red" onPress={onDelete} />
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
