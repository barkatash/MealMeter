import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import CrownIcon from "@mui/icons-material/EmojiEvents";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const FBInfo = () => {
  const { id } = useParams();
  const[fbCategory, setFbCategory] = useState([]);
  const[fbName, setFbName] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, nameResponse] = await Promise.all([
          axios.get(`${apiUrl}/api/fb/category/${id}`, {
            params: { food_id: id },
          }),
          axios.get(`${apiUrl}/api/fb/${id}`, {
            params: { food_id: id },
          }),
        ]);
        setFbCategory(categoryResponse.data);
        setFbName(nameResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    if (id) {
      fetchData();
    }
  }, [id]);
  

  return (
    <Box
      sx={{
        backgroundColor: "#008c84",
        color: "white",
        display: "flex",
        alignItems: "center",
        padding: 2,
        minHeight: "15vh",
      }}
    >

      <Avatar
        sx={{
          backgroundColor: "white",
          color: "#008c84",
          width: 60,
          height: 60,
          marginRight: 2,
        }}
      >
        <CrownIcon fontSize="large" />
      </Avatar>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {fbName}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {fbCategory[0]}
        </Typography>
      </Box>
    </Box>
  );
};

export default FBInfo;
