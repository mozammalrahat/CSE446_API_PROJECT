import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';



export default function Review({order}) {
  return (
    <React.Fragment>
      <hr/>
      <Typography align='center' variant="h4" gutterBottom>
        Order summary
      </Typography>
      <Typography align='center' variant="h6" gutterBottom>
        Order will be shipmented within 2 days
      </Typography>
      <List disablePadding>
      <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Product Name" />
            <Typography variant="body2">Price &nbsp;&nbsp;&nbsp;&nbsp;   </Typography>
            <Typography variant="body2">Quantity</Typography>
          </ListItem>

        {order.products.map((product) => (
          <ListItem key={product.productId.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.productId.name} />
            <Typography variant="body2">{`${product.price} `}&nbsp; &nbsp;&nbsp;&nbsp;</Typography>
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{`House: ${order.shippingInfo.house} Street: 
                                    ${order.shippingInfo.street} City: ${order.shippingInfo.city} Zip: ${order.shippingInfo.zip}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {
              <React.Fragment key={order.transactionId}>
                <Grid item >
                  <Typography gutterBottom>{`Transaction ID: ${order.transactionId}`}</Typography>
                </Grid>
              </React.Fragment>
            }
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}