import { useGetOrdersQuery } from "../../features/order/orderApi";
import Error from "../../components/Shared/Error";
import Loader from "../../components/Loader/Loader";
import { Accordion } from "flowbite-react";

export default function ProductsOrder() {
  const {
    isSuccess: isSuccessFetchOrders,
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetOrdersQuery();

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return <Error message={error?.message} />;
  }

  return (
    <div className="pt-6">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Accordion>
          {isSuccessFetchOrders && orders.length > 0 ? (
            orders.map((order) => (
              <Accordion.Panel key={order?._id}>
                <Accordion.Title>
                  <p>
                    Your Order ID: {order?._id} ({order?.cart?.length} items)
                  </p>
                </Accordion.Title>
                <Accordion.Content>
                  <div className="grid grid-cols-12 gap-6">
                    {order?.cart?.length > 0 &&
                      order?.cart?.map((item) => (
                        <div
                          key={item?._id}
                          className="col-span-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        >
                          <>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {item?.product?.title}
                            </h5>
                          </>
                          <img
                            draggable={false}
                            className="w-1/5 my-3"
                            src={item?.product?.thumbnail}
                            alt={item?.product?.title}
                          />
                          <p className="mb-3 font-normal text-gray-700">
                            {item.email}
                          </p>
                          <p className="mb-3 font-medium text-gray-700">
                            Total product: {item?.quantity}
                          </p>
                          <p className="mb-3 font-medium text-gray-700">
                            Total price: ৳ {item?.price}
                          </p>
                        </div>
                      ))}
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            ))
          ) : (
            <h2>No order</h2>
          )}
        </Accordion>
      </div>
    </div>
  );
}
