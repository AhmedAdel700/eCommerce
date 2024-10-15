import { Link, redirect } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./checkout.css";

export function loader(isAuthenticated) {
  if (!isAuthenticated) {
    return redirect("/sign-up");
  }
  return null;
}

export default function Checkout() {
  const { cartData, totalPrice, numberOfItems } = useSelector(
    (state) => state.cart
  );

  const [selectedValue, setSelectedValue] = useState("option2"); // Tracks selected radio button

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Set the selected radio value
  };

  function truncateText(text = "", maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const items = cartData.map((item, index) => {
    return (
      <Stack
        key={item.id}
        direction={"row"}
        justifyContent={"space-between"}
        gap={1}
        alignItems={"center"}
      >
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Typography variant="h6">
            {numberOfItems.at(index).number}X
          </Typography>
          <Box className="checkout-img">
            <img src={item.image} alt={item.title} />
          </Box>
          <Typography variant="h6">{truncateText(item.title, 15)}</Typography>
        </Stack>
        <Typography variant="h6">${item.price}</Typography>
      </Stack>
    );
  });

  return (
    <section className="checkout-page" data-aos="fade-right">
      <Stack gap={1} className="checkout-left-side">
        <Stack
          direction={"row"}
          alignItems={"center"}
          className="checkout-links"
        >
          <Link
            to="/account"
            style={{
              color: "var(--text-color)",
              marginRight: "10px",
            }}
          >
            Account
          </Link>
          <Link
            to="/account"
            style={{
              color: "var(--text-color)",
              marginRight: "10px",
            }}
          >
            / My Account
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
          <Link
            to="/cart"
            style={{
              color: "var(--text-color)",
              marginRight: "10px",
            }}
          >
            / View Cart
          </Link>
          / CheckOut
        </Stack>

        <h1>Billing Details</h1>
        <form>
          <label htmlFor="first-name">
            First Name<span className="red-star">*</span>
          </label>
          <input type="text" id="first-name" required />

          <label htmlFor="company-name">Company Name</label>
          <input type="text" id="company-name" />

          <label htmlFor="street">
            Street Address<span className="red-star">*</span>
          </label>
          <input type="text" id="street" required />

          <label htmlFor="floor">Apartment, floor, etc. (optional)</label>
          <input type="text" id="floor" />

          <label htmlFor="city">
            Town/City<span className="red-star">*</span>
          </label>
          <input type="text" id="city" required />

          <label htmlFor="phone">
            Phone Number<span className="red-star">*</span>
          </label>
          <input type="text" id="phone" required />

          <label htmlFor="email">
            Email Address<span className="red-star">*</span>
          </label>
          <input type="email" id="email" required />
        </form>

        <Stack direction={"row"} alignItems={"center"} ml={-1.5} gap={1}>
          <Checkbox defaultChecked color="error" />
          <p className="save">
            Save this information for faster check-out next time
          </p>
        </Stack>
      </Stack>

      <Stack className="checkout-right-side" gap={3}>
        <Box>{items}</Box>

        <Stack gap={1.8}>
          <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
            <Typography variant="h6">Subtotal:</Typography>
            <Typography variant="h6">${totalPrice}</Typography>
          </Stack>
          <hr />
          <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
            <Typography variant="h6">Shipping:</Typography>
            <Typography variant="h6">Free</Typography>
          </Stack>
          <hr />
          <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${totalPrice}</Typography>
          </Stack>
        </Stack>

        <Stack gap={1}>
          <RadioGroup value={selectedValue} onChange={handleChange}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              gap={1}
              alignItems={"center"}
            >
              <FormControlLabel
                value="option1"
                control={
                  <Radio
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "black",
                      },
                      transform: "scale(1.1)",
                    }}
                  />
                }
                label="Bank"
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontWeight: 600,
                  },
                }}
              />
              <Box sx={{ cursor: "pointer" }}>
                <img src="../images/visa.png" alt="payment methods" />
              </Box>
            </Stack>
            <FormControlLabel
              value="option2"
              control={
                <Radio
                  sx={{
                    color: "black",
                    "&.Mui-checked": {
                      color: "black",
                    },
                    transform: "scale(1.1)",
                  }}
                />
              }
              label="Cash on delivery"
              sx={{
                ".MuiFormControlLabel-label": {
                  fontWeight: 600,
                },
              }}
            />
          </RadioGroup>
        </Stack>

        <Stack className="coupon-checkout">
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
        </Stack>

        <Button
          type="submit"
          variant="contained"
          sx={{ width: "190px" }}
          className="apply"
        >
          Place Order
        </Button>
      </Stack>
    </section>
  );
}
