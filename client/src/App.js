import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './page/Home';

function App() {
  return (
    <Provider store={store}>
        <Home />
    </Provider>
  );
}

export default App;
