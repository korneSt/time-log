import { RouteObject, RouterProvider, createBrowserRouter } from "react-router";
import routes from "./Routes.consts";
import HomePage from "../../pages/HomePage";
import { Suspense } from "react";
import Layout from "../../components/Layout";
import MyTimeLog from "../../pages/MyTimeLog/MyTimeLog";

const appRoutes: RouteObject[] = [
  { index: true, path: "/", element: <HomePage /> },
  {
    path: routes.myTimeLog,
    element: <MyTimeLog />,
  },
];

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: appRoutes,
  },
]);

const RoutesComponent = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default RoutesComponent;
