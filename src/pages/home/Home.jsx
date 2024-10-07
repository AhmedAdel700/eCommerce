import { Alert, Stack } from "@mui/material";

import { useSelector } from "react-redux";

export default function Home() {
  const { redirectState } = useSelector((state) => state.auth);

  return (
    <main>
      {redirectState.state && (
        <Stack
          className="alert"
          sx={{ width: "100%", margin: "0 auto" }}
          spacing={2}
        >
          <Alert
            sx={{ fontSize: "0.9rem", fontWeight: "600" }}
            variant="standard"
            severity="success"
          >
            {redirectState.type === "sign-up"
              ? "Account Created Successfully !"
              : "Welcome Back To eCommerce"}
          </Alert>
        </Stack>
      )}
    </main>
  );
}
