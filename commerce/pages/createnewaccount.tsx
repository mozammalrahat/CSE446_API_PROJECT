import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import axios from "axios";
import cookie from "js-cookie";

const CreateNewAccount = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    balance: "",
  });

  const [error, setError] = useState(null);
  const [isAccountCreated, setisAccountCreated] = useState(false);
  const [account, setAccount] = useState(null);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewAccount = async () => {
    await axios
      .post(
        "http://localhost:3001/bank/create_account",
        {
          ...values,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Request-Headers": "Content-Type, Authorization",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAccount(response.data);
        setisAccountCreated(true);
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
            subheader="Update password"
            title="Create A New Bank Account"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Account Name"
              margin="normal"
              name="name"
              onChange={handleChange}
              value={values.name}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Balance"
              margin="normal"
              name="balance"
              onChange={handleChange}
              type="balance"
              value={values.balance}
              variant="outlined"
            />
          </CardContent>
          {error && <Alert severity="error">{error}</Alert>}
          {isAccountCreated && (
            <Alert severity="success">Account Created Successfully</Alert>
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
              onClick={() => handleNewAccount()}
            >
              Create
            </Button>
            <Box></Box>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default CreateNewAccount;
