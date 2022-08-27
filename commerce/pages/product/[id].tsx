import React, { useContext } from "react";
import { InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import cookie from "js-cookie";
import Image from "next/image";
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import Navbar from "../../components/navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

const ProductDetail = ({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const classes = useStyles();

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = async () => {
    var { data } = await axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: cookie.get("token") },
    });

    const cart = data.userCart;

    const existItem =
      cart && cart.products.find((x) => x.productId === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    var { data } = await axios.get(
      `http://localhost:3000/api/products/${product._id}`,
      {
        headers: { Authorization: cookie.get("token") },
      }
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    var { data } = await axios.put(
      `http://localhost:3000/api/cart/add/${product._id}/1`,
      {},
      {
        headers: { Authorization: cookie.get("token") },
      }
    );
  };

  return (
    <Box paddingTop="80px">
      <Navbar title={product.name} description={product.description}>
        <div className={classes.section}>
          <NextLink href="/" passHref>
            <Link>
              <Button variant="contained" color="primary">
                Back
              </Button>
            </Link>
          </NextLink>
        </div>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            ></Image>
          </Grid>
          <Grid item md={3} xs={12}>
            <List>
              <ListItem>
                <Typography component="h6" variant="h6">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography> Description: {product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.amount > 0 ? "In stock" : "Unavailable"}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Navbar>
    </Box>
  );
};

export default ProductDetail;

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  console.log(params);
  const { id } = params;
  const product = await axios.get("http://localhost:3000/api/products/" + id);
  return {
    props: {
      product: product.data,
    },
  };
};
