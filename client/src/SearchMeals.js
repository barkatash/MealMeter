import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchMeals = () => {
  const navigate = useNavigate();
  const [mealInput, setMealInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mealInput.trim()) {
      navigate(`/search/${mealInput}`);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#008c84",
        color: "white",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        This is a trusted food database
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Find nutrition facts and health score for your favourite meals and
        fast-food.
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          placeholder="Enter a food or a meal"
          variant="outlined"
          value={mealInput}
          onChange={(e) => setMealInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#a1dedc" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "400px",
            marginTop: "50px",
            backgroundColor: "white",
            borderRadius: "25px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
            },
            "& input::placeholder": {
              color: "#a1dedc",
            },
          }}
        />
        <Button
          type="submit"
          sx={{
            color: "white",
            backgroundColor: "#a1dedc",
            marginTop: "20px",
            borderRadius: "25px",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          Search
        </Button>
      </form>
    </Box>
  );
};

export default SearchMeals;
