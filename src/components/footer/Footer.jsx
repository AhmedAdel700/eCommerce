import Grid from "@mui/material/Grid2";

import "./footer.css";
import { Box, Stack } from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Stack gap={3}>
            <h3>Exclusive</h3>
            <h4>Subscribe</h4>
            <p>Get 10% off your first order</p>
            <input type="email" placeholder="Enter your email" />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Stack gap={3}>
            <h4>Support</h4>
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Stack gap={3}>
            <h4>Account</h4>
            <h5>My Account</h5>
            <p>Login / Register</p>
            <p>Cart</p>
            <p>Wishlist</p>
            <p>Shop</p>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Stack gap={3}>
            <h4>Quick Link</h4>
            <p>Privacy Policy</p>
            <p>Terms Of Use</p>
            <p>FAQ</p>
            <p>Contact</p>
          </Stack>
        </Grid>

        <Grid item xs={12} direction={"column"} sm={6} md={2} lg={2}>
          <Stack gap={3}>
            <h4>Download App</h4>
            <p>Save $3 with App New User Only</p>
            <img
              style={{ cursor: "pointer" }}
              src="../images/Qr.png"
              alt="Q Code"
              draggable="false"
            />

            <Box>
              <img src="" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </footer>
  );
}
