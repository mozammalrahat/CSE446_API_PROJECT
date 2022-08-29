import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { ListItemAvatar } from "@mui/material";
import { Transaction } from "../../../components/dashboard/transaction";
import { Address } from "../../../components/dashboard/address";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "js-cookie";
import { parseCookies } from "nookies";
export default function ViewOrder({ order }) {
  return (
    <React.Fragment>
      <Typography
        style={{ color: "#293462" }}
        align="center"
        variant="subtitle1"
        gutterBottom
        paddingTop="120px"
      >
        ORDER SUMMARY OF ID: {order._id}
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ color: "#293462" }}
        align="center"
        gutterBottom
      >
        <hr />
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText variant="subtitle2" primary="Product Name" />
          <Typography variant="subtitle2">
            Price &nbsp;&nbsp;&nbsp;&nbsp;{" "}
          </Typography>
          <Typography variant="subtitle1">Quantity</Typography>
        </ListItem>

        {order.products.map((product) => (
          <ListItem
            alignItems="flex-start"
            key={product.productId.name}
            sx={{ py: 1, px: 0 }}
          >
            <ListItemText primary={product.productId.name} />
            <Typography variant="body2">
              {`${product.price} `}&nbsp;&nbsp;
            </Typography>
            <Typography variant="body2">{`x${product.quantity}`}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {order.totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid spacing={0} alignItems="center">
        <Grid>
          <Address
            house={order.shippingInfo.house}
            street={order.shippingInfo.street}
            city={order.shippingInfo.city}
            zip={order.shippingInfo.zip}
            titleText="Address : "
          />
        </Grid>
        <Grid>
          <Transaction
            titleText="TRANSACTION ID : "
            transactionID={order.transactionId}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export const getServerSideProps = async (context: any) => {
  const { token } = parseCookies(context);
  const { params } = context;
  console.log(params);
  const { orderId } = params;
  const orderResponse = await axios.get(
    `http://localhost:3000/api/orders/${orderId}`,
    {
      headers: { Authorization: token },
    }
  );

  return {
    props: {
      order: orderResponse.data.order,
    },
  };
};
