import { useState, useEffect } from "react";
import { Box, LinearProgress, Typography, Card, CardContent, CardHeader, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";

const HealthScale = () => {
  const [relativeScore, setRelativeScore] = useState(0);
  const [error, setError] = useState(null);
  const userId = Number(localStorage.getItem("userId"));
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchHealthScore = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/user/${userId}/relative-score`
        );
        setRelativeScore(Math.round(response.data[0] * 100));
      } catch (err) {
        setError("Failed to get health score, try again later.");
      } 
      finally {
      }
    };

    fetchHealthScore();
  }, [apiUrl, userId]);

  const getColor = () => {
    if (relativeScore >= 50) return "success.main";
    if (relativeScore >= 20) return "warning.main";
    return "error.main";
  };

  return (
    <Card sx={{ margin: "0 auto", mt: 3, borderRadius: 4, height: "312px" }}>
      <CardHeader
        title="Relative Score to Other Users"
        titleTypographyProps={{ variant: "h6" }}
        sx={{ textAlign: "center" }}
      />
      <CardContent>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "red" }}>
              Worse
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "green" }}>
              Better{" "}
            </Typography>
          </Box>

          <Box sx={{ position: "relative" }}>
            <LinearProgress
              variant="determinate"
              value={relativeScore}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getColor(),
                },
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: "-12px",
                left: `${relativeScore}%`,
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                backgroundColor: "white",
                padding: "0px 8px",
                borderRadius: 8,
                boxShadow: 2,
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {relativeScore}%
              </Typography>

              <PersonIcon sx={{ fontSize: 14 }} />
            </Box>
          </Box>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
              <EmojiPeopleIcon sx={{ fontSize: 18, color: "green", verticalAlign: "middle", mr: 1 }} />
              The higher your relative score, the better your nutrition compared to other users.
            </Typography>
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <CheckCircleIcon sx={{ fontSize: 24, color: "green" }} />
                <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
                  Healthy Nutrition
                </Typography>
              </Grid>
              <Grid item>
                <ErrorIcon sx={{ fontSize: 24, color: "red" }} />
                <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
                  Needs Improvement
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
              <strong>Tip:</strong> A higher score means you are closer to a healthier lifestyle compared to others. Keep up the good work!
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HealthScale;
