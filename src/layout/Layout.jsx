import { Outlet } from "react-router-dom";
import backgroundImage from "@/assets/images/background.jpeg";
import Header from "@/layout/Header";

function Layout() {
  return (
    <main className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center">
        <div
          className="relative flex justify-center items-center overflow-hidden bg-zinc-900"
          style={{
            width: "280px",
            height: "600px",
            borderRadius: "35px",
            borderWidth: "5px",
            borderColor: "#000000",
            borderStyle: "solid",
            boxShadow: "0px 0px 0px 2px #848484",
          }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <div
            className="relative z-10 flex flex-col items-center"
            style={{ width: "265px", height: "580px", gap: "15px" }}
          >
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Layout;
