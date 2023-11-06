import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './components/router/Router';
import './config/axios';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
