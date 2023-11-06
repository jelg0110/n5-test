import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import Error from '../views/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
]);

export default router;