import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Box,
  ListItemButton,
  Typography,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FoodAndBeveragesList = () => {
  const [foodAndBeverages, setFoodAndBeverages] = useState([]);
  const { foodName } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/search`, {
          params: { foodName: foodName },
        });
        setFoodAndBeverages(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    if (foodName) {
      fetchFoods();
    }
  }, [foodName]);

  return (
    <Box sx={{ maxWidth: "70%", bgcolor: "background.paper" }}>
      <List>
      {foodAndBeverages.length === 0 && (
          <Tooltip title="No food items found" arrow>
            <Box
              sx={{
                backgroundColor: "#FFCDD2", 
                padding: "10px 20px",
                borderRadius: "4px",
                width: "fit-content",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" sx={{ color: "#C62828", fontWeight: "bold" }}>
                No Matching Results
              </Typography>
            </Box>
          </Tooltip>
        )}
        {foodAndBeverages.map((item, index) => (
          <div key={item.ID}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  bgcolor: "#e0e0e0",
                  borderRadius: "8px",
                  '&:hover': {
                    bgcolor: "#eeeeee",
                  },
                  marginY: 1,
                }}
                onClick={() => {
                  navigate(`/food-and-beverages/${item[0]}`);
                }}
              >
                <ListItemText
                  primary={<Typography variant="h6">{item[1]}</Typography>}
                  secondary={
                    <Typography
                      variant="body2"
                      color="inherit"
                      style={{ fontSize: "12px" }}
                    >
                      {typeof item[2] !== "number" && <Box>{item[2]}</Box>}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            {index < foodAndBeverages.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Box>
  );
};

export default FoodAndBeveragesList;
