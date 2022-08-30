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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
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
        "http://localhost:3001/bank/account",
        {
          ...values,
        },
        {}
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
            subheader="Create A New Bank Account"
            title="New Account"
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
            {!isAccountCreated ? (
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleNewAccount()}
              >
                Create
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => window.location.reload()}
              >
                Create Another Account
              </Button>
            )}
            <Box></Box>
          </Box>
        </Card>
      </form>

      {isAccountCreated && (
        <Card>
          <CardHeader title="Account Details" />
          <PerfectScrollbar>
            <Box sx={{ minWidth: 600 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Account Name</TableCell>
                    <TableCell>Account NO.</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Security Code </TableCell>
                    <TableCell>User Mail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover>
                    <TableCell>{values.name}</TableCell>
                    <TableCell>{account.accountNumber}</TableCell>
                    <TableCell>{account.balance}</TableCell>
                    <TableCell>{account.bank_secret}</TableCell>
                    <TableCell>{account.email}</TableCell>
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
