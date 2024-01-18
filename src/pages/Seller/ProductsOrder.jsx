import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../features/order/orderApi";
import Error from "../../components/Shared/Error";
import Loader from "../../components/Loader/Loader";
import OrderItem from "../../components/Seller/OrderItem";

export default function ProductsOrder() {
  const { user } = useSelector((state) => state.auth) || {};

  const {
    isSuccess: isSuccessFetchOrders,
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetOrdersQuery();
  isSuccessFetchOrders && console.log(orders);

  const [filterOrders, setFilterOrders] = useState([]);

  useEffect(() => {
    if (isSuccessFetchOrders && orders?.length > 0) {
      const result = orders?.filter(
        (order) => order?.user?.email === user?.email
      );
      setFilterOrders(result);
    }
  }, [isSuccessFetchOrders, orders, user]);

  let content;

  if (isSuccessFetchOrders && orders?.length > 0 && filterOrders?.length > 0) {
    content = filterOrders?.map((order, index) => (
      <OrderItem key={order._id} index={index} order={order} />
    ));
  } else if (isSuccessFetchOrders && orders?.length === 0) {
    content = <h2 className="text-lg">No Order here.</h2>;
  } else if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <Error message={error} />;
  } else {
    content = <h2 className="text-lg">Something was wrong.</h2>;
  }

  return (
    <div className="pt-6">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Thumbnail
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
}
