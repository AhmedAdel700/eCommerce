import { Box, Button, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";

import { Link } from "react-router-dom";

import { useState } from "react";

import "./contact.css";


export default function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [submit, setSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", data);

    // Clear the form after submission
    setData({ name: "", email: "", number: "", message: "" });

    setSubmit(true);

    setTimeout(() => {
      setSubmit(false);
    }, 2000);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="contact" data-aos="fade-right">
      <Stack direction={"row"} alignItems={"center"} className="link">
        <Link
          to="/"
          style={{
            color: "var(--text-color)",
            marginRight: "10px",
          }}
        >
          Home
        </Link>
        / Contact
      </Stack>

      <Box className="sides">
        <Stack direction={"column"} gap={4} className="left-side">
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            className="img-text"
          >
            <img src="../../images/phone.png" alt="phone-icon" />
            <h4>Call To Us</h4>
          </Stack>

          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +8801611112222</p>

          <hr />

          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            className="img-text"
          >
            <img src="../../images/mail.png" alt="mail-icon" />
            <h4>Write To US</h4>
          </Stack>

          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Emails: customer@exclusive.com</p>
          <p>Emails: support@exclusive.com</p>
        </Stack>

        <Box className="right-side">
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <input
                type="text"
                name="name"
                value={data.name}
                placeholder="Your Name"
                required
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                type="email"
                name="email"
                value={data.email}
                placeholder="Your Email"
                required
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                type="number"
                name="number"
                value={data.number}
                placeholder="Your Phone"
                required
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <textarea
              name="message"
              value={data.message}
              placeholder="Your Message"
              required
              onChange={handleChange}
            ></textarea>

            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "var(--red-color)", color: "white" }}
            >
              Send Message
            </Button>

            {submit && (
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
                  Message Sent Successfully !
                </Alert>
              </Stack>
            )}
          </form>
        </Box>
      </Box>
    </section>
  );
}
