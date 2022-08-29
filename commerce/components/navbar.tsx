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
import StickyFooter from "./footer";
import Footer from "./footer";
const Header = ({ title, description, children }) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const classes = useStyles();
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const logout = () => {
    cookie.remove("token");
    router.push("/login");
  };

  return (
    <React.Fragment>
      <AppBar
        style={{
          backgroundColor: "black",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#f8f5dbed",
          fontFamily: "Georgia",
          paddingTop: "10px",
          paddingBottom: "10px",
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
              <Tabs
                // value={value}
                // indicatorColor="secondary"
                sx={{ marginLeft: "30px", marginTop: "10px" }}
              >
                <Link href="/dashboard">
                  <Tab
                    value={0}
                    label="Dashboard"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      fontFamily: "Georgia",
                    }}
                    //   onChange={(e, value) => handleChange(e, value)}
                    //
                  />
                </Link>
              </Tabs>

              <Tabs
                value={value}
                indicatorColor="secondary"
                sx={{ marginLeft: "auto" }}
                textColor="inherit"
              >
                <Link href="/">
                  <Tab
                    value={1}
                    label="Products"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Georgia",
                    }}
                    onChange={(value) => handleChange(value)}
                  />
                </Link>
                <Link href="/cart">
                  <Tab
                    value={2}
                    label="Cart"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Georgia",
                    }}
                    onChange={(value) => handleChange(value)}
                  />
                </Link>
                <Link href="/account">
                  <Tab
                    value={3}
                    label="Profile"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Georgia",
                    }}
                    onChange={(value) => handleChange(value)}
                  />
                </Link>
              </Tabs>

              <Stack direction="row" spacing={2}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {router.pathname !== "/login" ? (
                  <Button
                    style={{
                      marginLeft: "10px",
                      border: " 2px solid white",
                      fontSize: "15px",
                      fontWeight: "1000",
                      color: "#f8f5dbed",
                      fontFamily: "Georgia",
                      backgroundColor: "black",
                    }}
                    sx={{}}
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    style={{
                      marginLeft: "10px",
                      border: " 2px solid white",
                      fontSize: "15px",
                      fontWeight: "1000",
                      color: "#f8f5dbed",
                      fontFamily: "Georgia",
                      backgroundColor: "black",
                    }}
                    sx={{ marginLeft: "10px" }}
                    variant="contained"
                  >
                    SignUp
                  </Button>
                )}
              </Stack>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container>{children!}</Container>

      <StickyFooter />
    </React.Fragment>
  );
};

export default Header;
