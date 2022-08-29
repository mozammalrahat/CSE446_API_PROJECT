import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import Review from "../Review";
import axios from "axios";
import cookie from "js-cookie";

export const LatestOrders = ({ allOrders, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [orders, setOrders] = useState(allOrders);
  const [changeOrder, setChangeOrder] = useState(allOrders[0]);
  console.log("Orders : ", orders);

  const handleStatus = async (orderId, action) => {
    await axios
      .put(`http://localhost:3000/api/orders/${orderId}`, null, {
        params: {
          action: action,
        },
        headers: { Authorization: cookie.get("token") },
      })
      .then((res) => {
        setChangeOrder(res.data);
      });
  };

  useEffect(() => {
    const getAllOrders = async () => {
      const ordersResponse = await axios.get(
        "http://localhost:3000/api/orders",
        {
          headers: { Authorization: cookie.get("token") },
        }
      );
      setOrders((prev) => ordersResponse.data.orders);
    };
    getAllOrders();
  }, [changeOrder]);

  return (
    <Card>
      <CardHeader title="Recent Orders" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 600 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Ref</TableCell>
                <TableCell>Order Cost</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>VIEW </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delivered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow hover key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  {/* <TableCell>{format(order.createdAt, "dd/MM/yyyy")}</TableCell> */}
                  <TableCell>
                    {moment(order.createdAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/vieworder/${order._id}`}>
                      <a target="_blank" rel="noopener noreferrer">
                        <Button
                         style={{
                          color: "#f8f5dbed",
                          backgroundColor: "black",
                        }}
                          size="small"
                          variant="contained"
                          // onClick={() => handleOrderView(order._id)}
                        >
                          View Order
                        </Button>
                      </a>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {order.status === "pending" && user.userType === "admin" ? (
                      <>
                        <Button
                          onClick={() => handleStatus(order._id, "accept")}
                          size="small"
                          variant="contained"
                          
                        >
                          Accept
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                          sx={{ px: 2 }}
                          size="small"
                          color="error"
                          variant="contained"
                          onClick={() => handleStatus(order._id, "reject")}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <Button>{order.status}</Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {!order.delivered ? (
                      user.userType === "admin" ? (
                        <Button
                          onClick={() => handleStatus(order._id, "delivered")}
                          size="small"
                          variant="contained"
                        >
                          Confirm Delivery
                        </Button>
                      ) : (
                        "Processing"
                      )
                    ) : (
                      "Delivered"
                    )}
                  </TableCell>
                </TableRow>
              ))}
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
  );
};
