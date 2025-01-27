import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

const PortionPicker = ({ calories, selectedPortion, setSelectedPortion }) => {
  const [portions, setPortions] = useState([]);
  const [customPortion, setCustomPortion] = useState("");
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPortions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/fb/portions/${id}`);
        setPortions(response.data);
        if (response.data.length > 0) {
          setSelectedPortion(response.data[0][1]); 
        }
      } catch (error) {
        console.error("Error fetching portions:", error);
      }
    };
    if (id) {
      fetchPortions();
    }
  }, [id, apiUrl, setSelectedPortion]);

  const handlePortionChange = (event) => {
    const value = event.target.value;

    if (value === "custom") {
      setSelectedPortion(customPortion || "");
    } else {
      setSelectedPortion(value);
      setCustomPortion("");
    }
  };

  const handleCustomChange = (event) => {
    const value = event.target.value;
    setCustomPortion(value);
    setSelectedPortion(value);
  };

  return (
    <Card sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {calories} Calories
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Choose your portion size:
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Serving</InputLabel>
          <Select
            value={portions.some(([_, amount]) => amount === selectedPortion) ? selectedPortion : "custom"}
            label="Serving"
            onChange={handlePortionChange}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
              "&:hover": { borderColor: "#ff8c00" },
            }}
          >
            {portions.map(([label, amount], index) => (
              <MenuItem key={index} value={amount}>
                {`${label} / ${amount}`}
              </MenuItem>
            ))}
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>

        {/* Display custom input field if "Custom" is selected */}
        {selectedPortion === customPortion && (
          <TextField
            fullWidth
            variant="outlined"
            label="Enter custom portion"
            type="number"
            value={customPortion}
            onChange={handleCustomChange}
            sx={{
              marginTop: 2,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PortionPicker;
