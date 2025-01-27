import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import PersonIcon from "@mui/icons-material/Person";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const UpdateProfile = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm();
  const userId = localStorage.getItem("userId");

  const handleUpdateProfile = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/api/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setShowSuccess(true);
      reset();
    } catch (error) {
      console.error("Error updating profile:", error);
      setShowError(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
    setShowError(false);
  };

  return (
    <>
      <Box
        sx={{
          margin: "auto",
          padding: 4,
          height: "370px",
          bgcolor: "#fff",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "#1976d2",
            fontWeight: 700,
            marginBottom: 3,
          }}
        >
          Update Your Profile
        </Typography>

        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("first_name")}
                label="First Name"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register("last_name")}
                label="Last Name"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("weight", {
                  valueAsNumber: true,
                  validate: (value) => value > 0 || "Weight must be greater than zero",
                })}
                label="Weight (kg)"
                variant="outlined"
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FitnessCenterIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "1.1rem",
                  borderRadius: "30px",
                  marginTop: "15%",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{ width: "100%" }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          icon={<ErrorIcon fontSize="inherit" />}
          sx={{ width: "100%" }}
        >
          Failed to update profile. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateProfile;
