import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";

const UserMealForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const { handleSubmit, control, register, formState, reset } = useForm();
  const { errors, isSubmitting } = formState;

  const [meals, setMeals] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/search`);
        if (!response.ok) throw new Error("Failed to fetch meals");
        const data = await response.json();
        setMeals(data.map(([id, name]) => ({ id, name })));
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, [apiUrl]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/api/user/${userId}/add-meal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit meal data");
      setShowSuccess(true);
      reset();
    } catch (error) {
      console.error("Error submitting meal data:", error);
    }
  };

  return (
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
        align="center"
        color="primary"
        fontWeight={700}
        mb={3}
      >
        Input Your Meal
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="fb"
              control={control}
              rules={{ required: "Meal name is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={meals}
                  getOptionLabel={(option) => option.name || ""}
                  onChange={(_, value) => field.onChange(value?.id || "")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Meal"
                      variant="outlined"
                      error={!!errors.fb}
                      helperText={errors.fb?.message}
                      sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("portion", {
                required: "Meal Weight is required",
                valueAsNumber: true,
                validate: (value) =>
                  value > 0 || "Portion Weight must be greater than zero",
              })}
              label="Meal Weight (grams)"
              variant="outlined"
              fullWidth
              type="number"
              error={!!errors.portion}
              helperText={errors.portion?.message}
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="date_time"
              control={control}
              defaultValue=""
              rules={{ required: "Date and Time are required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date and Time"
                  variant="outlined"
                  fullWidth
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: "2020-01-01T00:00",
                    max: new Date().toISOString().slice(0, 16),
                  }}
                  error={!!errors.date_time}
                  helperText={errors.date_time?.message}
                  sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                width: "100%",
                padding: "12px",
                fontSize: "1.1rem",
                borderRadius: 3,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add Meal"
              )}
            </Button>
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
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Meal submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserMealForm;
