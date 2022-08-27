import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { parseCookies } from "nookies";
import { useState } from "react";
import { SettingsPassword } from "../components/settings/settings-password";
const Account = (props) => {
  const [user, setUser] = useState(props.user);
  const [userShippingInfo, setShippingInfo] = useState(props.userShippingInfo);
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={user} />
              <SettingsPassword />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails userShippingInfo={userShippingInfo} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;

export async function getServerSideProps(context) {
  const { token } = parseCookies(context);
  const userResponse = await axios.get("http://localhost:3000/api/user", {
    headers: { Authorization: token },
  });
  const userShippingResponse = await axios.get(
    "http://localhost:3000/api/shippinginfo",
    {
      headers: { Authorization: token },
    }
  );
  return {
    props: {
      user: userResponse.data.user,
      userShippingInfo: userShippingResponse.data.shippingInfo,
    },
  };
}
