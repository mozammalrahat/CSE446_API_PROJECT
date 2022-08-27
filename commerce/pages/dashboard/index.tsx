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

const Dashboard = ({ orders }) => {
  let totalCost = 0;
  let totalProductOrdered = 0;
  let recentProducts = orders[0].products;
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
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget totalOrders={totalOrders} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress totalProductOrdered={totalProductOrdered} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit totalCost={totalCost} sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts
                recentProducts={recentProducts}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders orders={orders} />
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
  const response = await axios.get("http://localhost:3000/api/order", {
    headers: { Authorization: token },
  });
  return {
    props: {
      orders: response.data.orderList,
    },
  };
}
