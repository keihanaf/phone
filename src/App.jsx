import { RouterProvider } from "react-router-dom";
import { router } from "../src/router/index";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
