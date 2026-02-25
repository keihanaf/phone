import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomeScreenPage from "../features/HomeScreen/pages/HomeScreenPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreenPage />,
      },
    ],
  },
]);

export default router;
