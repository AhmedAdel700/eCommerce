import { Alert, Box, Button, Stack } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppleIcon from "@mui/icons-material/Apple";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { categories, arrayOfLinks } from "../../fakeData";

import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

import { useSelector, useDispatch } from "react-redux";
import { addProducts, addLimitedProducts } from "../../store/productSlice";
import { Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import Benefits from "../../components/Benefits";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import SliderComp from "../../components/SliderComp";
import "./home.css";

export default function Home() {
  const { redirectState } = useSelector((state) => state.auth);
  const { products, loading, error, limitedProducts } = useSelector(
    (state) => state.products
  );
  const smallScreens = useMediaQuery("(max-width:1150px)");
  const slider = useRef(null);
  const sliderProduct = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addProducts());
    dispatch(addLimitedProducts({ limit: 4, page: 3 }));
  }, [dispatch]);

  const [open, setOpen] = useState(false);

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
  // const singleProduct = () => {
  //   return (
  //     <div key={products?.product?.id}>
  //       <img src={products?.product?.image} />
  //     </div>
  //   );
  // };

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

      {/* Start Of Products Sales Section */}
      <section
        className="products"
        style={{
          maxWidth: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Stack gap={2} direction={"row"} alignItems={"center"}>
          <div className="red"></div>
          <h4 style={{ color: "var(--red-color)", fontWeight: "600" }}>
            Today’s
          </h4>
        </Stack>

        <Stack direction={"row"} className="header-section">
          <Stack className="date-text" direction={"row"}>
            <h2 className="sale">Flash Sales</h2>

            <Stack className="date">
              <Stack direction={"row"} alignItems={"center"} className="days">
                <span className="date-item">
                  Days <span>03</span>
                </span>

                <span className="date-col">:</span>

                <span className="date-item">
                  Hours <span>23</span>
                </span>

                <span className="date-col">:</span>

                <span className="date-item">
                  Minutes <span>19</span>
                </span>

                <span className="date-col">:</span>

                <span className="date-item">
                  Seconds <span>56</span>
                </span>
              </Stack>
            </Stack>
          </Stack>

          <Stack direction={"row"} gap={3} className="slider-btns">
            <Box
              onClick={() => sliderProduct.current.slickPrev()}
              className="prev"
            >
              <WestIcon />
            </Box>
            <Box
              onClick={() => sliderProduct.current.slickNext()}
              className="next"
            >
              <EastIcon />
            </Box>
          </Stack>
        </Stack>

        {/* Render The Slider Data => The Products*/}
        {loading ? (
          <h2 className="loading">Loading ...</h2>
        ) : error ? ( // Check for error
          <h2 className="error">An error occurred: {error}</h2> // Display error message
        ) : (
          <SliderComp
            products={products}
            btn={true}
            slider={sliderProduct}
            likeIcon={true}
          />
        )}

        <Link to={"about"} style={{ margin: "0 auto" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--red-color)",
              textTransform: "capitalize",
              width: "234px",
              height: "56px",
              fontSize: "1rem",
              marginTop: "2rem",
            }}
          >
            View All Products
          </Button>
        </Link>
      </section>

      <hr className="line" />

      {/* Start Of Category Section */}
      <section
        className="products"
        style={{
          maxWidth: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Stack gap={2} direction={"row"} alignItems={"center"}>
          <div className="red"></div>
          <h4 style={{ color: "var(--red-color)", fontWeight: "600" }}>
            Categories
          </h4>
        </Stack>

        <Stack direction={"row"} className="header-section">
          <Stack className="date-text" direction={"row"}>
            <h2 className="cate">Browse By Category</h2>
          </Stack>

          <Stack direction={"row"} gap={3} className="slider-btns">
            <Box onClick={() => slider.current.slickPrev()} className="prev">
              <WestIcon />
            </Box>
            <Box onClick={() => slider.current.slickNext()} className="next">
              <EastIcon />
            </Box>
          </Stack>
        </Stack>

        {/* Render The Slider Data => The Products*/}
        {loading ? (
          <h2 className="loading">Loading ...</h2>
        ) : error ? ( // Check for error
          <h2 className="error">An error occurred: {error}</h2> // Display error message
        ) : (
          <Box className="category-box">
            <SliderComp categories={categories} slider={slider} btn={false} />
          </Box>
        )}
      </section>

      <hr className="line" />

      {/* Start Of Category Section */}
      <section
        className="products"
        style={{
          maxWidth: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Stack gap={2} direction={"row"} alignItems={"center"}>
          <div className="red"></div>
          <h4 style={{ color: "var(--red-color)", fontWeight: "600" }}>
            This Month
          </h4>
        </Stack>

        <Stack direction={"row"} className="header-section">
          <Stack className="date-text" direction={"row"}>
            <h2 className="best-selling">
              Best Selling Products
            </h2>
          </Stack>

          <Stack>
            <Link to={"about"} style={{ margin: "0 auto" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "var(--red-color)",
                  textTransform: "capitalize",
                  width: "175px",
                  height: "56px",
                  fontSize: "1rem",
                  marginTop: "2rem",
                }}
              >
                View All
              </Button>
            </Link>
          </Stack>
        </Stack>

        {loading ? (
          <h2 className="loading">Loading ...</h2>
        ) : error ? ( // Check for error
          <h2 className="error">An error occurred: {error}</h2> // Display error message
        ) : (
          <SliderComp
            products={limitedProducts}
            btn={true}
            section={true}
            likeIcon={true}
          />
        )}
      </section>

      {/* Start Of Music Experience Section */}
      <section className="music">
        <Stack gap={3} className="music-left-side">
          <h4 style={{ color: "#00FF66" }}>Categories</h4>
          <h2>Enhance Your Music Experience</h2>

          <Box className="time-left">
            <Box className="time-box">
              <span>23</span>
              <span>Days</span>
            </Box>
            <Box className="time-box">
              <span>05</span>
              <span>Hours</span>
            </Box>
            <Box className="time-box">
              <span>59</span>
              <span>Minutes</span>
            </Box>
            <Box className="time-box">
              <span>35</span>
              <span>Seconds</span>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00FF66",
              textTransform: "capitalize",
              width: "171px",
              height: "56px",
              fontSize: "1rem",
              marginTop: "2rem",
            }}
          >
            Buy Now!
          </Button>
        </Stack>

        <Box className="music-right-side">
          <img src="../images/music.png" alt="speaker pic" />
        </Box>
      </section>

      {/* Start Of Featured Section */}
      <section
        className="featured"
        style={{
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <Stack gap={2} direction={"row"} alignItems={"center"}>
          <div className="red"></div>
          <h4 style={{ color: "var(--red-color)", fontWeight: "600" }}>
            Featured
          </h4>
        </Stack>

        <Stack direction={"row"} className="header-section">
          <Stack className="date-text" direction={"row"}>
            <h2 className="cate">New Arrival</h2>
          </Stack>
        </Stack>

        <Box className="arrival">
          <Box className="arrival-left-side">
            <img src="../images/ps5.png" alt="Play Station 5" />

            <div className="text-arrival" style={{ height: "130px" }}>
              <h3>PlayStation 5</h3>
              <p style={{ width: "75%" }}>
                Black and White version of the PS5 coming out on sale.
              </p>

              <span tabIndex={0} style={{ textDecoration: "underLine" }}>
                Shop Now
              </span>
            </div>
          </Box>

          <Box className="arrival-right-side">
            <Box className="women-collections">
              <img src="../images/women.png" alt="Women’s Collections" />
              <div className="text-arrival" style={{ height: "130px" }}>
                <h3>Women’s Collections</h3>
                <p style={{ width: "75%" }}>
                  Featured woman collections that give you another vibe.
                </p>

                <span tabIndex={0} style={{ textDecoration: "underLine" }}>
                  Shop Now
                </span>
              </div>
            </Box>

            <Stack direction={"row"} className="speakers-perfume">
              <Box className="speakers">
                <img src="../images/speakers.png" alt="Speakers" />
                <div className="text-arrival">
                  <h3>Speakers</h3>
                  <p>Amazon wireless speakers</p>

                  <span tabIndex={0} style={{ textDecoration: "underLine" }}>
                    Shop Now
                  </span>
                </div>
              </Box>
              <Box className="perfume">
                <img src="../images/perfume.png" alt="Perfume" />
                <div className="text-arrival">
                  <h3>Perfume</h3>
                  <p>GUCCI INTENSE OUD EDP</p>

                  <span tabIndex={0} style={{ textDecoration: "underLine" }}>
                    Shop Now
                  </span>
                </div>
              </Box>
            </Stack>
          </Box>
        </Box>
      </section>

      <Benefits />
      <ScrollToTopButton />
    </main>
  );
}
