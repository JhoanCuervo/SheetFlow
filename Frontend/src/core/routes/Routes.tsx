
import type { RouteObject } from "react-router";

import MainLayout from "../layout/Layout";
import ErrorBoundary from "../layout/ErrorBoundary";
import Index from "../../pages/Dashboard/Index";
import Products from "../../pages/Products/Index";

const Routes: RouteObject[] = [
  {
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/products", element: <Products /> },
    ],
  },
];

export default Routes;
