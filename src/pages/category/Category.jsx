import { Box, Button, Stack } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  toggleLike,
} from "../../store/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Category() {
  const [cateData, setCateData] = useState([]);
  const params = useParams();

  const dispatch = useDispatch();
  const likes = useSelector((state) => state.wishlist.likes);
  const { cartData } = useSelector((state) => state.cart);

  async function getCategory(params) {
    try {
      const res = await fetch(
        `https://fakestoreapi.in/api/products/category?type=${params.category}`
      );
      const data = await res.json();
      console.log(data);
      return setCateData(data);
    } catch (err) {
      throw new Error(`Failed to fetch data for category: ${params.category}`);
    }
  }

  useEffect(() => {
    getCategory(params);
  }, [params]);

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

  const renderCategory = cateData?.products?.map((product) => {
    return (
      <div key={product.id} className="item" data-aos="fade-up">
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

  return (
    <section
      data-aos="fade-right"
      className="all-products"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Stack gap={2} direction={"row"} alignItems={"center"}>
        <div className="red"></div>
        <h4 style={{ color: "var(--red-color)", fontWeight: "600" }}>
          <p style={{ textTransform: "capitalize" }}>
            {params.category} Section
          </p>
        </h4>
      </Stack>
      {cateData.products?.length ? (
        <Box className="products-item"> {renderCategory}</Box>
      ) : (
        <h1 className="loading">Loading...</h1>
      )}
    </section>
  );
}
