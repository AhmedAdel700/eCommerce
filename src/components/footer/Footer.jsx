import Grid from "@mui/material/Grid2";
import { Box, Stack } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import SendIcon from "@mui/icons-material/Send";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <Grid container spacing={10} sx={{ marginBottom: "5rem" }}>
        <Grid item xs={12} sm={6} md={2} lg={2}>
          <Stack gap={3}>
            <h3>Exclusive</h3>
            <h4>Subscribe</h4>
            <p>Get 10% off your first order</p>

            <Box sx={{ position: "relative" }}>
              <input
                style={{ width: "100%" }}
                type="email"
                placeholder="Enter your email"
                className="final-email"
              />
              <SendIcon className="send-arrow" />
            </Box>
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

            <Stack direction={"row"} gap={1}>
              <img
                style={{ cursor: "pointer" }}
                src="../images/Qr.png"
                alt="Q Code"
                draggable="false"
              />

              <Stack gap={1}>
                <img
                  src="../images/store.png"
                  alt="google store"
                  draggable="false"
                  style={{ cursor: "pointer" }}
                />
                <img
                  src="../images/appstore.png"
                  alt="app store"
                  draggable="false"
                  style={{ cursor: "pointer" }}
                />
              </Stack>
            </Stack>

            <Stack
              direction={"row"}
              gap={3}
              alignItems={"center"}
              className="icons-footer"
            >
              <img src="../images/Icon-Facebook.png" alt="" draggable="false" />
              <img src="../images/Icon-t.png" alt="" draggable="false" />
              <img src="../images/insta.png" alt="" draggable="false" />
              <img src="../images/Vector.png" alt="" draggable="false" />
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <div className="copyright">
        <CopyrightIcon />
        Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
}
