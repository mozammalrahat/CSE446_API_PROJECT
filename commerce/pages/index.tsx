import React, { useContext, useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import NextLink from "next/link";

import axios from "axios";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { DashboardLayout } from "../components/dashboard-layout";

const Home = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  useEffect(() => {
    let user;
    const getUserDetails = async () => {
      const res = await axios.get("http://localhost:3000/api/auth", {
        headers: {
          Authorization: cookie.get("token"),
        },
      });

      user = res.data.user;
      if (!user.isShipping) {
        router.push("/address");
      }
    };
    getUserDetails();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <br />
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} key={product.name}>
            <NextLink href={`/product/${product._id}`} passHref>
              <Card style={{ backgroundColor: "#A5C9CA" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="secondary">
                    View Detalis
                  </Button>
                </CardActions>
              </Card>
            </NextLink>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Home;

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      products: response.data,
    },
  };
}
