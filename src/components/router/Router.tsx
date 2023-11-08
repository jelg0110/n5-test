import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import CartComponent from '../views/Cart';
import Error from '../views/Error';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cart",
        element: <CartComponent />,
      }
    ]
  },
]);

export default router;