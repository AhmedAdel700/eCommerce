import { Box, Button, Stack, Typography } from "@mui/material";

import { Link, redirect } from "react-router-dom";
import "./account.css";

export function loader(isAuthenticated) {
  if (!isAuthenticated) {
    return redirect("/sign-up");
  }
  return null;
}

export default function Account() {
  return (
    <section className="account" data-aos="fade-right">
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        className="header-info"
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
          / My Account
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <p style={{ fontSize: "14px", fontWeight: "500" }}>Welcome!</p>
          <span
            style={{
              color: "var(--red-color)",
              marginLeft: "5px",
              fontSize: "14px",
            }}
          >
            To Your Account
          </span>
        </Stack>
      </Stack>

      {/* This Is The Main Page Consist Of 2 Sides Left And Right */}

      <Stack className="account-container">
        {/* This Is The Left Side */}
        <Stack gap={2} className="account-left-side">
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: "600", lineHeight: "2.4" }}
            >
              Manage My Account
            </Typography>
            <ul className="ul-link">
              <li style={{ color: "var(--red-color)" }}>My Profile</li>
              <li>Address Book</li>
              <li>My Payment Options</li>
            </ul>
          </Box>

          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: "600", lineHeight: "2.4" }}
            >
              My Orders
            </Typography>
            <ul className="ul-link">
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>
          </Box>

          <Typography
            variant="body1"
            sx={{ fontWeight: "600", lineHeight: "2.4" }}
          >
            My WishList
          </Typography>
        </Stack>

        {/* This Is The Right Side */}

        <Stack gap={2} className="account-right-side">
          <Typography
            sx={{
              color: "var(--red-color)",
              fontWeight: "600",
              fontSize: "1.3rem",
              lineHeight: "2",
            }}
          >
            Edit Your Profile
          </Typography>

          <form>
            <div className="data-1">
              <Stack gap={0.5} className="my-info">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
              </Stack>

              <Stack gap={0.5} className="my-info">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
              </Stack>

              <Stack gap={0.5} className="my-info">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </Stack>
              <Stack gap={0.5} className="my-info">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                />
              </Stack>
            </div>

            <Stack className="data-2" gap={2} mt={3}>
              <label style={{ fontWeight: "500" }} htmlFor="password">
                Password Changes
              </label>
              <input
                type="password"
                placeholder="Current Password"
                id="password"
              />
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm New Password" />
            </Stack>

            <Stack className="account-btns">
              <Button variant="text">Cancel</Button>
              <Button variant="contained">Save Changes</Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </section>
  );
}
