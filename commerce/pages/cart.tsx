import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import NextLink from "next/link";
import dynamic, { LoaderComponent } from "next/dynamic";
import Image from "next/image";
import cookie from "js-cookie";
import Review from "../components/Review";
import { parseCookies } from "nookies";
import CircularProgress from "@mui/material/CircularProgress";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import { Alert, Box } from "@mui/material";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useTranslation } from "react-i18next";

const Cart: React.ReactNode = ({ userShippingInfo }) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const [cartItems, setCartItems] = useState(null);
  const [update, setUpdate] = useState(false);
  const [isShipmentConfirmed, setisShipmentConfirmed] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [order, setOrder] = useState(null);
  const [iscConfirmOrder, setIsConfirmOrder] = useState(false);
  const [circularProgress, setCircularProgress] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setisError] = useState(false);

  const updateCartHandler = async (item, quantity) => {
    setCircularProgress(true);
    if (quantity == 1) {
      await axios
        .put(
          `http://localhost:3000/api/cart/add/${item.productId._id}/1`,
          {},
          {
            headers: { Authorization: cookie.get("token") },
          }
        )
        .then((res) => {})
        .catch((err) => {
          setError(err);
          setisError(true);
        });
      setUpdate(!update);
    } else if (quantity == -1) {
      await axios
        .put(
          `http://localhost:3000/api/cart/remove/${item.productId._id}/1`,
          {},
          {
            headers: { Authorization: cookie.get("token") },
          }
        )
        .then((res) => {})
        .catch((err) => {
          setError(err);
          setisError(true);
        });
      setUpdate(!update);
    }
    setCircularProgress(false);
  };
  const deleteCartItemHandler = async (item) => {
    setCircularProgress(true);
    await axios
      .delete(`http://localhost:3000/api/cart/add/${item.productId._id}`, {
        headers: { Authorization: cookie.get("token") },
      })
      .then((res) => {})
      .catch((err) => {
        setError(err);
        setisError(true);
      });
    setUpdate(!update);
    setCircularProgress(false);
  };

  useEffect(() => {
    setCircularProgress(true);
    const getCartItems = async () => {
      const { data } = await axios
        .get("http://localhost:3000/api/cart", {
          headers: { Authorization: cookie.get("token") },
        })
        .catch((err) => {
          setError(err);
          setisError(true);
        });
      setCartItems((prevCartItems) => data.userCart);
    };
    getCartItems();
    setCircularProgress(false);
  }, [update, isCheckout]);

  const checkoutHandler = () => {
    setIsCheckout(true);
    setActiveStep(2);
  };
  const shipmentHandler = () => {
    setisShipmentConfirmed(true);
    setActiveStep(1);
  };
  const orderHandler = async () => {
    setCircularProgress(true);
    setActiveStep(3);
    await axios
      .post(
        "http://localhost:3000/api/order",
        {},
        {
          headers: { Authorization: cookie.get("token") },
        }
      )
      .then((res) => {
        setOrder(res.data.order);
        setIsConfirmOrder(true);
        // setIsCheckout(true);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        setisError(true);
      });
    // router.push('/');
    setCircularProgress(false);
  };

  return (
    <Box paddingTop="100px">
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        {circularProgress && <CircularProgress />}
      </div>
      <Box>
        <Stepper alternativeLabel activeStep={activeStep}>
          <Step key="1">
            <StepLabel>{t("Cart")}</StepLabel>
          </Step>
          <Step key="2">
            <StepLabel>{t("Shipping Info")}</StepLabel>
          </Step>
          <Step key="3">
            <StepLabel>{t("Order Confirmed")}</StepLabel>
          </Step>
          <Step key="4">
            <StepLabel>{t("Delivered")}</StepLabel>
          </Step>
        </Stepper>
      </Box>

      {!circularProgress && (
        <Box>
          {cartItems !== null && cartItems.products.length === 0 ? (
            <div>
              Cart is empty.{" "}
              <NextLink href="/" passHref>
                <Link>Go shopping</Link>
              </NextLink>
            </div>
          ) : (
            <Grid container spacing={1}>
              {!isCheckout && (
                <Grid item md={12} xs={12}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems !== null &&
                          cartItems.products.map((item) => (
                            <TableRow key={item._id}>
                              <TableCell>
                                <NextLink
                                  href="/"
                                  //  href={`/product/${item.slug}`}
                                  passHref
                                >
                                  <Link>
                                    <Image
                                      src={item.productId.image}
                                      alt={item.productId.name}
                                      width={50}
                                      height={50}
                                    ></Image>
                                  </Link>
                                </NextLink>
                              </TableCell>

                              <TableCell>
                                <NextLink
                                  // href="/"
                                  href={`/product/${item.productId._id}`}
                                  passHref
                                >
                                  <Link>
                                    <Typography>
                                      {item.productId.name}
                                    </Typography>
                                  </Link>
                                </NextLink>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>
                                  <Button
                                    size="large"
                                    variant="text"
                                    onClick={() => updateCartHandler(item, -1)}
                                  >
                                    -
                                  </Button>
                                  {item.quantity}
                                  <Button
                                    onClick={() => updateCartHandler(item, 1)}
                                  >
                                    +
                                  </Button>
                                </Typography>
                              </TableCell>
                              <TableCell align="right">${item.price}</TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => deleteCartItemHandler(item)}
                                >
                                  x
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
              {isShipmentConfirmed && !iscConfirmOrder && (
                <AccountProfileDetails userShippingInfo={userShippingInfo} />
              )}
              <Grid item md={12} xs={12}>
                <Card>
                  <List>
                    <ListItem></ListItem>
                    {!isShipmentConfirmed && (
                      <ListItem>
                        <Button
                          disabled={isCheckout}
                          variant="contained"
                          color="primary"
                          fullWidth
                          // onClick={() => setIsCheckout(true)}
                          onClick={() => shipmentHandler()}
                        >
                          Go to Shipping
                        </Button>
                      </ListItem>
                    )}
                    {isShipmentConfirmed && !isCheckout && (
                      <ListItem>
                        <Button
                          disabled={order !== null}
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => checkoutHandler()}
                        >
                          Checkout
                        </Button>
                      </ListItem>
                    )}
                    {isCheckout && (
                      <ListItem>
                        <Button
                          disabled={order !== null}
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => orderHandler()}
                        >
                          Confirm Order
                        </Button>
                      </ListItem>
                    )}
                  </List>
                </Card>
              </Grid>
            </Grid>
          )}
          <>
            {isError && <Alert severity="error">{error}</Alert>}
            {!isError && order && <Review order={order} />}
          </>
        </Box>
      )}
    </Box>
  );
};

export default Cart;

export async function getServerSideProps(context) {
  const { token } = parseCookies(context);
  const userShippingResponse = await axios.get(
    "http://localhost:3000/api/shippinginfo",
    {
      headers: { Authorization: token },
    }
  );
  return {
    props: {
      userShippingInfo: userShippingResponse.data.shippingInfo,
    },
  };
}
