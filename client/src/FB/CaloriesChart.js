import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CaloriesChart = ({calories}) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const { id } = useParams();
  const [topValues, setTopValues] = useState([[]]);

  useEffect(() => {
    const fetchFbTopValues = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/fb/top_values/${id}`,
          {
            params: { id: id },
          }
        );
        const fetchedValues = response.data;
        const sumValues = fetchedValues.reduce((acc, value) => acc + value[1], 0);
        const otherValue = 1 - sumValues;
        setTopValues([...fetchedValues, ["Other", otherValue]]);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    
    if (id) {
      fetchFbTopValues();
    }
  }, [id, apiUrl]);


  
  const saturatedFattyAcids = [
    "4:0",
    "6:0",
    "8:0",
    "10:0",
    "12:0",
    "14:0",
    "16:0",
    "18:0",
  ];
  const monounsaturatedFattyAcids = ["16:1", "18:1", "20:1", "22:1"];
  const polyunsaturatedFattyAcids = [
    "18:2",
    "18:3",
    "18:4",
    "20:4",
    "20:5 n-3",
    "22:5 n-3",
    "22:6 n-3",
  ];

  const categorize = (value) => {
    if (saturatedFattyAcids.includes(value)) {
      return "Saturated Fatty Acids";
    }
    if (monounsaturatedFattyAcids.includes(value)) {
      return "Monounsaturated Fatty Acids";
    }
    if (polyunsaturatedFattyAcids.includes(value)) {
      return "Polyunsaturated Fatty Acids";
    }
    return value;
  };

  const categorizedData = topValues.reduce((acc, [label, value]) => {
    const category = categorize(label);
    if (!acc[category]) acc[category] = 0;
    acc[category] += value;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categorizedData),
    datasets: [
      {
        label: "Calories",
        data: Object.values(categorizedData).map(value => Math.round(value * 100)), 
        backgroundColor: [
          "#4caf50", "#2196f3", "#ff9800", "#9e9e9e", "#ff5722", "#8bc34a"
        ],
        hoverBackgroundColor: [
          "#388e3c", "#1976d2", "#f57c00", "#616161", "#d32f2f", "#7cb342"
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
  };

  return (
    <Box sx={{ textAlign: "center", width: "300px", margin: "0 auto" }}>
      <Typography variant="h6" gutterBottom>
        Calorie Breakdown
      </Typography>
      <Doughnut data={data} options={options} />
      <Typography
        sx={{
          position: "relative",
          top: "-140px",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        {calories[0]} cal
      </Typography>
    </Box>
  );
};

export default CaloriesChart;
