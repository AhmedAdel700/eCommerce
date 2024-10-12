import { Await, defer, Link, redirect, useLoaderData } from "react-router-dom";

import { Box, Button, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LoopIcon from "@mui/icons-material/Loop";

import { sizesArray } from "../../fakeData";
import { Suspense, useEffect, useState } from "react";
import SliderComp from "../../components/SliderComp";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../store/productSlice";
import "./singleproduct.css";
import {
  addToWishlist,
  removeFromWishlist,
  toggleLike,
} from "../../store/wishlistSlice";

export function loader({ params }) {
  async function getProduct(id) {
    try {
      const response = await fetch(
        `https://fakestoreapi.in/api/products/${id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed To Fetch Product", error);
      throw new Error(`Failed To Fetch Product With ID: ${id}`);
    }
  }

  const id = parseInt(params.id);

  if (isNaN(id) || id > 150 || id < 1) {
    return redirect("not-found");
  }

  return defer({ singleProduct: getProduct(params.id) });
}

export default function SingleProduct() {
  const dataPromise = useLoaderData(); // this will retrun the promise from defer

  const [relatedCategory, setRelatedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [choosenSize, setChoosenSize] = useState("M");
  const [color, setColor] = useState(true);
  const [counter, setCounter] = useState(0);

  const { loading, error, category } = useSelector((state) => state.products);
  const likes = useSelector((state) => state.wishlist.likes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCategory(relatedCategory));

    dataPromise.singleProduct.then((singleProduct) => {
      setRelatedCategory(singleProduct.product.category);
      setProductName(singleProduct.product.title);
    });
  }, [dataPromise, relatedCategory]);

  function truncateText(text = "", maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  }

  const size = sizesArray.map((size) => {
    return (
      <button
        className={choosenSize === size ? "choosen" : ""}
        onClick={() => setChoosenSize(size)}
        key={size}
      >
        {size}
      </button>
    );
  });

  const handleLikeClick = (product) => {
    dispatch(toggleLike(product.id));

    dispatch(addToWishlist(product));

    if (likes[product.id]) {
      dispatch(removeFromWishlist(product.id));
    }
  };

  function renderTheProduct(singleProduct) {
    return (
      <>
        <Box className="product-data">
          <Stack
            gap={3}
            alignItems={"center"}
            className="product-data-left-side"
          >
            <Box className="small-pics">
              <div className="pic">
                <img src={singleProduct.product.image} alt="Product Image" />
              </div>
              <div className="pic">
                <img src={singleProduct.product.image} alt="Product Image" />
              </div>
              <div className="pic">
                <img src={singleProduct.product.image} alt="Product Image" />
              </div>
              <div className="pic">
                <img src={singleProduct.product.image} alt="Product Image" />
              </div>
            </Box>

            <Box className="big-pic">
              <img src={singleProduct.product.image} alt="Product Image" />
            </Box>
          </Stack>

          <Box className="product-data-right-side">
            <Stack gap={1}>
              <h3 className="title-product">
                {truncateText(singleProduct.product.title, 40)}.
              </h3>

              <Stack direction={"row"} alignItems={"center"} className="rating">
                <StarRateRoundedIcon className="star" />
                <StarRateRoundedIcon className="star" />
                <StarRateRoundedIcon className="star" />
                <StarRateRoundedIcon className="star" />
                <StarRateRoundedIcon />
                <span
                  style={{
                    fontWeight: "400",
                    color: "#a39a9a",
                    fontSize: "14px",
                    margin: "0.2rem 0 0 0.5rem",
                  }}
                  className="star"
                >
                  (150 Reviews)
                </span>

                <span style={{ fontWeight: "500", margin: "0 0.5rem" }}>|</span>

                <span style={{ color: "#00FF66" }}>In Stock</span>
              </Stack>

              <p className="price-single-product">
                ${singleProduct.product.price}
              </p>

              <p className="description">
                {truncateText(singleProduct.product.description, 250)}.
              </p>

              <hr style={{ margin: "0.5rem 0" }} />

              <Stack direction={"row"} gap={3}>
                <p className="price-single-product">Colours:</p>

                <Stack direction={"row"} gap={0} alignItems={"center"}>
                  <Radio
                    color="info"
                    checked
                    onClick={() => setColor(true)}
                    className={color && "color"}
                  />
                  <Box>
                    <Radio
                      color="error"
                      checked
                      onClick={() => setColor(false)}
                      className={!color && "color"}
                    />
                  </Box>
                </Stack>
              </Stack>

              <Stack direction={"row"} gap={3} alignItems={"center"}>
                <p style={{ fontSize: "1.35rem" }}>Size:</p>

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  gap={2}
                  className="size"
                >
                  {size}
                </Stack>
              </Stack>

              <Stack
                className="product-buttons"
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={2}
                mb={2}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  className="add-subtract"
                >
                  <Button
                    sx={{ width: "10px" }}
                    onClick={() => {
                      if (counter !== 0) {
                        setCounter((prev) => prev - 1);
                      }
                    }}
                  >
                    <RemoveOutlinedIcon />
                  </Button>
                  <Box className="quntity" z>
                    {counter}
                  </Box>
                  <Button
                    onClick={() => {
                      setCounter((prev) => prev + 1);
                    }}
                  >
                    <AddOutlinedIcon />
                  </Button>
                </Stack>

                <Button
                  className="buy-now"
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--red-color)",
                    textTransform: "capitalize",
                    fontSize: "1rem",
                  }}
                >
                  Buy Now
                </Button>

                <button
                  className="like-btn"
                  tabIndex={0}
                  onClick={() => handleLikeClick(singleProduct.product)}
                >
                  {likes[singleProduct.product.id] ? (
                    <FavoriteOutlinedIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </button>
              </Stack>

              <Stack className="delivery" justifyContent={"space-evenly"}>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <LocalShippingOutlinedIcon fontSize="large" />
                  <Box>
                    <h4>Free Delivery</h4>
                    <p
                      style={{
                        textDecoration: "underLine",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      Enter your postal code for Delivery Availability
                    </p>
                  </Box>
                </Stack>

                <hr />

                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <LoopIcon fontSize="large" />
                  <Box>
                    <h4>Return Delivery</h4>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "500",
                      }}
                    >
                      Free 30 Days Delivery Returns.
                      <span
                        style={{
                          textDecoration: "underLine",
                          marginLeft: "0.5rem",
                          cursor: "pointer",
                        }}
                      >
                        Details
                      </span>
                    </p>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <section className="single-product">
      <Stack
        direction={"row"}
        alignItems={"center"}
        className="link-single-product"
      >
        <Link
          to="/"
          style={{
            color: "var(--text-color)",
            marginRight: "10px",
          }}
        >
          Home
        </Link>
        <Link
          to="/products"
          style={{
            color: "var(--text-color)",
            marginRight: "10px",
          }}
        >
          / Products
        </Link>
        / {truncateText(productName, 15)}...
      </Stack>

      <Suspense fallback={<h1 className="loading">Loading...</h1>}>
        <Await resolve={dataPromise.singleProduct}>{renderTheProduct}</Await>
      </Suspense>

      <section
        style={{
          maxWidth: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "4rem",
        }}
      >
        <Stack gap={2} direction={"row"} alignItems={"center"} mb={3}>
          <div className="red"></div>
          <h4 style={{ color: "var(--red-color)", fontWeight: "600" }}>
            Related Item
          </h4>
        </Stack>

        {/* Render The Slider Data => The Products*/}
        {loading ? (
          <h2 className="loading">Loading ...</h2>
        ) : error ? ( // Check for error
          <h2 className="error">An error occurred: {error}</h2> // Display error message
        ) : (
          <SliderComp
            products={category}
            btn={true}
            likeIcon={true}
            cartIcon={false}
            section={true}
          />
        )}
      </section>
    </section>
  );
}
