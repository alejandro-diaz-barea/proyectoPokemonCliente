import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router';
import UserProvider from './context/userContext';
import {router} from "./router/index"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </UserProvider>
  </React.StrictMode>
);
