import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Card, CardContent, CardHeader, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";

const UserHealthScore = () => {
  const [healthScore, setHealthScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = Number(localStorage.getItem("userId"));
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchHealthScore = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/${userId}/score`);
        setHealthScore(Math.round(response.data[0] * 100));
      } catch (err) {
        setError("Failed to get health score, try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHealthScore();
  }, [apiUrl, userId]);

  const getScoreColor = (score) => {
    if (score >= 70) return "green";
    if (score >= 45) return "orange";
    return "red";
  };

  return (
    <Card sx={{  margin: "0 auto", mt: 3, borderRadius: 4 }}>
      <CardHeader
        title="Your Overall Health Score"
        titleTypographyProps={{ variant: "h6" }}
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        <Box sx={{ textAlign: "center" }}>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>
              <Typography variant="h4" sx={{ color: getScoreColor(healthScore), marginBottom: 2 }}>
                {healthScore} / 100
              </Typography>
              <Typography variant="body2" gutterBottom>
                Based on your meal choices:
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center" direction="row">
                  <Grid item>
                    <CheckCircleIcon sx={{ fontSize: 24, color: "green" }} />
                    <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                      Excellent
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      You're eating very healthy meals!
                    </Typography>
                  </Grid>
                  <Grid item>
                    <CheckCircleIcon sx={{ fontSize: 24, color: "orange" }} />
                    <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                      Good
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      Your meals are moderately healthy.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <ErrorIcon sx={{ fontSize: 24, color: "red" }} />
                    <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                      Poor
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      Consider healthier meal options.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserHealthScore;
