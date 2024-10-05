import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#db4444",
  },
}));

export default function CartLogo() {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={null} color="secondary">
        <ShoppingCartOutlinedIcon className="icon" />
      </StyledBadge>
    </IconButton>
  );
}
