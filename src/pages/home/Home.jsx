import { Alert, Box, Stack } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppleIcon from "@mui/icons-material/Apple";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useSelector, useDispatch } from "react-redux";
import { addProducts } from "../../store/productSlice";
import { Link } from "react-router-dom";

import { useState } from "react";
import Benefits from "../../components/Benefits";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import "./home.css";

export default function Home() {
  const { redirectState } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const smallScreens = useMediaQuery("(max-width:1150px)");

  const dispatch = useDispatch();

  useState(() => {
    dispatch(addProducts());
  }, [dispatch]);

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

  // Get A Single Product
  const singleProduct = () => {
    return (
      <div key={products?.product?.id}>
        <img src={products?.product?.image} />
      </div>
    );
  };

  const renderedProducts = products?.products?.map((product) => {
    return (
      <div key={product.id} className="product">
        <div style={{ width: "200px", display: "flex" }}>
          <img
            style={{ maxWidth: "100%" }}
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </div>
        <h2>{product.name}</h2>
        <p>${product.price}</p>
        <Link to={`/product/${product.id}`}>View Product</Link>
      </div>
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

      <section
        className="products"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {renderedProducts}
        {singleProduct()}
      </section>

      <Benefits />
      <ScrollToTopButton />
    </main>
  );
}
