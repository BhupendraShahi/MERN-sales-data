import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './page/Home';

function App() {
  return (
    <Provider store={store}>
      <div className="bg-gray-100 min-h-screen p-8">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
