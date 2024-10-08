import { Alert, Box, Stack } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppleIcon from "@mui/icons-material/Apple";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./home.css";
import { useState } from "react";
import Benefits from "../../components/Benefits";
import ScrollToTopButton from "../../components/ScrollToTopButton";

export default function Home() {
  const { redirectState } = useSelector((state) => state.auth);
  const smallScreens = useMediaQuery("(max-width:1150px)");

  const [open, setOpen] = useState(false);

  const arrayOfLinks = [
    {
      name: "Woman’s Fashion",
      path: "/women",
      icon: <KeyboardArrowRightOutlinedIcon />,
    },
    {
      name: "Men’s Fashion",
      path: "/men",
      icon: <KeyboardArrowRightOutlinedIcon />,
    },
    {
      name: "Electronics",
      path: "/electronics",
    },
    {
      name: "Home & Lifestyle",
      path: "/home-and-lifestyle",
    },
    {
      name: "Medicine",
      path: "/medicine",
    },
    {
      name: "Sports & Outdoor",
      path: "/sports-and-outdoor",
    },
    {
      name: "Baby’s & Toys",
      path: "/baby-s-and-toys",
    },
    {
      name: "Groceries & Pets",
      path: "/groceries-and-pets",
    },
    {
      name: "Health & Beauty",
      path: "/health-and-beauty",
    },
  ];

  const ladningLinks = arrayOfLinks.map((link) => {
    return (
      <Link to={link.path} key={link.name}>
        <Box className="landing-links">
          {link.name} {link.icon}
        </Box>
      </Link>
    );
  });

  return (
    <main>
      {redirectState.state && (
        <Stack
          className="alert"
          sx={{ width: "100%", margin: "0 auto" }}
          spacing={2}
        >
          <Alert
            sx={{ fontSize: "0.9rem", fontWeight: "600" }}
            variant="standard"
            severity="success"
          >
            {redirectState.type === "sign-up"
              ? "Account Created Successfully !"
              : "Welcome Back To eCommerce"}
          </Alert>
        </Stack>
      )}

      <section className="landing">
        <div className={open ? "landing-left-side open" : "landing-left-side"}>
          {smallScreens && (
            <ArrowOutwardIcon
              className="open-menu-home"
              onClick={() => setOpen((prev) => !prev)}
              sx={{
                transform: open ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "0.5s",
              }}
            />
          )}
          {ladningLinks}
        </div>

        <div
          className={open ? "landing-right-side close" : "landing-right-side"}
        >
          <Box className="container-landing">
            <Stack gap={1} sx={{ zIndex: "85" }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={2}
                sx={{ color: "white" }}
              >
                <AppleIcon className="apple" />
                <p>iPhone 14 Series</p>
              </Stack>

              <h1>
                Up to 10%
                <br /> off Voucher
              </h1>

              <Link
                to="/"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <h4 className="shop-now">Shop Now</h4>
                <ArrowForwardIcon className="arrow" />
              </Link>
            </Stack>

            <div className="iphone-img">
              <img src="../images/landing.png" alt="iphone pic" />
            </div>
          </Box>

          <Stack
            className="dots landing"
            direction={"row"}
            justifyContent={"center"}
            gap={2}
            sx={{ margin: "0 auto" }}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Stack>
        </div>
      </section>

      <Benefits />
      <ScrollToTopButton />
    </main>
  );
}
