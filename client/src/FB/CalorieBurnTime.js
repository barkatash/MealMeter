import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const CalorieBurnTime = ({ calories }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userWeight, setUserWeight] = useState(80);
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchUserWeight = async () => {
      const response = await axios.get(`${apiUrl}/api/user/weight/${userId}`);
      setUserWeight(response.data[0]);
    };
  
    const fetchActivities = async () => {
      const caloriesValue = calories ? Math.round(calories[0]) : null;
      if (caloriesValue != null && !isNaN(caloriesValue)) {
        try {
          const response = await axios.get(
            `${apiUrl}/api/activities/${caloriesValue}`,
            {
              params: { weight: userWeight },
            }
          );
          setActivities(response.data);
        } catch (error) {
          console.error("Error fetching activities:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    if (userId) {
      fetchUserWeight();
    }
  
    if (calories != null && !isNaN(calories[0])) {
      fetchActivities();
    }
  }, [calories, apiUrl, userId]);
  
  

  return (
    <Box sx={{ textAlign: "center", maxWidth: 800, margin: "auto" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Calorie Burn Time
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontStyle: "italic", color: "gray" }}
      >
        How to burn off {calories || "N/A"} calories in one hour activity?
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {activities?.map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#00796b" }}
                  >
                    {activity[1]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "gray", marginBottom: 1 }}
                  >
                    {Math.round(activity[2])} calories burned
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {activities.length === 0 && !loading && (
        <Box
          sx={{
            textAlign: "center",
            padding: "20px",
            maxWidth: 800,
            margin: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            No One Hour Activities Found
          </Typography>
        </Box>
      )}
      <Typography
        variant="caption"
        display="block"
        sx={{ mt: 3, color: "gray" }}
      >
        Based on weight of {userWeight} kg.
      </Typography>
    </Box>
  );
};

export default CalorieBurnTime;
