import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = ({ userId, setUserId }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleProfileNavigation = () => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken")
    setUserId(null);
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#eeeeee", color: "black" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 500,
              textTransform: "capitalize",
              cursor: "pointer",
              color: "black",
            }}
            onClick={() => handleNavigation("/")}
          >
            MealMeter
          </Typography>

          <Button
            color="inherit"
            sx={{
              textTransform: "capitalize",
              fontWeight: 500,
              padding: "10px",
            }}
            onClick={() => handleNavigation("/features")}
          >
            Our Features
          </Button>

          {userId ? (
            <>
            <Button
              color="inherit"
              sx={{ textTransform: "capitalize", fontWeight: 500, padding: "10px" }}
              onClick={handleProfileNavigation}
            >
              <AccountCircleIcon sx={{ marginRight: "8px", fontSize: "30px" }} />
              Profile
            </Button>

            <Button
              color="inherit"
              sx={{ textTransform: "capitalize", fontWeight: 500, padding: "10px" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
          ) : (
            <>
              <Button
                color="inherit"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 500,
                  padding: "10px",
                }}
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 500,
                  backgroundColor: "#a1dedc",
                  padding: "10px",
                }}
                onClick={() => handleNavigation("/sign-up")}
              >
                Start Now
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
