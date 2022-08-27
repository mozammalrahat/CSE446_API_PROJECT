import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import cookie from "js-cookie";
export const AccountProfileDetails = ({ userShippingInfo }) => {
  const [shippingInfo, setShippingInfo] = useState({
    house: userShippingInfo.house,
    street: userShippingInfo.street,
    city: userShippingInfo.city,
    zip: userShippingInfo.zip,
    phone: userShippingInfo.phone,
    account: userShippingInfo.account,
    bank_secret: userShippingInfo.bank_secret,
  });
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (event) => {
    setShippingInfo({
      ...shippingInfo,
      [event.target.name]: event.target.value,
    });
  };
  const handleShippingInfo = async () => {
    await axios
      .patch(
        "http://localhost:3000/api/shippinginfo",
        {
          shippingInfo,
        },
        {
          headers: { Authorization: cookie.get("token") },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUpdate(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <form autoComplete="off" noValidate {...userShippingInfo}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the house name"
                label="House"
                name="house"
                onChange={handleChange}
                required
                value={shippingInfo.house}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Street"
                name="street"
                onChange={handleChange}
                required
                value={shippingInfo.street}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={handleChange}
                required
                value={shippingInfo.city}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={shippingInfo.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Zip Code"
                name="zip"
                onChange={handleChange}
                required
                value={shippingInfo.zip}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Bank Account"
                name="account"
                onChange={handleChange}
                required
                value={shippingInfo.account}
                variant="outlined"
              ></TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Bank Security Code"
                name="bank_secret"
                onChange={handleChange}
                type="password"
                required
                value={shippingInfo.bank_secret}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
        </CardContent>
        {error && <Alert severity="error">{error}</Alert>}
        {update && (
          <Alert severity="success">Information Updated Successfully</Alert>
        )}
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleShippingInfo()}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
