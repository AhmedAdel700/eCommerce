import { Box, Stack, Typography } from "@mui/material";

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
    <section className="account">
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

      <Stack
        direction={"row"}
        gap={3}
        alignItems={"center"}
        justifyContent={"space-between"}
        mt={10}
      >
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

        <Stack className="account-right-side">
          <img src="/images/user.png" alt="user-icon" />
          <p style={{ fontSize: "14px", fontWeight: "500" }}>John Doe</p>
          <p style={{ fontSize: "14px", fontWeight: "500" }}>User Since 2022</p>
        </Stack>
      </Stack>
    </section>
  );
}
