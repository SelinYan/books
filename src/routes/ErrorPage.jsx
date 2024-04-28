import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import { Box, Typography } from "@mui/material";

function ErrorPage() {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/4ca96afb-996b-41f7-bc05-dbfcbb389edb/K1WRrD2XA1.json",
    });
    return () => animation.destroy();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "50px",
      }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Box
        ref={animationContainer}
        sx={{
          width: 300,
          height: 300,
          mb: 2,
        }}></Box>
      <Typography>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable. <br />
        Click <a href="/">Home</a> to go back.
      </Typography>
    </Box>
  );
}

export default ErrorPage;
