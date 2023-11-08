import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './components/router/Router';
import { Provider } from 'react-redux';
import { store } from './store';
import './config/axios';

function App() {
  return <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>;
}

export default App;
