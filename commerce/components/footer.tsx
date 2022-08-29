import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="overline" color="#f8f5dbed">
      {"Copyright © ICOMMERCE WEBSITE "}
      <Link color="inherit" href="https://mui.com/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "60px",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          mt: "auto",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" color="#f8f5dbed">
            This is a Simple Ecommerce Website. We sell Electronics Gadgets
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
