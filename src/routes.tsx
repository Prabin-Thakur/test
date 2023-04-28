import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from "./views/NavBar/NavBar";
import Login from "./views/Login/Login";
import { Navigate } from "react-router-dom";
import DashBoard from "./views/DashBoard/DashBoard";

const RootLayout = () => {
  return (
    <div className="app">
      <NavBar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/login"
        element={
          localStorage.getItem("loggedIn") === "true" ? (
            <Navigate to="/" />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          localStorage.getItem("loggedIn") === "true" ? (
            <DashBoard />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<h1>404 not found</h1>} />
    </Route>
  )
);

export { router };
