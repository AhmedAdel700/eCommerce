import { Box, Button, Stack } from "@mui/material";
import "./signUp.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SginUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", data);

    // Clear the form after submission
    setData({ name: "", email: "", password: "" });
  };

  const handleChnage = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="sign-up">
      <Box className="phone-img">
        <img
          src="../images/Side-Image.png"
          alt="phone pic"
        />
      </Box>

      <Stack className="create">
        <Box className="box-create">
          <h1>Create an account</h1>
          <p>Enter your details below</p>

          <form className="create-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChnage}
              placeholder="Name"
              required
            />
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

            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "var(--red-color)", color: "white" }}
            >
              Create Account
            </Button>
            <Button
              variant="contained"
              onClick={() => (window.location.href = "https://www.google.com/")}
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
          </form>

          <Stack direction={"row"} gap={3} justifyContent={"center"}>
            <p>Already have account?</p>
            <Link to="/" style={{ textDecoration: "underline" }}>
              Log in
            </Link>
          </Stack>
        </Box>
      </Stack>
    </section>
  );
}
