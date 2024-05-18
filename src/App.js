import React from "react";
import Counter from "./features/counter/Counter";
import "./App.css";
import ProductList from "./features/product-list/components/ProductList";
import Home from "./features/pages/Home";
import Login from "./features/auth/components/Login";
import SignUp from "./features/auth/components/Signup";
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Cart from "./features/cart/cart";
import CartPage from "./features/pages/CartPage";
import CheckOutPage from "./features/pages/CheckOutPage";
import ProductDetails from "./features/product-list/components/ProductDetails";
import ProductDetailPage from "./features/pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./features/pages/404";
import OrderSuccessPage from "./features/pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrders";
import UserOrdersPage from "./features/pages/UserOrdersPage";
import UserProfile from "./features/user/components/UserProfile";
import UserProfilePage from "./features/pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/UserSlice";
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './features/pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './features/pages/AdminHome.jsx';
import AdminProductDetailPage from './features/pages/AdminProductDetailPage';
import AdminProductFormPage from './features/pages/AdminProductFormPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckOutPage></CheckOutPage>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/orders",
    element: <UserOrdersPage></UserOrdersPage>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user]);

  return (
    <>
    <div className="App">
      <RouterProvider router={router} />
      {/* Link must be inside the Provider */}
    </div>
  </>
  );
}

export default App;
