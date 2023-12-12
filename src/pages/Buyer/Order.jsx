import { useEffect, useState } from "react";
import BuyerLayout from "../../components/Layout/BuyerLayout";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { useGetCartsQuery } from "../../features/cart/cartApi";
import Loader from "../../components/Loader/Loader";
import { useGetOrdersQuery } from "../../features/order/orderApi";
import { Button } from "flowbite-react";

export default function Order() {
  const { user } = useFirebaseAuth();
  const {
    isSuccess: isSuccessFetchOrders,
    data: orders,
    isLoading: isLoadingFetchOrders,
  } = useGetOrdersQuery();

  isSuccessFetchOrders &&
    console.log(orders.filter((order) => order?.user?.email === user?.email));

  if (isLoadingFetchOrders) {
    return <Loader />;
  }

  document.title = "Order Page";
  return (
    <BuyerLayout>
      <div className="grid grid-cols-12 gap-6 py-5">
        {isSuccessFetchOrders && orders.length > 0 ? (
          orders
            ?.filter((order) => order?.user?.email === user?.email)
            ?.map((order) => (
              <div
                key={order._id}
                className="col-span-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                {console.log(order)}
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {order.user.displayName}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                  {order.user.email}
                </p>
                <p className="mb-3 font-medium text-gray-700">
                  Total product: {order.cart.length}
                </p>
                <p className="mb-3 font-medium text-gray-700">
                  Total price: ৳ {order.total_price}
                </p>
                
                <Button>
                  Remove order
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Button>
              </div>
            ))
        ) : (
          <h2>No order</h2>
        )}
      </div>
    </BuyerLayout>
  );
}
