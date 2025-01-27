import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  Filler,
  PointElement,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  Filler,
  PointElement,
  annotationPlugin
);

const RdiChart = ({selectedPortion}) => {
  const { id } = useParams();
  const [rdi, setRdi] = useState([[]]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRdi = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/fb/rdi/${id}`, {
          params: { id: id, weight: selectedPortion !== "" ? selectedPortion : 100 },
        });
        setRdi(response.data);
      } catch (error) {
        console.error("Error fetching RDI:", error);
      }
    };

    fetchRdi();
  }, [id, apiUrl, selectedPortion]);

  const chartData = {
    labels: rdi.map(([nutrient]) => nutrient),
    datasets: [
      {
        label: "RDI Percentage",
        data: rdi.map(([_, value]) => (value * 100).toFixed(2)),
        backgroundColor: "#3f51b5",
        borderColor: "#3f51b5",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Recommended Daily Intake (RDI) by Nutrient",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`,
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 100,
            yMax: 100,
            borderColor: "red",
            borderWidth: 2,
            label: {
              display: true,
              content: "100%",
              position: "end",
              backgroundColor: "red",
              color: "white",
            },
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Nutrient",
        },
      },
      y: {
        title: {
          display: true,
          text: "RDI Percentage",
        },
        min: 0,
        max: 110,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold"}}>
        Recommended Daily Intake (RDI)
      </Typography>
      <div style={{ margin: "auto", width: "100%", height: "385px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RdiChart;
