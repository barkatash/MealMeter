import { Box, Button, Typography } from "@mui/material";
import './Login.css';
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({setUserId}) => {
  const { register, handleSubmit } = useForm();
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/api/login`, data);
      const { access_token, user_id } = response.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("userId", user_id);

      alert("Login successful!");
      setUserId(user_id);
      navigate("/");
      
    } catch (error) {
      alert("Login failed. Please check your email and password.");
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <form className="login-page" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: "30px",
            marginTop: "60px",
            lineHeight: 1.5,
            fontWeight: "600",
          }}
        >
          MAKE. IT. EASIER.
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginBottom: "35px",
            lineHeight: 1.5,
          }}
        >
          Keep all your meals and sports activities
          <br />
          information in one place for an easy checkout.
        </Typography>
        <Box sx={{ "& .MuiTextField-root": { m: 1, width: "70ch" } }}>
          <div>
            <TextField
              required
              {...register("email")}
              id="outlined-required"
              label="email"
              helperText="Enter email address"
            />
          </div>
          <div>
            <TextField
              required
              {...register("password")}
              id="outlined-required-password"
              label="password"
              helperText="Enter password"
              variant="filled"
              type="password"
            />
          </div>
          <div>
            <Button
              variant="contained"
              type="submit"
              sx={{
                color: "#fff",
                width: "58ch",
                margin: "40px",
                fontWeight: "600",
                fontSize: "1.1rem",
                borderRadius: "30px",
                backgroundColor: "#008c84",
                padding: "10px",
              }}
            >
              LOG IN
            </Button>
          </div>
        </Box>
      </Box>
    </form>
  );
};

export default Login;
