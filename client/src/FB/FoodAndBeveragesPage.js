import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MealValues from "./MealValues";
import MealIngredients from "./MealIngredients";
import CaloriesChart from "./CaloriesChart";
import FBInfo from "./FBInfo";
import RdiChart from "./RdiChart";
import CalorieBurnTime from "./CalorieBurnTime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PortionPicker from "./PortionPicker";
import { Typography, Card, CardContent, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HealthScore from "./HealthScore";

const FoodAndBeveragesPage = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [selectedPortion, setSelectedPortion] = useState("");
  const [calories, setCalories] = useState([]);
  useEffect(() => {
    const fetchFbCalories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/fb/calories/${id}`, {
          params: {
            id: id,
            weight: selectedPortion !== "" ? selectedPortion : 100,
          },
        });
        setCalories(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    if (id) {
      fetchFbCalories();
    }
  }, [id, apiUrl, selectedPortion]);

  return (
    <Box>
      <FBInfo />
      <Box sx={{ padding: 3 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Information" value="1" />
              <Tab label="Nutrition Results" value="2" />
              <Tab label="Health Score" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={3} sx={{ marginBottom: 3 }}>
              <Grid item xs={12} md={4}>
                <PortionPicker
                  calories={calories}
                  selectedPortion={selectedPortion}
                  setSelectedPortion={setSelectedPortion}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <CalorieBurnTime calories={calories} />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ marginBottom: 4 }}>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", marginBottom: 2 }}
                    >
                      Nutritional Values
                    </Typography>
                    <MealValues selectedPortion={selectedPortion} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", marginBottom: 2 }}
                    >
                      Meal Ingredients
                    </Typography>
                    <MealIngredients selectedPortion={selectedPortion} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}
            >
              <Box sx={{ flex: 1 }}>
                <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", marginBottom: 2 }}
                    >
                      Calories Chart
                    </Typography>
                    <CaloriesChart
                      calories={calories}
                      setCalories={setCalories}
                    />
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                  <CardContent>
                    <RdiChart selectedPortion={selectedPortion} />
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <HealthScore />
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default FoodAndBeveragesPage;
