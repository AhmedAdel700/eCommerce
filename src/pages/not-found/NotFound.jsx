import "./notfound.css";

import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box className="not-found">
      <Stack
        direction={"row"}
        alignItems={"center"}
        className="links-not-found"
      >
        <Link
          replace
          to="/"
          style={{
            color: "var(--text-color)",
            marginRight: "10px",
          }}
        >
          Home
        </Link>
        / 404 Error
      </Stack>

      <Typography variant="h1">404 Not Found</Typography>
      <Typography
        variant="body2"
        sx={{ lineHeight: "2.4", marginTop: "1rem", fontSize: "0.8rem" }}
      >
        Your visited page not found. You may go home page.
      </Typography>

      <Link to="/" replace>
        <Button
          variant="contained"
          sx={{
            marginTop: "3rem",
            backgroundColor: "var(--red-color)",
            padding: "10px 40px",
          }}
        >
          Back to home page
        </Button>
      </Link>
    </Box>
  );
}
