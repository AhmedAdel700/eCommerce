import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Show or hide the button depending on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        // Adjust this value for when the button should appear
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll smoothly to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Makes the scroll smooth
    });
  };

  return (
    <>
      {showButton && (
        <IconButton
          onClick={scrollToTop}
          className="scroll-to-top"
          sx={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: "1000",
            backgroundColor: "#F5F5F5", // Button color
            color: "#000", // Icon color
            "&:hover": {
              backgroundColor: "#c9bfbf",
            },
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
    </>
  );
};

export default ScrollToTopButton;
