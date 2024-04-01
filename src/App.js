import React from 'react';
import  Counter  from './features/counter/Counter';
import './App.css';
import ProductList from './features/product-list/components/ProductList';
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
import CheckOutPage from './features/pages/CheckOutPage';
import ProductDetails from './features/product-list/components/ProductDetails';
import ProductDetailPage from './features/pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
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
    element: <Protected>
    <CartPage></CartPage>
  </Protected>,
  },
  {
    path: "/checkout",
    element: <Protected>
    <CheckOutPage></CheckOutPage>
  </Protected>,
  },
  {
    path: '/product-detail/:id',
    element: <Protected>
    <ProductDetailPage></ProductDetailPage>
  </Protected>,
  },
]);

function App() {
  

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch, user])

  return (
  <>
    <div className='App'>
    <RouterProvider router={router} />
    </div>
  </>
  );
}

export default App;
