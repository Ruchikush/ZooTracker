import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

// A reusable input component with a label and optional multi-line support
export default function FormInput({
  label, // The label text displayed above the input field
  value, // The current value of the input field
  onChangeText, // Callback to handle text changes
  multiline = false, // Optional: determines if the input supports multiple lines
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]} // Apply multiline style if true
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // Space between input fields
  },
  label: {
    fontSize: 14, // Label text size
    fontWeight: 'bold', // Label text bold
    marginBottom: 4, // Space between label and input
  },
  input: {
    borderWidth: 1, // Input border width
    borderColor: '#ccc', // Input border color
    borderRadius: 4, // Rounded corners for the input field
    padding: 8, // Inner padding for the input field
  },
  multiline: {
    height: 80, // Increased height for multi-line input
  },
});
