import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const HomePageFooter = () => {
  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
        padding: "80px 0",
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "275px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          zIndex: 1,
        }}
      />
      
      <Container sx={{ position: "relative", zIndex: 2, color: "white" }}>
        <Typography
          variant="h5"
          sx={{
            marginBottom: "20px",
            fontWeight: 700,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Stay Connected
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: "20px",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
          }}
        >
          Follow us on social media
        </Typography>
      </Container>

      <Box
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          zIndex: 2,
        }}
      >
        <Stack direction="row" spacing={2}>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            sx={{
              color: "#3b5998",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              padding: "10px",
              '&:hover': { backgroundColor: "#3b5998", color: "white" }
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            sx={{
              color: "#1da1f2",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              padding: "10px",
              '&:hover': { backgroundColor: "#1da1f2", color: "white" }
            }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            sx={{
              color: "#e4405f",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              padding: "10px",
              '&:hover': { backgroundColor: "#e4405f", color: "white" }
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePageFooter;
