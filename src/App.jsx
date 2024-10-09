import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

// Pages
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Account, { loader as accountLoader } from "./pages/account/Account";
import NotFound from "./pages/not-found/NotFound";

// Css Main Style Sheet
import "./App.css";

import { useSelector } from "react-redux";

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="account"
          element={<Account />}
          loader={() => accountLoader(isAuthenticated)}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
