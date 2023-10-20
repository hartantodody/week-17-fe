import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DesktopMenu = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
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
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    console.log(cookies);
    return cookies.some((cookie) => cookie.startsWith(name + "="));
  };

  const accessTokenExists = checkCookie("access_token");
  return (
    <>
      {accessTokenExists ? (
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit" onClick={handleLogout}>
            Home
          </Button>
        </Link>
      ) : (
        <>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default DesktopMenu;
