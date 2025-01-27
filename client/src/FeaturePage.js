import React from "react";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { CheckCircleOutline, Update, Public, Label, Fastfood, GridView } from "@mui/icons-material";

const FeatureItem = ({ icon: Icon, title, description }) => (
  <Paper elevation={2} style={{ padding: "16px", textAlign: "center" }}>
    <Icon style={{ fontSize: 40, marginBottom: 8, color: "#4caf50" }} />
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2">{description}</Typography>
  </Paper>
);

const FeaturesPage = () => {
  return (
    <Box p={4} style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Features
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <FeatureItem
            icon={CheckCircleOutline}
            title="No duplicate foods"
            description="Find the food you're looking for once!"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureItem
            icon={Update}
            title="Up-to-date"
            description="We update the food database continually."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureItem
            icon={Public}
            title="Multi-region"
            description="Localized databases for the United States with more to come."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureItem
            icon={Label}
            title="Tags"
            description="Build complex logic using tags to identify foods."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureItem
            icon={Fastfood}
            title="Restaurants"
            description="Extensive coverage of fast-food chains and restaurants."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FeatureItem
            icon={GridView}
            title="Categories"
            description="Browse the database using our category tree."
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#ff9800", color: "#fff", fontWeight: "bold" }}
        >
          HAVE A QUESTION? CONTACT US
        </Button>
      </Box>
    </Box>
  );
};

export default FeaturesPage;
