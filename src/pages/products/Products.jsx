import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAllCategories } from "../../store/productSlice";
import { Box, Button, Stack } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

import { addToCart } from "../../store/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  toggleLike,
} from "../../store/wishlistSlice";

import "./products.css";

export default function Products() {
  const { allCategories, loading, error } = useSelector(
    (state) => state.products
  );
  const likes = useSelector((state) => state.wishlist.likes);
  const { cartData } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addAllCategories());
  }, [dispatch]);

  const handleLikeClick = (product) => {
    dispatch(toggleLike(product.id));

    dispatch(addToWishlist(product));

    if (likes[product.id]) {
      dispatch(removeFromWishlist(product.id));
    }
  };

  function truncateText(text = "", maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  }

  function isProductInCart(productId) {
    return cartData.some((item) => item.id === productId);
  }

  function renderCategory(n) {
    const categoryItems = allCategories[n]?.products.map((product) => {
      return (
        <div key={product.id} className="item">
          <div className="product-img">
            {product.discount && (
              <div className="discount">
                <div className="discount-percentage">-{product.discount}%</div>
              </div>
            )}

            <div className="like">
              <Box tabIndex={0} onClick={() => handleLikeClick(product)}>
                {likes[product.id] ? (
                  <FavoriteOutlinedIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </Box>

              <Link to={`/products/${product.id}`}>
                <Box>
                  <RemoveRedEyeOutlinedIcon />
                </Box>
              </Link>
            </div>

            <div className="add-to-cart">
              <Button
                onClick={() => dispatch(addToCart(product))}
                sx={{
                  width: "100%",
                  color: "white",
                  textTransform: "capitalize",
                  fontWeight: "500",
                  fontSize: "0.9rem",
                  lineHeight: "1.4",
                  textAlign: "center",
                }}
              >
                <ShoppingCartOutlinedIcon sx={{ marginRight: "0.3rem" }} />
                {isProductInCart(product.id) ? "In Cart" : "Add To Cart"}
              </Button>
            </div>

            <img
              style={{ maxWidth: "100%" }}
              src={product.image}
              alt={product.name}
              loading="lazy"
            />
          </div>
          <h5 className="product-title">{truncateText(product.title, 25)}</h5>
          <div className="price">
            {product.discount && (
              <p>
                $
                {parseFloat(
                  product.price - product.price * (product.discount / 100)
                ).toFixed(2)}
              </p>
            )}
            <p className={product.discount ? "old-price" : ""}>
              ${product.price}
            </p>
          </div>

          <Stack direction={"row"} className="rating">
            <StarRateRoundedIcon className="star" />
            <StarRateRoundedIcon className="star" />
            <StarRateRoundedIcon className="star" />
            <StarRateRoundedIcon className="star" />
            <StarRateRoundedIcon />
            <span
              style={{ fontWeight: "500", color: "#a39a9a" }}
              className="star"
            >
              (88)
            </span>
          </Stack>
        </div>
      );
    });

    return categoryItems;
  }

  const arrayOfStacks = [
    "Gaming",
    "Moblie",
    "Labtop",
    "TV",
    "Audio",
    "Applications",
  ];

  const renderCategories = arrayOfStacks.map((stack, index) => {
    return (
      <Stack gap={4} key={index}>
        <Stack gap={2} direction={"row"} alignItems={"center"}>
          <div className="red"></div>
          <h4 style={{ color: "var(--red-color)", fontWeight: "600" }}>
            {stack} Section
          </h4>
        </Stack>

        {loading ? (
          <h2 className="loading">Loading...</h2>
        ) : (
          <Box className="products-item">{renderCategory(index)}</Box>
        )}

        <hr />
      </Stack>
    );
  });

  if (error) {
    return <Box className="error">Error: {error}</Box>;
  }

  return (
    <section
      className="all-products"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {renderCategories}
    </section>
  );
}
