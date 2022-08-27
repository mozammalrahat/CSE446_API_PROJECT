import React, { useState } from "react";
import {
  AppBar,
  Container,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Stack,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import DrawerComp from "./drawer";
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import MuiLink from "@mui/material/Link";
import useStyles from "../utils/styles";
const Header = ({ title, description, children }) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const classes = useStyles();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const logout = () => {
    cookie.remove("token");
    router.push("/login");
  };

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background: "white",
          fontSize: "30px",
          fontWeight: "bold",
          color: "black",
          fontFamily: "Georgia",
        }}
      >
        <Toolbar>
          <Link href="/">Icommerce</Link>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs sx={{ marginLeft: "30px", marginTop: "10px" }}>
                <Link href="/dashboard">
                  <Tab
                    label="Dashboard"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "solid black",
                      fontFamily: "Georgia",
                    }}
                  />
                </Link>
              </Tabs>

              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Link href="/">
                  <Tab
                    label="Products"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Georgia",
                    }}
                  />
                </Link>
                <Link href="/cart">
                  <Tab
                    label="Cart"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Georgia",
                    }}
                  />
                </Link>
                <Link href="/account">
                  <Tab
                    label="Profile"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Georgia",
                    }}
                  />
                </Link>
              </Tabs>

              <Stack direction="row" spacing={2}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  style={{
                    marginLeft: "10px",
                    border: " 2px solid #9e0000",
                    fontSize: "15px",
                    fontWeight: "1000",
                    color: "black",
                    fontFamily: "Georgia",
                  }}
                  sx={{}}
                  onClick={() => logout()}
                >
                  Logout
                </Button>
                {/* <Button sx={{ marginLeft: "10px" }} variant="contained">
                  SignUp
                </Button> */}
              </Stack>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container>{children!}</Container>
      <footer className={classes.footer}>
        <Typography>This is a simple API project for course CSE446</Typography>
      </footer>
    </React.Fragment>
  );
};

export default Header;
