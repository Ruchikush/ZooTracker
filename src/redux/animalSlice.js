import {createSlice} from '@reduxjs/toolkit';

// Initial state for the animal list
const initialState = [];

const animalSlice = createSlice({
  name: 'animals', // Slice name
  initialState, // Initial state of the slice
  reducers: {
    // Reducer to add a new animal
    addAnimal: (state, action) => {
      state.push(action.payload); // Add the new animal to the state array
    },
    // Reducer to remove an animal by ID
    removeAnimal: (state, action) => {
      return state.filter(animal => animal.id !== action.payload); // Filter out the animal with the matching ID
    },
    // Reducer to edit an animal's details
    editAnimal: (state, action) => {
      const index = state.findIndex(animal => animal.id === action.payload.id); // Find the index of the animal to edit
      if (index !== -1) {
        state[index] = {...state[index], ...action.payload}; // Update the animal's properties
      }
    },
  },
});

// Export actions for dispatching
export const {addAnimal, removeAnimal, editAnimal} = animalSlice.actions;

// Export the reducer to configure the store
export default animalSlice.reducer;
