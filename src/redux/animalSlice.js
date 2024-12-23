import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addAnimal: (state, action) => {
      state.push(action.payload);
    },
    removeAnimal: (state, action) => {
      return state.filter(animal => animal.id !== action.payload);
    },
    editAnimal: (state, action) => {
      const index = state.findIndex(animal => animal.id === action.payload.id);
      if (index !== -1) {
        state[index] = {...state[index], ...action.payload}; 
      }
    },
  },
});

export const {addAnimal, removeAnimal, editAnimal} = animalSlice.actions;

export default animalSlice.reducer;
