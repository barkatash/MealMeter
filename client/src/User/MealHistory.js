import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Pagination,
} from "@mui/material";

const MealHistory = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [mealHistory, setMealHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const mealResponse = await fetch(`${apiUrl}/api/user/${userId}/fb-history`);
        const mealData = await mealResponse.json();
        setMealHistory(mealData);
        setTotalPages(Math.ceil(mealData.length / 5)); // Assuming 5 meals per page
      } catch (error) {
        console.error("Error fetching meal history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [apiUrl, userId]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const mealsPerPage = 5;
  const paginatedMeals = mealHistory.slice((page - 1) * mealsPerPage, page * mealsPerPage);

  return (
    <Paper
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "auto",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#1976d2",
          fontWeight: "bold",
          marginBottom: 3,
        }}
      >
        Your Meal History
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <List>
            {paginatedMeals.length > 0 ? (
              paginatedMeals.map((meal, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      paddingY: 2,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {meal[0]}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body1" sx={{ marginTop: 0.5 }}>
                            Portion Weight: {meal[1]} grams
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {new Date(meal[2]).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ marginTop: 2 }}
              >
                No meal history available. Start logging your meals!
              </Typography>
            )}
          </List>

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default MealHistory;
