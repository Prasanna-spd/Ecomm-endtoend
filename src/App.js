import React from 'react';
import  Counter  from './features/counter/Counter';
import './App.css';
import ProductList from './features/product-list/Product-list';
import Home from './features/pages/Home';
import Login from './features/auth/components/Login';
import SignUp from './features/auth/components/Signup';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from './features/cart/cart';
import CartPage from './features/pages/CartPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
  {
    path: "/cart",
    element: <CartPage/>,
  },
]);

function App() {
  
  return (
  <>
    <div className='App'>
    <RouterProvider router={router} />
    </div>
  </>
  );
}

export default App;
