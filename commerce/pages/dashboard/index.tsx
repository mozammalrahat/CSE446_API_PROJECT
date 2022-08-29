import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../../components/dashboard/budget";
import { LatestOrders } from "../../components/dashboard/latest-orders";
import { LatestProducts } from "../../components/dashboard/latest-products";
import { Sales } from "../../components/dashboard/sales";
import { TasksProgress } from "../../components/dashboard/tasks-progress";
import { TotalCustomers } from "../../components/dashboard/total-customers";
import { TotalProfit } from "../../components/dashboard/total-profit";
import { TrafficByDevice } from "../../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../../components/dashboard-layout";
import axios from "axios";
import { parseCookies } from "nookies";
import { AccountBalance } from "../../components/dashboard/accountBalance";

const Dashboard = ({ orders, bankInformation, user }) => {
  let totalCost = 0;
  let totalProductOrdered = 0;
  let recentProducts;
  if (orders[0] !== undefined) recentProducts = orders[0].products;
  console.log("Recent Products are: ", recentProducts);

  orders.forEach((order) => {
    totalCost += order.totalPrice;
    order.products.forEach((p) => {
      totalProductOrdered += p.quantity;
    });
  });
  console.log("Total Cost", totalCost);
  const totalOrders = orders.length;
  console.log("Total Orders : ", totalOrders);
  console.log("Total Product Orders: ", totalProductOrdered);
  console.log("Product of first order: ", recentProducts);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <br />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid paddingTop="30px" container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget totalOrders={totalOrders} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress totalProductOrdered={totalProductOrdered} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit totalCost={totalCost} sx={{ height: "100%" }} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <AccountBalance
                user={user}
                bankInformation={bankInformation}
                sx={{ height: "100%" }}
              />
            </Grid>
            {/* <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: "100%" }} />
            </Grid> */}
            <Grid item lg={4} md={6} xl={3} xs={12}>
              {orders[0] !== undefined && (
                <LatestProducts
                  recentProducts={recentProducts}
                  sx={{ height: "100%" }}
                />
              )}
            </Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              <LatestOrders user={user} allOrders={orders} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;

export async function getServerSideProps(context) {
  const { token } = parseCookies(context);
  let userResponse;
  let user;
  let orderResponse;
  let shippingResponse;
  let account;
  let bankResponse;
  userResponse = await axios.get("http://localhost:3000/api/user", {
    headers: { Authorization: token },
  });
  user = userResponse.data.user;
  if (user.userType === "customer") {
    orderResponse = await axios.get("http://localhost:3000/api/order", {
      headers: { Authorization: token },
    });
    shippingResponse = await axios.get("http://localhost:3000/api/shipping", {
      headers: { Authorization: token },
    });
    account = shippingResponse.data.userShipping.account;
    bankResponse = await axios.get(
      `http://localhost:3001/bank/accounts/${account}`,
      {}
    );
  } else {
    orderResponse = await axios.get("http://localhost:3000/api/orders", {
      headers: { Authorization: token },
    });
    bankResponse = await axios.get(
      `http://localhost:3001/bank/accounts/${process.env.ecommerce_account}`,
      {}
    );
  }
  return {
    props: {
      orders: orderResponse.data.orders,
      bankInformation: bankResponse.data.accountDetails,
    },
  };
}
