import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Slide } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import useWindowDimensions from "../components/isEndOfScroll";

function Copyright() {
  return (
    <Typography
      variant="overline"
      color="#f8f5dbed"
      style={{ marginLeft: "130px" }}
    >
      {"Copyright © ICOMMERCE WEBSITE "}
      <Link color="inherit" href="https://mui.com/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  const isEnd = useWindowDimensions();

  return (
    <Slide direction="up" in={isEnd}>
      <Box
        sx={{
          marginTop: "calc(10% + 60px)",
          width: "100%",
          position: "fixed",
          bottom: 0,

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
            <Typography
              variant="body1"
              color="#f8f5dbed"
              style={{ marginLeft: "200px" }}
            >
              Tarik Mozammal
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </Slide>
  );
}
