import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signup';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn /> ,
    },
    {
        path:"/signup",
        element:<SignUp />
    },{
        path:"/main",
        element:<App />
    }
  ]);
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );