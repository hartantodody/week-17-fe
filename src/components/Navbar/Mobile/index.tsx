import { CustomButton } from "../..";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Props } from "../../../interface";
import { useNavigate } from "react-router-dom";
import "../Navbar.module.css";

const MobileMenu = ({ open, onClose }: Props) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Send a request to your server to invalidate the access token
      const response = await fetch("http://localhost:3000/api/v1/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const checkCookie = (name: string) => {
    return document.cookie
      .split(";")
      .some((item) => item.trim().startsWith(name + "="));
  };

  const accessTokenExists = checkCookie("access_token");

  return (
    <Box
      style={{ display: open ? "block" : "none" }}
      className={`mobile-menu ${open ? "open" : ""}`}
    >
      {accessTokenExists ? (
        <CustomButton
          type="button"
          variant="outlined"
          color="error"
          onClick={handleLogout}
          fullWidth
        >
          Logout
        </CustomButton>
      ) : (
        <>
          <Link to="/" style={{ textDecoration: "none" }}>
            <CustomButton
              type="button"
              variant="outlined"
              color="primary"
              onClick={onClose}
              fullWidth
            >
              Home
            </CustomButton>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <CustomButton
              type="button"
              variant="outlined"
              color="primary"
              onClick={onClose}
              fullWidth
            >
              Login
            </CustomButton>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <CustomButton
              type="button"
              variant="outlined"
              color="primary"
              onClick={onClose}
              fullWidth
            >
              Sign Up
            </CustomButton>
          </Link>
        </>
      )}
    </Box>
  );
};

export default MobileMenu;
