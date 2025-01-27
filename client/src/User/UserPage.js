import { Box, Tab, Grid } from "@mui/material";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import MealHistory from "./MealHistory";
import UserMealInput from "./UserMealInput";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserHealthScore from "./UserHealthScore";
import HealthScale from "./HealthScale";

const UserPage = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Profile" value="1" />
            <Tab label="Health Score" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box
            sx={{
              padding: 4,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 4,
              maxWidth: 1200,
              margin: "auto",
              borderRadius: 2,
            }}
          >
            <UpdateProfile />

            <UserMealInput />
          </Box>

          <Box
            sx={{
              marginTop: 4,
              padding: 3,
              backgroundColor: "white",
              borderRadius: 2,

              maxWidth: 900,
              margin: "20px auto",
            }}
          >
            <MealHistory />
          </Box>
        </TabPanel>

        <TabPanel value="2">
          <Grid container spacing={3} justifyContent="center">
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12} md={6}>
                <UserHealthScore />
              </Grid>

              <Grid item xs={12} md={6}>
                <HealthScale />
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default UserPage;
