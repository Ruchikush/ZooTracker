import React from 'react';

// Import Provider from react-redux to connect React with the Redux store
import {Provider} from 'react-redux';

// Import PersistGate from redux-persist for handling persistent Redux states
import {PersistGate} from 'redux-persist/integration/react';

// Import the Redux store and persistor for managing app-wide state
import store, {persistor} from './src/redux/store';

// Import the main navigation component for managing app navigation
import Navigation from './src/navigation/Navigation';

// Define the main App component
export default function App() {
  return (
    // Wrap the application with the Provider to make the Redux store available to all components
    <Provider store={store}>
      {/* Wrap the application with PersistGate to ensure persisted state is loaded before rendering the app */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Render the Navigation component to manage screen navigation */}
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
