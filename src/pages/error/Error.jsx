import { Link, useRouteError } from "react-router-dom";
import { Button } from "@mui/material";
import "./error.css";

export default function Error() {
  const error = useRouteError();
  return (
    <div className="error-page">
      <h1>{error.message}</h1>
      <Link to="/" replace>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#000", textTransform: "capitalize" }}
        >
          Return To Home Page
        </Button>
      </Link>
    </div>
  );
}
