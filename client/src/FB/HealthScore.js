import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, LinearProgress } from "@mui/material";
import { EmojiEmotions, SentimentSatisfied, SentimentDissatisfied } from "@mui/icons-material";
import axios from "axios";

const HealthScore = () => {
  const { id } = useParams();
  const [score, setScore] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchHealthScore = async () => {
      const response = await axios.get(`${apiUrl}/api/fb/${id}/score`, {
        params: { id: id },
      });
      setScore(Math.round(response.data[0][0]));
    };
    if (id) {
      fetchHealthScore();
    }
  }, [id, apiUrl]);

  const getScoreColor = (score) => {
    if (score >= 70) return "green";
    if (score >= 45) return "orange";
    return "red";
  };

  const getHealthMessage = (score) => {
    if (score >= 70) return "Excellent: This meal is very healthy!";
    if (score >= 45) return "Good: This meal is moderately healthy.";
    return "Poor: This meal is not very healthy.";
  };

  const getHealthIcon = (score) => {
    if (score >= 70) return <EmojiEmotions sx={{ color: "green", fontSize: 40 }} />;
    if (score >= 45) return <SentimentSatisfied sx={{ color: "orange", fontSize: 40 }} />;
    return <SentimentDissatisfied sx={{ color: "red", fontSize: 40 }} />;
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        textAlign: "center",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 4,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fafafa",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Health Score
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          marginBottom: 2,
        }}
      >
        {getHealthIcon(score)}
        <Typography
          variant="h4"
          sx={{ color: getScoreColor(score), fontWeight: "bold" }}
        >
          {score}
        </Typography>
        <Typography>/ 100</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={score}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#f5f5f5",
          "& .MuiLinearProgress-bar": {
            backgroundColor: getScoreColor(score),
          },
        }}
      />
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {getHealthMessage(score)}
      </Typography>
      <Typography
        variant="caption"
        sx={{ display: "block", marginTop: 1, color: "#666" }}
      >
        The higher the score, the healthier the meal!
      </Typography>
    </Box>
  );
};

export default HealthScore;
