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

// Css Main Style Sheet
import "./App.css";
import NotFound from "./pages/not-found/NotFound";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="sign-up" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
