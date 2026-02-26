import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import HomeScreenPage from "@/features/HomeScreen/pages/HomeScreenPage.jsx";

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
