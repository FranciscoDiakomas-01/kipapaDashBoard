import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main/index.jsx';
import Product from './pages/Product/index.jsx';
import User from './pages/User/index.jsx';
import Category from './pages/Category/index.jsx';
import Clients from './pages/Clients/index.jsx';
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
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>
);
