import { Box, Button, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkout } from "../../store/authSlice";
import { removeItemFromCart } from "../../store/cartSlice";
import "./cart.css";

export default function Cart() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [updated, setUpdated] = useState(false);
  const [quantity, setQuantity] = useState(1);

  function removerAlert() {
    updated &&
      setTimeout(() => {
        setUpdated(false);
      }, 1500);
  }

  removerAlert();

  function truncateText(text = "", maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  }

  const renderCartItems = cartData?.map((item) => {
    return (
      <Box key={item.id} className="cart-single-item">
        <Stack className="img-title" direction={"row"}>
          <Box className="cart-image">
            <img src={item.image} alt={item.title} />

            <Box
              className="delete-from-cart"
              onClick={() => dispatch(removeItemFromCart(item.id))}
            >
              <CloseIcon />
            </Box>
          </Box>
          <Box className="item-cart-name">{truncateText(item.title, 15)}</Box>
        </Stack>

        <p>
          $
          {parseFloat(item.price - item.price * (item.discount / 100)).toFixed(
            2
          )}
        </p>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={0.5}
          className="item-quantity"
        >
          <Box className="number">{quantity}</Box>
          <Stack>
            <KeyboardArrowUpIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setQuantity((prev) => prev + 1);
              }}
            />
            <KeyboardArrowDownIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                quantity && setQuantity((prev) => prev - 1);
              }}
            />
          </Stack>
        </Stack>

        <Box>
          <p>
            $
            {parseFloat(
              item.price - item.price * (item.discount / 100)
            ).toFixed(2)}
          </p>
        </Box>
      </Box>
    );
  });

  return (
    <section className="cart-page">
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
        / Cart
      </Stack>

      <Stack className="cart-items" justifyContent={"center"}>
        <Box className="cart-single-item">
          <h4>Product</h4>
          <h4>Price</h4>
          <h4>Quantity</h4>
          <h4>Subtotal</h4>
        </Box>

        {renderCartItems}

        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          gap={1}
        >
          <Link to="/products">
            <Button>Return To Shop</Button>
          </Link>
          <Button onClick={() => setUpdated(true)}>Update Cart</Button>
        </Stack>

        {updated && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              severity="success"
              sx={{ fontWeight: "600", fontSize: "0.83rem" }}
            >
              Cart Has Been Updated Successfully !
            </Alert>
          </Stack>
        )}
      </Stack>

      <Stack
        className="cart-user-info"
        justifyContent={"space-between"}
        direction={"row"}
        gap={1}
      >
        <Box className="coupon">
          <form>
            <input
              type="text"
              placeholder="Coupon Code"
              required
              minLength={5}
            />
            <Button type="submit" variant="contained" className="apply">
              Apply Coupon
            </Button>
          </form>
        </Box>

        <Stack className="total" justifyContent={"space-evenly"} gap={1}>
          <h4>Cart Total</h4>

          <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"row"}
            gap={1}
          >
            <p>Subtotal</p>
            <p>$1750</p>
          </Stack>

          <hr />

          <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"row"}
            gap={1}
          >
            <p>Shipping:</p>
            <p>Free</p>
          </Stack>

          <hr />

          <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"row"}
            gap={1}
          >
            <p>Total:</p>
            <p>$1750</p>
          </Stack>

          <Link to={isAuthenticated ? "/" : "/sign-up"}>
            <Button
              onClick={() => dispatch(checkout())}
              type="button"
              variant="contained"
              className="checkout"
            >
              Procees to checkout
            </Button>
          </Link>
        </Stack>
      </Stack>
    </section>
  );
}
