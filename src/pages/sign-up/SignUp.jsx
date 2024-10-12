import { Box, Button, Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { isLoggedIn, changeDirection } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

import "./signUp.css";
import ScrollToTopButton from "../../components/ScrollToTopButton";

export default function SginUp() {
  const dispatch = useDispatch();

  let { redirectState, isAuthenticated, checkout } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const [login, setLogin] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(isLoggedIn(data));

    // Clear the form after submission
    setData({ name: "", email: "", password: "" });
  };

  const handleChnage = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (redirectState.state) {
    navigate(checkout ? "cart/checkout" : "/");

    setTimeout(() => {
      dispatch(changeDirection({ state: false, type: redirectState.type }));
    }, 3000);
  }

  return (
    <section className="sign-up">
      <Box className="phone-img">
        <img src="../images/Side-Image.png" alt="phone pic" />
      </Box>

      <Stack className="create">
        <Box className="box-create">
          {!login ? <h1>Create an account</h1> : <h1>Log in to Exclusive</h1>}
          <p>Enter your details below</p>

          <form className="create-form" onSubmit={handleSubmit}>
            {!login && (
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChnage}
                placeholder="Name"
                required
              />
            )}
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChnage}
              placeholder="Email Or Phone Number"
              required
            />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChnage}
              placeholder="Password"
              required
            />

            {!login ? (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "var(--red-color)", color: "white" }}
                  onClick={dispatch(
                    changeDirection({
                      state: redirectState.state,
                      type: "sign-up",
                    })
                  )}
                >
                  Create Account
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    (window.location.href = "https://www.google.com/")
                  }
                  sx={{
                    backgroundColor: "transparent",
                    color: "#000",
                    border: "1px solid #000",
                    marginBottom: "1rem",
                  }}
                >
                  <Stack mr={1}>
                    <img src="../images/Icon-google.png" alt="google icon" />
                  </Stack>
                  Sign up with Google
                </Button>
              </>
            ) : (
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "var(--red-color)",
                    textTransform: "capitalize",
                    width: "143px",
                    height: "56px",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                  variant="contained"
                  onClick={dispatch(
                    changeDirection({
                      state: redirectState.state,
                      type: "login",
                    })
                  )}
                >
                  Log In
                </Button>

                <Typography
                  variant=""
                  sx={{
                    color: "var(--red-color)",
                    lineHeight: "2.4",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  Forget Password?
                </Typography>
              </Stack>
            )}
          </form>

          {!login && (
            <Stack direction={"row"} gap={3} justifyContent={"center"}>
              {!isAuthenticated && <p>Already have account?</p>}

              <Typography
                variant="button"
                onClick={() => {
                  if (!isAuthenticated) {
                    setLogin(true);
                  }
                }}
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {isAuthenticated ? "You Are Already Logged in" : "Log in"}
              </Typography>
            </Stack>
          )}
        </Box>
      </Stack>
      <ScrollToTopButton />
    </section>
  );
}
