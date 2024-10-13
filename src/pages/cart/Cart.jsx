import { Box, Button, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkout } from "../../store/authSlice";
import { clearCart, removeItemFromCart } from "../../store/cartSlice";
import "./cart.css";

export default function Cart() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [updated, setUpdated] = useState(false);
  const [quantities, setQuantities] = useState([]);
  const [total, setTotal] = useState(0);

  // Initialize quantities based on cartData
  useEffect(() => {
    if (cartData) {
      const initialQuantities = cartData.map((item) => ({
        id: item.id,
        number: 1, // Default to 1 if you want each item to start with a quantity of 1
      }));
      setQuantities(initialQuantities);
    }
  }, [cartData]);

  // Function to update quantity by id
  const updateQuantity = (id, delta) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((item) =>
        item.id === id
          ? { ...item, number: Math.max(item.number + delta, 0) } // Ensure the quantity doesn't go below 0
          : item
      )
    );
  };

  // Recalculate total whenever quantities or cartData change
  useEffect(() => {
    const newTotal = quantities.reduce((sum, quantity) => {
      const item = cartData.find((item) => item.id === quantity.id);
      if (item) {
        const itemPrice = item.price - item.price * (item.discount / 100);
        return sum + itemPrice * quantity.number;
      }
      return sum;
    }, 0);
    setTotal(newTotal.toFixed(2));
  }, [quantities, cartData]);

  function removerAlert() {
    if (updated) {
      setTimeout(() => {
        setUpdated(false);
      }, 1500);
    }
  }

  removerAlert();

  function truncateText(text = "", maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const renderCartItems = cartData?.map((item) => {
    const quantity = quantities.find((q) => q.id === item.id)?.number || 0;
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
              onClick={() => updateQuantity(item.id, 1)}
            />
            <KeyboardArrowDownIcon
              sx={{ cursor: "pointer" }}
              onClick={() => updateQuantity(item.id, -1)}
            />
          </Stack>
        </Stack>

        <Box>
          <p>
            $
            {(
              quantity *
              parseFloat(item.price - item.price * (item.discount / 100))
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
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"}>
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

        {cartData.length > 0 && (
          <Button
            type="button"
            onClick={() => dispatch(clearCart())}
            sx={{
              backgroundColor: "#000",
              textTransform: "capitalize",
              fontWeight: "600",
              lineHeight: "2",
            }}
            variant="contained"
          >
            Empty Your Cart
          </Button>
        )}
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
              Cart Has Been Updated Successfully!
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
            <p>${total}</p>
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
            <p>${total}</p>
          </Stack>

          <Link to={isAuthenticated ? "checkout" : "/sign-up"}>
            <Button
              onClick={() => dispatch(checkout())}
              type="button"
              variant="contained"
              className="checkout"
            >
              Proceed to checkout
            </Button>
          </Link>
        </Stack>
      </Stack>
    </section>
  );
}
