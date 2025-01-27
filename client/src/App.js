import "./App.css";
import Navbar from "./Navbar";
import SearchMeals from "./SearchMeals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodAndBeveragesPage from "./FB/FoodAndBeveragesPage";
import FoodAndBeveragesList from "./FB/FoodAndBeveragesList";
import HomePageFooter from "./HomePageFooter";
import Login from "./User/Login";
import { Box } from "@mui/material";
import { SignUp } from "./User/SignUp";
import FeaturesPage from "./FeaturePage";
import UserMealInput from "./User/UserMealInput";
import UserPage from "./User/UserPage";
import { useEffect, useState } from "react";

const App = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar userId={userId} setUserId={setUserId}/>
              <SearchMeals />
              <HomePageFooter />
            </>
          }
        />
        <Route
          path="/features"
          element={
            <>
              <Navbar userId={userId} setUserId={setUserId}/>
              <FeaturesPage />
            </>
          }
        />
        <Route
          path="/search/:foodName"
          element={
            <>
              <Navbar userId={userId} setUserId={setUserId}/>
              <SearchMeals />
              <Box sx={{ marginLeft: "5%", padding: "2%" }}>
                <FoodAndBeveragesList />
              </Box>
            </>
          }
        />
        <Route
          path="/food-and-beverages/:id"
          element={
            <>
              <Navbar userId={userId} setUserId={setUserId}/>
              <FoodAndBeveragesPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar userId={userId} setUserId={setUserId}/>
              <Login setUserId={setUserId}/>
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Navbar userId={userId} setUserId={setUserId}/>
              <SignUp />
            </>
          }
        />
        <Route
          path="/user/add-meal"
          element={
            <>
              <Navbar userId={userId} setUserId={setUserId}/>
              <UserMealInput />
            </>
          }
        />
        <Route
          path="/user/:id"
          element={
            <>
              <Navbar userId={userId} setUserId={setUserId}/>
              <UserPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
