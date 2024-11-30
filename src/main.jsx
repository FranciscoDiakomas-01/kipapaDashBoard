import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx';
import 'react-toastify/ReactToastify.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main/index.jsx';
import Product from './pages/Product/index.jsx';
import User from './pages/User/index.jsx';
import Category from './pages/Category/index.jsx';
import Clients from './pages/Clients/index.jsx';
import Orders from './pages/Orders/index.jsx';
import Pay from './pages/Pay/index.jsx';
import Acount from './pages/Acount/index.jsx';
import Login from './pages/Login/index.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/users",
        element: <User />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/acount",
        element: <Acount />,
      },
      {
        path: "/pay",
        element: <Pay />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>
);
