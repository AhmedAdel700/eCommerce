import { redirect } from "react-router-dom";
import "./checkout.css";

export function loader(isAuthenticated) {
  if (!isAuthenticated) {
    return redirect("/sign-up");
  }
  return null;
}

export default function Checkout() {
  return <div>Checkout</div>;
}
