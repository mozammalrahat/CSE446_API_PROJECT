import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import cookie from "js-cookie";

const CreateNewAccount = () => {
  const [values, setValues] = useState({ available: true });

  const [error, setError] = useState(null);
  const [isProductCreated, setisProductCreated] = useState(false);
  const [product, setProduct] = useState(null);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewProduct = async () => {
    await axios
      .post(
        "http://localhost:3002/product",
        {
          ...values,
        },
        {}
      )
      .then((response) => {
        console.log(response.data.newproduct);
        setProduct(response.data.newproduct);
        setisProductCreated(true);
      })
      .catch((err) => {
        setError(err);
      });
    await axios
      .post(
        "http://localhost:3000/api/product",
        {
          ...values,
        },
        {}
      )
      .then((response) => {
        console.log("This is from Next server", response.data.newproduct);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <>
      <form>
        <Card>
          <CardHeader
            style={{ textAlign: "center" }}
            subheader="Add Product to Database"
            title="New Product"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Product Name"
              margin="normal"
              name="name"
              onChange={handleChange}
              value={values.name}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Price"
              margin="normal"
              name="price"
              onChange={handleChange}
              type="number"
              value={values.price}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              name="description"
              onChange={handleChange}
              type="text"
              value={values.description}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Product Amount"
              margin="normal"
              name="amount"
              onChange={handleChange}
              type="number"
              value={values.amount}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Image URL"
              margin="normal"
              name="image"
              onChange={handleChange}
              type="text"
              value={values.image}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Category"
              margin="normal"
              name="category"
              onChange={handleChange}
              value={values.category}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Unique Key"
              margin="normal"
              name="key"
              onChange={handleChange}
              type="number"
              value={values.key}
              variant="outlined"
            />
          </CardContent>
          {error && <Alert severity="error">{error}</Alert>}
          {isProductCreated && (
            <Alert severity="success">Product Added Successfully</Alert>
          )}
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            {!isProductCreated ? (
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleNewProduct()}
              >
                Add
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => window.location.reload()}
              >
                Add Another
              </Button>
            )}
            <Box></Box>
          </Box>
        </Card>
      </form>
      {isProductCreated && (
        <Card>
          <CardHeader title="Account Details" />
          <PerfectScrollbar>
            <Box sx={{ minWidth: 600 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Availablity</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      {product.available ? "Available" : "Not Available"}
                    </TableCell>
                    <TableCell>{product.image}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          ></Box>
        </Card>
      )}
    </>
  );
};

export default CreateNewAccount;
