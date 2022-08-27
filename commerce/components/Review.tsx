import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { ListItemAvatar } from "@mui/material";
import { Transaction } from "./dashboard/transaction";
import { Address } from "./dashboard/address";
export default function Review({ order }) {
  return (
    <React.Fragment>
      <hr />
      <Typography
        style={{ color: "#293462" }}
        align="center"
        variant="subtitle1"
        gutterBottom
      >
        ORDER SUMMARY
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ color: "#293462" }}
        align="center"
        gutterBottom
      >
        Order will be shipmented within 2 days
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
