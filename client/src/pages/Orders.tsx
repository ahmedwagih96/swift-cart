import { Button, CircularProgress, Typography } from "@mui/material";
import { Seo, Error } from "../components";
import { Link, useParams } from "react-router-dom";
import { useFetchAllOrdersQuery } from "../redux/services/orderApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import OrderItem from "../components/Orders/OrderItem";
import { shades } from "../theme";

interface CustomErrorData {
  message: string;
}

function Orders() {
  const { userId } = useParams();
  const {
    data: orders,
    error,
    isLoading,
    refetch,
  } = useFetchAllOrdersQuery({ userId });
  if (error && "data" in error) {
    const fetchBaseQueryError = error as FetchBaseQueryError & {
      data: CustomErrorData;
    };
    return (
      <Error refetch={refetch} message={fetchBaseQueryError.data.message} />
    );
  }
  return (
    <main
      style={{
        width: "80%",
        margin: "0px auto",
        paddingTop: "40px",
      }}
    >
      <Seo canonicalUrl="/orders" title="Orders" />
      <Typography variant="h2" textAlign="center" marginBottom="50px">
        Your Orders
      </Typography>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "150px",
            alignItems: "center",
          }}
        >
          <CircularProgress value={60} />
        </div>
      ) : orders?.length ? (
        orders.map((order) => <OrderItem order={order} key={order._id} />)
      ) : (
        <>
          <Typography variant="h3" fontWeight="bold" mb='20px'>
            You Do not have any orders!
          </Typography>
          <Link to="/">
            <Button
              type="button"
              color="primary"
              variant="contained"
              sx={{
                backgroundColor: shades.primary[200],
                boxShadow: "none",
                color: "white",
                borderRadius: 0,
                padding: "15px 40px",
              }}
            >
              Shop Now
            </Button>
          </Link>
        </>
      )}
    </main>
  );
}

export default Orders;
