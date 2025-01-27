import { Box, Button, Typography, Grid, Snackbar, Alert } from "@mui/material";
import "./SignUp.css";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { useState } from "react";

import { useNavigate } from "react-router-dom";



export const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const apiUrl = process.env.REACT_APP_API_URL;
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.dob = dayjs(data.dob).format("YYYY-MM-DD");
    try {
      const response = await fetch(`${apiUrl}/api/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setShowSuccess(true);
      console.log(data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const password = watch("password");

  return (
    <>
      <form className="login-page" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          style={{ height: "70vh" }}
        >
          <Grid item xs={4}>
            <Typography
              variant="h4"
              sx={{
                marginBottom: "20px",
                lineHeight: 1.5,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              MAKE.
              <br /> IT. <br /> EASIER.
            </Typography>
            <Typography
              variant="h5"
              sx={{
                marginBottom: "20px",
                lineHeight: 1.5,
                textAlign: "center",
                fontSize: "1.1rem",
              }}
            >
              Access all of your meals
              <br /> in one place available.
            </Typography>
            <Typography
              variant="h5"
              sx={{
                marginBottom: "20px",
                lineHeight: 1.5,
                textAlign: "center",
                fontSize: "1.1rem",
              }}
            >
              Create a healthy lifestyle <br />
              or meet specific dietary goals.
            </Typography>
            <Typography
              variant="h5"
              sx={{
                marginBottom: "20px",
                marginTop: "30px",
                lineHeight: 1.5,
                textAlign: "center",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              Already have an account?
            </Typography>
            <Button
              variant="contained"
              sx={{
                color: "#fff",
                fontWeight: "700",
                fontSize: "0.8rem",
                borderRadius: "30px",
                backgroundColor: "#008c84",
                padding: "15px",
                marginLeft: "210px",
              }}
              component={Link}
              to="/login"
            >
              LOG IN
            </Button>
          </Grid>
          <Grid item xs={8}>
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
                CREATE YOUR ACCOUNT
              </Typography>

              <Box sx={{ "& .MuiTextField-root": { m: 1, width: "70ch" } }}>
                <div>
                  <TextField
                    required
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    id="email"
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={
                      errors.email
                        ? errors.email.message
                        : "Enter email address"
                    }
                  />
                </div>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer required components={["DatePicker"]}>
                      <Controller
                        name="dob"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Birthdate is required" }}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            label="Enter your birth date"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={!!errors.birthDate}
                                helperText={errors.birthDate?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </Box>
              <Box sx={{ "& .MuiTextField-root": { m: 1, width: "34ch" } }}>
                <TextField
                  {...register("first_name")}
                  required
                  id="first-name"
                  label="First Name"
                  helperText="Enter your first name"
                  fullWidth
                />

                <TextField
                  required
                  {...register("last_name")}
                  id="last-name"
                  label="Last Name"
                  helperText="Enter your last name"
                  fullWidth
                />
              </Box>
              <Box sx={{ "& .MuiTextField-root": { m: 1, width: "34ch" } }}>
                <TextField
                  required
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: "password must have at least 8 characters",
                    },
                  })}
                  id="password"
                  type="password"
                  label="Password"
                  helperText={
                    errors.password ? errors.password.message : "Enter password"
                  }
                  fullWidth
                />
                <TextField
                  required
                  type="password"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "passwords do not match",
                  })}
                  id="confirm-password"
                  label="Confirm Password"
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.message
                      : "Enter password again"
                  }
                  fullWidth
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    "& .MuiTextField-root": { m: 1, width: "34ch" },
                  }}
                >
                  <TextField
                    required
                    {...register("weight")}
                    id="weight"
                    type="number"
                    label="Weight"
                    helperText="Enter your weight"
                    fullWidth
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "34ch",
                      marginTop: "8px",
                    }}
                  >
                    <Select
                      labelId="gender-select-label"
                      id="gender-select"
                      defaultValue=""
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      fullWidth
                    >
                      <MenuItem value="M">Male</MenuItem>
                      <MenuItem value="F">Female</MenuItem>
                    </Select>

                    <Typography
                      variant="caption"
                      color={errors.gender ? "error" : "text.secondary"}
                      sx={{ mt: 0.5 }}
                    >
                      {errors.gender
                        ? errors.gender.message
                        : "Enter your gender"}
                    </Typography>
                  </Box>
                </Box>


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
                    SIGN UP
                  </Button>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setShowSuccess(false)
            navigate("/login")
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Sign-up successful! Please log in.
        </Alert>
      </Snackbar>
    </>
  );
};
