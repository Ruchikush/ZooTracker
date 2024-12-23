import {configureStore} from '@reduxjs/toolkit'; // Import the configureStore function from Redux Toolkit
import animalReducer from './animalSlice'; // Import the reducer for animal data from animalSlice
import {persistReducer, persistStore} from 'redux-persist'; // Import functions for persisting the Redux store
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local storage in React Native
import {combineReducers} from 'redux'; // Import combineReducers to combine multiple reducers

// (Optional) Code to clear AsyncStorage - commented out for now
// const clearAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear(); // Clear all stored data from AsyncStorage
//     console.log('AsyncStorage cleared successfully!');
//   } catch (error) {
//     console.error('Error clearing AsyncStorage:', error);
//   }
// };

// (Optional) Call the function to clear storage
// clearAsyncStorage();

// Configuring Redux persist with AsyncStorage as the storage mechanism
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage: AsyncStorage, // Use AsyncStorage to persist data
};

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  animals: animalReducer, // Combine animalSlice reducer with the root reducer
});

// Apply the persistReducer to the rootReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persistedReducer
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer to configure the store
});

// Create the persistor to manage the persistence of the Redux store
export const persistor = persistStore(store);

// Export the store as the default export
export default store;
