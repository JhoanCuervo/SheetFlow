
import type { RouteObject } from "react-router";

import MainLayout from "../layout/Layout";
import ErrorBoundary from "../layout/ErrorBoundary";
import Index from "../../pages/Dashboard/Index";
import Products from "../../pages/Products/Index";
import Categories from "../../pages/Categories/Index";

const Routes: RouteObject[] = [
  {
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <Categories /> },
    ],
  },
];

export default Routes;
