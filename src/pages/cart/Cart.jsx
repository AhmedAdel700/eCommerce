import { Box, Button, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cart.css";
import { checkout } from "../../store/authSlice";

export default function Cart() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updated, setUpdated] = useState(false);

  function removerAlert() {
    updated &&
      setTimeout(() => {
        setUpdated(false);
      }, 1500);
  }

  removerAlert();

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

      <Stack className="cart-items" gap={5} justifyContent={"center"}>
        <Stack
          className="cart-single-item"
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          gap={1}
        >
          <h4>Product</h4>
          <h4>Price</h4>
          <h4>Quantity</h4>
          <h4>Subtotal</h4>
        </Stack>

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
