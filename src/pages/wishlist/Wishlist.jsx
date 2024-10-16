import { Box, Button, Stack } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addLimitedProducts } from "../../store/productSlice";
import { removeFromWishlist, toggleLike } from "../../store/wishlistSlice";
import SliderComp from "../../components/SliderComp";
import { addToCart } from "../../store/cartSlice";
import "./wishlist.css";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { loading, error, limitedProducts } = useSelector(
    (state) => state.products
  );
  const { cartData } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addLimitedProducts({ limit: 4, page: 30 }));
  }, [dispatch]);

  function isProductInCart(productId) {
    return cartData.some((item) => item.id === productId);
  }

  const items = wishlist.map((item) => {
    return (
      <Box key={item.id} className="wishlist-item">
        <Box className="img-box-list">
          <img src={item.image} alt={item.title} />

          <Box
            className="delete"
            onClick={() => {
              dispatch(removeFromWishlist(item.id));
              dispatch(toggleLike(item.id));
            }}
          >
            <DeleteForeverIcon />
          </Box>

          {item.discount && (
            <Box className="discount-wishlist">-{item.discount}%</Box>
          )}

          <Button
            onClick={() => {
              dispatch(addToCart(item));
              dispatch(removeFromWishlist(item.id));
              dispatch(toggleLike(item.id));
            }}
            startIcon={
              <ShoppingCartOutlinedIcon
                sx={{ fontSize: "1.4rem !important" }}
              />
            }
            sx={{
              width: "100%",
              color: "white",
              textTransform: "capitalize",
              fontWeight: "500",
              fontSize: "1rem",
              lineHeight: "1.5",
              textAlign: "center",
              backgroundColor: "var(--dark-color)",
            }}
          >
            {isProductInCart(item.id) ? "In Cart" : "Add To Cart"}
          </Button>
        </Box>

        <h5 className="item-title">{item.title}</h5>
        <div className="price">
          {item.discount && (
            <p>${item.price - item.price * (item.discount / 100)}</p>
          )}
          <p className={item.discount ? "old-price" : ""}>${item.price}</p>
        </div>
      </Box>
    );
  });

  function moveAllToBag() {
    wishlist.map((item) => {
      dispatch(removeFromWishlist(item.id));
      dispatch(addToCart(item));
      dispatch(toggleLike(item.id));
    });
  }

  return (
    <section className="wishlist">
      <Stack
        gap={1}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={5}
      >
        <h3>Wishlist ({wishlist.length}) </h3>

        <Button className="add-to-bag" onClick={() => moveAllToBag()}>
          Move All To Bag
        </Button>
      </Stack>

      <main className="items">{items}</main>

      <section
        data-aos="fade-right"
        className="just-for-you"
        style={{
          maxWidth: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Stack
          gap={2}
          direction={"row"}
          alignItems={"center"}
          marginBottom={"3rem"}
        >
          <div className="red"></div>
          <h4 style={{ fontWeight: "500", fontSize: "1.2rem" }}>
            Just For You
          </h4>

          <Link to="/products" style={{ marginLeft: "auto" }}>
            <Button className="see-all-wish-list">See All</Button>
          </Link>
        </Stack>

        {/* Render The Slider Data => The Products*/}
        {loading ? (
          <>
            <h2 className="loading">Loading ...</h2>
          </>
        ) : error ? ( // Check for error
          <h2 className="error">An error occurred: {error}</h2> // Display error message
        ) : (
          <SliderComp
            products={limitedProducts}
            btn={true}
            section={true}
            likeIcon={false}
            cartIcon={true}
          />
        )}
      </section>
    </section>
  );
}
