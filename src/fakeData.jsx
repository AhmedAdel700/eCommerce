import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import HeadsetOutlinedIcon from "@mui/icons-material/HeadsetOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import LogoutIcon from "@mui/icons-material/Logout";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export const categories = [
  {
    id: 1,
    name: "Phones",
    icon: <PhoneAndroidOutlinedIcon />,
    categoryName: "mobile",
  },
  {
    id: 2,
    name: "Computers",
    icon: <DesktopMacOutlinedIcon />,
    categoryName: "laptop",
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: <WatchOutlinedIcon />,
    categoryName: "mobile",
  },
  {
    id: 4,
    name: "Camera",
    icon: <CameraAltOutlinedIcon />,
    categoryName: "appliances",
  },
  {
    id: 5,
    name: "HeadPhones",
    icon: <HeadsetOutlinedIcon />,
    categoryName: "audio",
  },
  {
    id: 6,
    name: "Gaming",
    icon: <VideogameAssetOutlinedIcon />,
    categoryName: "gaming",
  },
];

export const arrayOfLinks = [
  {
    name: "Woman’s Fashion",
    path: "/women",
    icon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    name: "Men’s Fashion",
    path: "/men",
    icon: <KeyboardArrowRightOutlinedIcon />,
  },
  {
    name: "Electronics",
    path: "/electronics",
  },
  {
    name: "Home & Lifestyle",
    path: "/home-and-lifestyle",
  },
  {
    name: "Medicine",
    path: "/medicine",
  },
  {
    name: "Sports & Outdoor",
    path: "/sports-and-outdoor",
  },
  {
    name: "Baby’s & Toys",
    path: "/baby-s-and-toys",
  },
  {
    name: "Groceries & Pets",
    path: "/groceries-and-pets",
  },
  {
    name: "Health & Beauty",
    path: "/health-and-beauty",
  },
];

export const menuItems = [
  {
    icon: <PersonOutlineOutlinedIcon />,
    label: "Manage My Account",
    link: "account",
  },
  {
    icon: <LocalMallOutlinedIcon />,
    label: "My Order",
    link: "cart",
  },
  {
    icon: <HighlightOffIcon />,
    label: "My Cancellations",
    link: "wish-list",
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

export const links = [
  { linkName: "Home", path: "/" },
  { linkName: "Contact", path: "/contact" },
  { linkName: "About", path: "/about" },
  { linkName: "Sign Up", path: "/sign-up" },
];

export const languages = ["Arabic", "English", "French", "German", "Japanese"];

export const sizesArray = ["XS", "S", "M", "L", "XL"];
