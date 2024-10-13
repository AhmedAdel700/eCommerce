import { redirect } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import "./checkout.css";

export function loader(isAuthenticated) {
  if (!isAuthenticated) {
    return redirect("/sign-up");
  }
  return null;
}

export default function Checkout() {
  const [selectedValue, setSelectedValue] = useState(""); // Tracks selected radio button

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Set the selected radio value
  };
  return (
    <section className="checkout-page">
      <Stack gap={1} className="checkout-left-side">
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

        <Stack
          direction={"row"}
          alignItems={"center"}
          ml={-1.5}
          gap={1}
        >
          <Checkbox defaultChecked color="error" />
          <p className="save">
            Save this information for faster check-out next time
          </p>
        </Stack>
      </Stack>

      <Stack className="checkout-right-side" gap={3}>
        <Stack></Stack>

        <Stack gap={1.8}>
          <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
            <p>Subtotal:</p>
            <p>$1750</p>
          </Stack>
          <hr />
          <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
            <p>Shipping:</p>
            <p>Free</p>
          </Stack>
          <hr />
          <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
            <p>Total:</p>
            <p>$1750</p>
          </Stack>
        </Stack>

        <Stack gap={1} direction={"row"} justifyContent={"space-between"}>
          <RadioGroup value={selectedValue} onChange={handleChange}>
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

          <Box sx={{ cursor: "pointer" }}>
            <img src="../images/visa.png" alt="payment methods" />
          </Box>
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
