import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import CartLogo from "../CartLogo";
import { Stack } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

import "./header.css";

//Language Menu Styles

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

// Menu Account Styles

const StyledMenuForAccount = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 4,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "#F5f5f5",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 30,
        color: "white",
        marginRight: theme.spacing(1.5),
        Zindex: "100",
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function Header() {
  const meduimScreens = useMediaQuery("(min-width:991px)");
  const smallScreens = useMediaQuery("(max-width:768px)");

  let location = useLocation();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [active, setActive] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickForAccount = (event) => {
    setToggleMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setToggleMenu(null);
  };

  const handleCloseForAccount = () => {
    setToggleMenu(null);
  };

  const handleSelect = (event) => {
    setSelectedLanguage(event.target.innerText);
    handleClose();
  };

  const languages = ["Arabic", "English", "French", "German", "Japanese"];

  const languageList = languages.map((lang) => {
    return (
      <MenuItem
        className="lang-list"
        key={lang}
        onClick={(() => handleClose, handleSelect)}
        disableRipple
      >
        {lang}
      </MenuItem>
    );
  });

  const links = [
    { linkName: "Home", path: "/" },
    { linkName: "Contact", path: "/contact" },
    { linkName: "About", path: "/about" },
    { linkName: "Sign Up", path: "/sign-up" },
  ];

  const navLinks = links.map((link) => {
    return (
      <Link
        key={link.linkName}
        to={link.path}
        onClick={() => setActive((prev) => !prev)}
        tabIndex={smallScreens ? -1 : 0}
        className={
          !smallScreens && link.path === location.pathname ? "active-link" : ""
        }
      >
        {link.linkName}
        {/* <hr style={{ width: "25%" , margin:"0 auto" }} /> */}
      </Link>
    );
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [toggleMenu, setToggleMenu] = useState(null);
  const openAccount = Boolean(toggleMenu);

  const menuItems = [
    {
      icon: <PersonOutlineOutlinedIcon />,
      label: "Manage My Account",
      link: "account",
    },
    {
      icon: <LocalMallOutlinedIcon />,
      label: "My Order",
      link: ".",
    },
    {
      icon: <HighlightOffIcon />,
      label: "My Cancellations",
      link: ".",
    },
    {
      icon: <StarBorderRoundedIcon />,
      label: "My Reviews",
      link: ".",
    },
    {
      icon: <LogoutIcon sx={{ transform: "scaleX(-1)" }} />,
      label: "Logout",
      link: "/sign-up",
    },
  ];

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <Link to={item.link} key={index}>
        <MenuItem
          className="account-icons"
          onClick={() => {
            handleCloseForAccount();
            if (item.label === "Logout") {
              dispatch(logout());
            }
          }}
          disableRipple
        >
          {item.icon}
          {item.label}
        </MenuItem>
      </Link>
    ));
  };

  return (
    <header>
      <Box className="summer-sale">
        <div className="palce-holder"></div>
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span tabIndex={0}>
            <u>ShopNow</u>
          </span>
        </p>

        <div className="lang">
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon fontSize="meduim" />}
            color="transparent"
            sx={{ textTransform: "capitalize" }}
          >
            {selectedLanguage}
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {languageList}
          </StyledMenu>
        </div>
      </Box>

      <Stack
        className="nav-icons"
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {smallScreens && (
          <WidgetsOutlinedIcon
            tabIndex={0}
            sx={{ cursor: "pointer" }}
            fontSize="large"
            onClick={() => {
              setActive((prev) => !prev);
            }}
          />
        )}

        <div
          className="exclusive"
          style={{ display: meduimScreens && !smallScreens ? "block" : "none" }}
        >
          Exclusive
        </div>

        <nav
          style={{
            top: active ? "100%" : "-250%",
            opacity: active ? "0.9" : "0",
          }}
        >
          {navLinks}
        </nav>

        <Box className="controls">
          <Box className="search">
            <input type="text" placeholder="What are you looking for?" />
            <SearchIcon className="search-i" />
          </Box>

          <Link
            to="wish-list"
            style={{ paddingTop: "5px", position: "relative" }}
          >
            <FavoriteBorderOutlinedIcon sx={{ cursor: "pointer" }} />
            {wishlist.length > 0 && (
              <div className="wish-list-number">{wishlist.length}</div>
            )}
          </Link>

          <CartLogo />

          {isAuthenticated && (
            <PersonOutlineOutlinedIcon
              tabIndex={0}
              sx={{
                backgroundColor: "var(--red-color)",
                color: "white",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                padding: "5px",
                cursor: "pointer",
                marginTop: "-4px",
              }}
              id="demo-customized-button"
              aria-controls={openAccount ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAccount ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClickForAccount}
            />
          )}

          {/* The Account Menu */}
          <div>
            <StyledMenuForAccount
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={toggleMenu}
              open={openAccount}
              onClose={handleCloseForAccount}
            >
              {renderMenuItems()}
            </StyledMenuForAccount>
          </div>
        </Box>
      </Stack>
    </header>
  );
}
