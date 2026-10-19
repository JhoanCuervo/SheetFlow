
import type { RouteObject } from "react-router";

import MainLayout from "../layout/Layout";
import ErrorBoundary from "../layout/ErrorBoundary";
import Index from "../../pages/Dashboard/Index";

const Routes: RouteObject[] = [
  {
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <Index /> },
    ],
  },
];

export default Routes;
