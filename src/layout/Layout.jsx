import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
